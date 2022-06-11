from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Product(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    user= models.ForeignKey(User,on_delete=models.SET_NULL, null=True)
    name= models.CharField(max_length = 200 , null=True, blank=True)
    image= models.ImageField(null=True,blank=True, default = '/No_image.png')
    rank= models.CharField(max_length = 30 , null=True, blank=True)
    type= models.CharField(max_length = 15 , null=True, blank=True)
    description= models.TextField(null=True, blank=True)
    price=models.DecimalField(max_digits=5, decimal_places=2,null=True, blank=True)
    countInStock=models.IntegerField(null=True, blank=True,default=0)
    createdAt=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    user= models.ForeignKey(User , on_delete=models.SET_NULL,null=True)
    paymentMethod= models.CharField(max_length = 30 , null=True, blank=True)
    taxPrice= models.DecimalField(max_digits=5, decimal_places=2,null=True, blank=True)
    totalPrice= models.DecimalField(max_digits=5, decimal_places=2,null=True, blank=True)
    isPaid= models.BooleanField(default = False)
    paidAt= models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered= models.BooleanField(default = False)
    deliveredAt= models.DateTimeField(auto_now_add=True)
    createdAt= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product , on_delete=models.SET_NULL,null=True)
    order = models.ForeignKey(Order , on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length = 200 , null=True, blank=True)
    qty= models.IntegerField(null=True,blank=True,default=0)
    price= models.DecimalField(max_digits=5, decimal_places=2,null=True, blank=True)
    image =  models.ImageField(null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.name)
