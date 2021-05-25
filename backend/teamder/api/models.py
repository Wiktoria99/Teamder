from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from django.apps import apps
from django.db.models import Max
from django.core.validators import MaxValueValidator, MinValueValidator

from djongo import models


# JAK DODAĆ ID:
# dodajesz funckje <nazwa_klasy>_get_next_ID(), w której wywłujesz funckję get_next_ID_for("<nazwa_klasy>")
# w klasie modelu dodajesz linijkę: 
# id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=<nazwa_klasy>_get_next_ID)
def get_next_ID_for(name_of_class: str):
    if apps.get_model(app_label = 'api', model_name = name_of_class).objects.all().count() == 0:
        return 1
    else:
        apps.get_model(app_label = 'api', model_name = name_of_class).objects.aggregate(Max('id')).values()
        return list(apps.get_model(app_label = 'api', model_name = name_of_class).objects.aggregate(Max('id')).values())[0] + 1
           
def Interest_get_next_ID():
    return get_next_ID_for('Interest')
def User_get_next_ID():
    return get_next_ID_for('User')
def Team_get_next_ID():
    return get_next_ID_for('Team')
def Account_get_next_ID():
    return get_next_ID_for('Account')
def Location_get_next_ID():
    return get_next_ID_for('Location')

# Create your models here.


class Interest(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=Interest_get_next_ID)
    name = models.CharField(max_length=20, unique = True, null=False)

    def __str__(self):
        return self.name


class User(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=User_get_next_ID)

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

    social_media_URL1 = models.URLField(max_length=100, null=True, blank = True)
    social_media_URL2 = models.URLField(max_length=100, null=True, blank = True)
    social_media_URL3 = models.URLField(max_length=100, null=True, blank = True)



    def __str__(self):
        return self.user_name

    def _add_interest(self, interest: Interest):
        if interest:
            self.list_of_interests.add(interest[0])
            #self.save()

    def add_interest_by_ID(self, interest_ID: int):
        interest = Interest.objects.all().filter(id = interest_ID)
        self._add_interest(interest)

    def add_interest_by_name(self, interest_name: str):
        interest = Interest.objects.all().filter(name = interest_name)
        self._add_interest(interest)
        
        


class Location(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=Location_get_next_ID)
    address = models.CharField(max_length=100)
    longitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])
    latitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])


class Team(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, default=Team_get_next_ID)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    creation_date = models.DateTimeField(auto_now_add=True, blank=True)
    expiration_date = models.DateTimeField(null=True, blank=True)
    blog = models.EmbeddedField(
        model_container=Location, null=True, blank=True
    )
    host = models.CharField(max_length=50)
    cost_per_person = models.FloatField(null=True, blank=True)
    list_of_interests = models.ArrayReferenceField(to=Interest, on_delete=models.DO_NOTHING, null=True, blank = True)
    waiting_people = models.ArrayReferenceField(to=User, on_delete=models.DO_NOTHING, related_name='waiting_people', null=True, blank = True)  
    accepted_people = models.ArrayReferenceField(to=User, on_delete=models.DO_NOTHING, related_name='accepted_people', null=True, blank = True)   
    size = models.PositiveIntegerField(null=True, blank = True)

    def __str__(self):
        return self.name




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
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=Account_get_next_ID)

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