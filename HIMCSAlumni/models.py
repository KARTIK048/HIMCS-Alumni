from django.db import models

# Create your models here.
class register(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    Batch= models.IntegerField(default=0)
    course=models.CharField(max_length=100)
    password=models.CharField(max_length=128)
