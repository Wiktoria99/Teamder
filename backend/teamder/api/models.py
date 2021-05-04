from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from djongo import models



# Create your models here.


class Subcategory(models.Model):
    name = models.CharField(max_length=20, unique = True, null=False)
    main_category = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.name


class User(models.Model):
    user_name = models.CharField(max_length=50, unique = True)
    list_of_categories = models.ArrayReferenceField(to=Subcategory, on_delete=models.CASCADE,blank=True)

    def __str__(self):
        return self.user_name








# Account stuff:

class AccountManager(BaseUserManager):
    def create_user(self, user_name, email, password=None):
        if not user_name:
            raise ValueError("User must have user_name")
        if not email:
            raise ValueError("User must have email")

        user = self.model(
                email=self.normalize_email(email),
                user_name=user_name
            )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_name, email, password=None):
        user = self.create_user(
                email=email,
                user_name=user_name,
                password = password
            )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    user_name = models.CharField(max_length=100, null=False, unique=True)

    email = models.EmailField(verbose_name='email', max_length=100, unique=True, null=False)

    # django requirements
    date_joined = models.DateTimeField(verbose_name='date join', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'user_name'    #what we want user to login with
    REQUIRED_FIELDS = ['email']    

    objects = AccountManager()

    def __str__(self):
        return self.user_name

    # django requirements
    def has_perm(self, perm, obj=None):
        return self.is_admin
    def has_module_perms(self, app_label):
        return True


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)