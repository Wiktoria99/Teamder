from django.db import models

# Create your models here.
from djongo import models

class Attribute(models.Model):
    attribute_name = models.CharField(max_length=200, unique = True, primary_key = True)

    def __str__(self):
        return self.attribute_name


class Person(models.Model):
    user_name = models.CharField(max_length=200, unique = True, primary_key = True)
    list_of_attributes = models.ArrayReferenceField(to=Attribute, on_delete=models.CASCADE,blank=True)


    def __str__(self):
        return self.user_name