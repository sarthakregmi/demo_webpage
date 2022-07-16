from lib2to3.pgen2 import token
from django.db import models

# Create your models here.
class data_table(models.Model):
    name = models.CharField(max_length=100,null=True)
    username = models.CharField(max_length=100,null=True)
    password = models.CharField(max_length=100,null=True)
    type = models.CharField(max_length=100,null=True)
    email = models.CharField(max_length=100,null=True)
    token = models.CharField(max_length=100,null=True)
    
    
