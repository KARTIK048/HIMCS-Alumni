from django.db import models

# Create your models here.
class register(models.Model):
    name=models.CharField(max_length=30)
    email=models.EmailField(default=None)
    Batch= models.IntegerField(default=0)
    course=models.CharField(max_length=50)
    password=models.CharField(max_length=30)