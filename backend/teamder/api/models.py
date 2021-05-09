from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from djongo import models



# Create your models here.


class Interest(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False)
    name = models.CharField(max_length=20, unique = True, null=False)

    def __str__(self):
        return self.name


class User(models.Model):
    #_id = models.ObjectIdField()
    #_id = models.BigAutoField(primary_key=True)
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False)

    user_name = models.CharField(max_length=50, unique = True)
    list_of_interests = models.ArrayReferenceField(to=Interest, on_delete=models.DO_NOTHING, null=True, blank = True)
    
    name = models.CharField(max_length=50, null=True, blank = True)
    surname = models.CharField(max_length=50, null=True, blank = True)
    age = models.IntegerField(null=True, blank = True)

    telephone_number = models.CharField(max_length=50, null=True, blank = True)

    location = models.CharField(max_length=50, null=True, blank = True)              # TODO

    percent_rating = models.FloatField(null=True, blank = True)
    
    #ratings                                                            # TODO
            #ratings = fields.ListField(fields.EmbeddedDocumentField(Rate))
    
    bio = models.CharField(max_length=500, null=True, blank = True)
    facebook_link = models.URLField(max_length=100, null=True, blank = True)
    instagram_link = models.URLField(max_length=100, null=True, blank = True)
    open_for_invites = models.BooleanField(default=True)



    def __str__(self):
        return self.user_name



class Team(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False)
    host = models.CharField(max_length=50)
    name = models.CharField(max_length=50)                                      # TODO    dodać unique = True, czy nie dodać  
    date = models.DateField()
    #localizaton =                                                              # TODO

    size = models.IntegerField(null=True, blank = True)

    description = models.CharField(max_length=500, null=True, blank = True)  
    
    cost_per_person = models.FloatField(null=True, blank = True)
    list_of_interests = models.ArrayReferenceField(to=Interest, on_delete=models.DO_NOTHING, null=True, blank = True)    

    waiting_people = models.ArrayReferenceField(to=User, on_delete=models.DO_NOTHING, related_name='waiting_people', null=True, blank = True)  
    accepted_people = models.ArrayReferenceField(to=User, on_delete=models.DO_NOTHING, related_name='accepted_people', null=True, blank = True)   

    def __str__(self):
        return self.name



class ID_value(models.Model):
    id = models.IntegerField(unique=True, primary_key=True, blank=False, null=False)
    class_name = models.CharField(max_length=50, blank=False, null=False, unique=True)
    next_id_value = models.BigIntegerField(blank=False, null=False, default=1)

    @staticmethod
    def get_next_id(name_of_class: str):
        #obj = ID_value.objects.filter(class_name=name_of_class)[0]
        obj = ID_value.objects.get(class_name = name_of_class)
        value_to_return = obj.next_id_value
        obj.next_id_value = obj.next_id_value + 1
        obj.save()
        return value_to_return



    def __str__(self):
        return self.class_name 


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
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False)

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