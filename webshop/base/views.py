from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from .models import Accounts, Product,User,Order,OrderItem
from .serializer import AccountSerializer, OrderSerializer, ProductSerializer,UserSerializer,UserSerializerWithToken,OrderItemSerializer
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.hashers import make_password
from datetime import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from . import constants


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
        return data
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])

        )
        serializer = UserSerializerWithToken(user,many = False)

        return Response(serializer.data)
    except:
        message = {'detail':'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user,many=False)

    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    user.username= data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()    
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user,many=False)

    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()   

    serializer = UserSerializer(user,many=False) 
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsersById(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    products= Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail' : 'No Order Items'}, status = status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user = user,
            paymentMethod= data['paymentMethod'],
            taxPrice= data['taxPrice'],
            totalPrice=data['totalPrice'],
        )

        for i in orderItems:
            product = Product.objects.get(_id = i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty = i['qty'],
                price =i['price'],
                image = product.image.url,
            )
        product.countInStock -= item.qty
        product.save()

        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    

    try:
        order = Order.objects.get(id=pk)
        if user.is_staff or order.user == user:       
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not Exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaidandDeliver(request, pk):
    order = Order.objects.get(id=pk)
    serializer= OrderSerializer(order, many=True)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()


    i = 0
    while(i < len(serializer.data['orderItems'])):
        product = Product.objects.get(_id = serializer.data['orderItems'][i]['product'])

        account = Accounts
        try:
            account = Accounts.objects.filter(rank = product.rank, type = product.type)
        except account.DoesNotExist:
            account = None

        serializeracc = AccountSerializer(account)
        try:
            serializeracc = AccountSerializer(account[0])
            sendOrder(order,serializeracc,1)
            order.isDelivered = True
            order.deliveredAt = datetime.now()
            order.save()
        except:
            sendOrder(order,serializeracc,2)
        

        i +=1

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    print(pk)
    productForDeletion = Product.objects.get(_id=pk)
    productForDeletion.delete()
    return Response('Product was deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'Sample_name',
        price = 0,
        rank = 'None',
        type = 'None',
        countInStock = 0,
        description = ""
    )
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data = request.data
    product = Product.objects.get(_id = pk)
   
    product.name = data["name"]
    product.price = data["price"]
    product.rank = data["rank"]
    product.type = data["type"]
    product.countInStock = data["countInStock"]
    product.description = data["description"]

    product.save()
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id = product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response("Image was uploaded")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')

"""
@api_view(['GET'])
def test(request,pk):
    order = Order.objects.get(id = pk)
    serializer = OrderSerializer(order)
    
    i = 0
    while(i < len(serializer.data['orderItems'])):
        product = Product.objects.get(_id = serializer.data['orderItems'][i]['product'])

        account = Accounts
        try:
            account = Accounts.objects.filter(rank = product.rank, type = product.type)
        except account.DoesNotExist:
            account = None

        serializeracc = AccountSerializer(account)
        try:
            serializeracc = AccountSerializer(account[0])
            sendOrder(order,serializeracc,1)
        except:
            sendOrder(order,serializeracc,2)
        

        i +=1
    
    return Response(serializer.data)
"""

def sendOrder(order, serializeracc, mode):
    msg = MIMEMultipart()
    
    msg['Subject'] = f'MIHAEL SHOP ORDER {order.id}'
    msg['To'] = order.user.email
    msg['From'] = 'MIHAEL_SHOP@gmail.com'

    if(mode == 1):
        message = 'Thank you for you order. Here are your login credentials: {}:{}'.format(serializeracc.data['username'],serializeracc.data['password'])
        try:
            Accounts.objects.get(_id = serializeracc.data['_id']).delete()
        except:
            print("There was an error somewhere")
    else:
        message = 'Thank you for you order. Unfortunately we dont have your requested item for instant delivery please wait until our agent sends you one'
    
    msg.attach(MIMEText(message))
    
    mailserver = smtplib.SMTP('smtp.gmail.com',587)
    # identify ourselves to smtp gmail client
    mailserver.ehlo()
    # secure our email with tls encryption
    mailserver.starttls()
    # re-identify ourselves as an encrypted connection
    mailserver.ehlo()
    mailserver.login(constants.USER_LOGIN, constants.USER_PASS)


    try:
        mailserver.sendmail('mihael123.riko1@gmail.com',order.user.email,msg.as_string())   
    except:
        print("Sending failed")
    mailserver.quit()
