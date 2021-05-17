from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("user_name", "list_of_interests")


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ("name")

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("name", "date")#, "size", "description", "cost_per_person", "list_of_interests", "waiting_people", "accepted_people")




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
            raise serializers.ValidationError({'password': "Passwords must match!"})
        
        account.set_password(password)
        account.save()
        
        return account

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("user_name", "password")