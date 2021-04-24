from django.contrib import admin

# Register your models here.
from .models import Person, Attribute

admin.site.register(Person)
admin.site.register(Attribute)
