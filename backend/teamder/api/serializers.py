from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = "__all__"
        fields = ("user_name", "name", "surname", "age", "location", "bio", "social_media_URL1", "social_media_URL2", "social_media_URL3", "photo_src")

    def save(self):
        user = User(
                user_name=self.validated_data['user_name'],
                name=self.validated_data['name'],
                surname=self.validated_data['surname'],
                age=self.validated_data['age'],
                location=self.validated_data['location'],
                bio=self.validated_data['bio'],
                social_media_URL1=self.validated_data['social_media_URL1'],
                social_media_URL2=self.validated_data['social_media_URL2'],
                social_media_URL3=self.validated_data['social_media_URL3'],
                photo_src=self.validated_data['photo_src'],
            )
        user.save()
        return user
        

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("name", "surname", "age", "location", "bio", "social_media_URL1", "social_media_URL2", "social_media_URL3")#, "photo_src") #narazie bez aktualizacji zdjecia

    def save(self, user: User):
        user.name=self.validated_data['name']
        user.surname=self.validated_data['surname']
        user.age=int(self.validated_data['age'])
        user.location=self.validated_data['location']
        user.bio=self.validated_data['bio']
        user.social_media_URL1=self.validated_data['social_media_URL1']
        user.social_media_URL2=self.validated_data['social_media_URL2']
        user.social_media_URL3=self.validated_data['social_media_URL3']
        #user.photo_src=self.validated_data['photo_src'],
        user.save()
        return user


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ("name",)

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("name", "description", "location", "creation_date", "expiration_date", "host", "cost_per_person", "size")

    def save(self, team: Team):
        team.name = self.validated_data['name']
        team.description = self.validated_data['description']
        try:
            team.creation_date = self.validated_data['creation_date']
        except:
            pass
        team.expiration_date = self.validated_data['expiration_date']
        team.host = self.validated_data['host']
        team.location = self.validated_data['location']
        team.cost_per_person = self.validated_data['cost_per_person']
        team.size = self.validated_data['size']
        team.save()
        return team

# Account stuff

class RegistrationSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ("user_name",  "email", "password", "password2")
        extra_kwargs = {
                'password': {'write_only': True}
        }

    def save(self):
        account = Account(
                email=self.validated_data['email'],
                user_name=self.validated_data['user_name'],
            )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise Exception("Passwords must match!")
        
        account.set_password(password)
        account.save()
        
        return account

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("user_name", "password")