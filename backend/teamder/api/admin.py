from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Account)
admin.site.register(User)
admin.site.register(Interest)
admin.site.register(Team)
admin.site.register(ID_value)

