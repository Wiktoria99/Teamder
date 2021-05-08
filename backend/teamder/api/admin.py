from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Account)
admin.site.register(Interest)
admin.site.register(User)
