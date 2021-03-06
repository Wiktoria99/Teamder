from warnings import resetwarnings
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
def TeamID_get_next_ID():
    return get_next_ID_for('TeamID')
def Rating_get_next_ID():
    return get_next_ID_for('Rating')

# Create your models here.


class Interest(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=Interest_get_next_ID)
    name = models.CharField(max_length=20, unique = True, null=False)

    def __str__(self):
        return self.name


class Location(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=Location_get_next_ID)
    address = models.CharField(max_length=100)
    longitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])
    latitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])

    def __str__(self):
        return self.address


class TeamID(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=TeamID_get_next_ID)
    team_id = models.IntegerField()

    @staticmethod
    def create(team_id: int):
        id = TeamID(team_id = team_id)
        id.save()
        return id


class User(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=User_get_next_ID)

    user_name = models.CharField(max_length=50, unique = True)
    list_of_interests = models.ArrayReferenceField(to=Interest, on_delete=models.DO_NOTHING, null=True, blank = True)
    
    name = models.CharField(max_length=50, null=True, blank = True)
    surname = models.CharField(max_length=50, null=True, blank = True)
    age = models.IntegerField(null=True, blank = True)

    location = models.CharField(max_length=50, blank = True)

    my_teams = models.ArrayReferenceField(to=TeamID, on_delete=models.DO_NOTHING, null=True, blank = True)
     
    rating_id = models.BigIntegerField(null=True) 

    bio = models.CharField(max_length=500, null=True, blank = True)

    social_media_URL1 = models.CharField(max_length=100, blank = True)
    social_media_URL2 = models.CharField(max_length=100, blank = True)
    social_media_URL3 = models.CharField(max_length=100, blank = True)

    photo_src = models.CharField(max_length=100, blank = True)

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

    def _get_rating_and_create_if_does_not_exist(self):
        rating = None
        if self.rating_id:
            rating = Rating.objects.filter(id = self.rating_id)[0]
        else:
            rating = Rating()
            rating.save()
            self.rating_id = rating.id
            self.save()
        return rating

    def check_if_user_was_rated_by(self, user):     # 0 - nie ocenił, 1 - łapka w góre, -1 - łapka w dół
        rating = self._get_rating_and_create_if_does_not_exist()
        if rating.users_UpVote.filter(user_name = user.user_name):
            return 1
        elif rating.users_DownVote.filter(user_name = user.user_name):
            return -1
        else:
            return 0

    def remove_rate_from(self, user):
        rating = self._get_rating_and_create_if_does_not_exist()
        rating.users_DownVote.remove(user)
        rating.users_UpVote.remove(user)
        rating.save()

    def add_UpVote_from(self, user):
        user_vote = self.check_if_user_was_rated_by(user)
        rating = Rating.objects.filter(id = self.rating_id)[0]
        if user_vote == -1:
            rating.users_DownVote.remove(user)
            rating.users_UpVote.add(user)
        elif user_vote == 0:
            rating.users_UpVote.add(user)
        rating.save()

    def add_DownVote_from(self, user):
        user_vote = self.check_if_user_was_rated_by(user)
        rating = Rating.objects.filter(id = self.rating_id)[0]
        if user_vote == 1:
            rating.users_UpVote.remove(user)
            rating.users_DownVote.add(user)
        elif user_vote == 0:
            rating.users_DownVote.add(user)
        rating.save()

    def get_user_rating(self):
        rating = self._get_rating_and_create_if_does_not_exist()
        return len(rating.users_UpVote.values()) - len(rating.users_DownVote.values())
        
    def add_team_by_ID(self, team_ID: int):
        for team in self.my_teams.values():
            if team_ID == team['team_id']:
                return
        self.my_teams.add(TeamID.create(team_ID))
        self.save()


class Rating(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, blank=False, null=False, default=Rating_get_next_ID)
    users_UpVote = models.ArrayReferenceField(to = User, on_delete=models.DO_NOTHING, related_name='users_UpVote', blank = True)
    users_DownVote = models.ArrayReferenceField(to = User, on_delete=models.DO_NOTHING, related_name='users_DownVote', blank = True)
    


class Team(models.Model):
    id = models.BigIntegerField(unique=True, primary_key=True, default=Team_get_next_ID)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    creation_date = models.DateTimeField(auto_now_add=True, blank=True)
    expiration_date = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=50, blank = True)
    longitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)], blank=True, null=True)
    latitude = models.FloatField(validators=[MinValueValidator(-90), MaxValueValidator(90)], blank=True, null=True)
    host = models.CharField(max_length=50)
    host_profile_picture_url = models.CharField(max_length=100, blank=True)
    cost_per_person = models.FloatField(null=True, blank=True)
    list_of_interests = models.ArrayReferenceField(to=Interest, on_delete=models.DO_NOTHING, null=True, blank = True)
    waiting_people = models.ArrayReferenceField(to=User, on_delete=models.DO_NOTHING, related_name='waiting_people', null=True, blank = True)  
    accepted_people = models.ArrayReferenceField(to=User, on_delete=models.DO_NOTHING, related_name='accepted_people', null=True, blank = True)   
    size = models.PositiveIntegerField(null=True, blank = True)

    def __str__(self):
        return self.name

    def _add_interest(self, interest: Interest):
        if interest:
            self.list_of_interests.add(interest[0])
            #self.save()

    def _add_w_person(self, person: User):
        if person:
            self.waiting_people.add(person[0])

    def _remove_w_person(self, person: User):
        if person:
            self.waiting_people.remove(person[0])

    def _add_a_person(self, person: User):
        if person:
            self.accepted_people.add(person[0])

    def add_interest_by_ID(self, interest_ID: int):
        interest = Interest.objects.all().filter(id = interest_ID)
        self._add_interest(interest)

    def add_interest_by_name(self, interest_name: str):
        interest = Interest.objects.all().filter(user_name = interest_name)
        self._add_interest(interest)

    def add_w_person_by_ID(self, w_person_ID: int):
        person = User.objects.all().filter(id = w_person_ID)
        self._add_w_person(person)

    def add_w_person_by_name(self, w_person_name: str):
        person = User.objects.all().filter(user_name = w_person_name)
        self._add_w_person(person)

    def remove_w_person_by_ID(self, w_person_ID: int):
        person = User.objects.all().filter(id = w_person_ID)
        self._remove_w_person(person)

    def remove_w_person_by_name(self, w_person_name: str):
        person = User.objects.all().filter(user_name = w_person_name)
        self._remove_w_person(person)

    def add_a_person_by_ID(self, a_person_ID: int):
        person = User.objects.all().filter(id = a_person_ID)
        self._add_a_person(person)

    def add_a_person_by_name(self, a_person_name: str):
        person = User.objects.all().filter(user_name = a_person_name)
        self._add_a_person(person)




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