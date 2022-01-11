from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from .models import Product,User,Order,OrderItem
from .serializer import OrderSerializer, ProductSerializer,UserSerializer,UserSerializerWithToken
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.hashers import make_password




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