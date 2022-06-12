from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [

    

    path('users/<str:pk>',views.getUsersById, name="user"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),  
    path('users/profile/',views.getUserProfile, name="users-profile"),
    path('users/profile/update/',views.updateUserProfile, name="users-profile-update"),
    path('users/',views.getUsers, name="users"),
    path('users/delete/<str:pk>',views.deleteUser, name="user-delete"),


    path('productlist/delete/<str:pk>',views.deleteProduct, name="product-delete"),
    path('products/',views.getProducts, name="products"),
    path('products/create/',views.createProduct, name="create-products"),
    path('products/upload/',views.uploadImage, name="upload-products"),
    path('products/<str:pk>',views.getProduct, name="product"),
    path('products/update/<str:pk>',views.updateProduct, name="update-product"),



    path('orders/add/',views.addOrderItems, name='orders-add'),
    path('orders/myorders/',views.getMyOrders, name='myorders'),
    path('orderlist/',views.getOrders, name='orders'),
    path('orders/<str:pk>/',views.getOrderById, name='user-order'),
    path('orders/<str:pk>/deliver/',views.updateOrderToDelivered, name='deliver-order'),
    path('orders/<str:pk>/pay/',views.updateOrderToPaid, name='pay'),
]