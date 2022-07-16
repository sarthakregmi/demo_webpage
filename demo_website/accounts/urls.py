from django import views
from django.urls import path
from . import views
from .views import RegisterAPI
urlpatterns = [
    path('',views.home, name='home'),
    # path('register',views.register,name='register'),
    path('login',views.login,name='login'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
]
