from django.shortcuts import render
from django import core

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated


from .serializers import *

from .models import *

# Create your views here.


@api_view(['GET',])
@permission_classes(())
def get_all_categories(request):
    return Response(Category.objects.all().values(), status=status.HTTP_200_OK)



@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def user_info_view(request):    # for now return all users TODO
    curr_user = request.user
    return Response(User.objects.filter(user_name=curr_user).values(), status=status.HTTP_200_OK)



@api_view(['POST',])
@permission_classes(())
def registration_view(request):

    if request.method =='POST':
        serializer = RegistrationSerializer(data = request.data)
        response_data = {}
        if serializer.is_valid():
            account = serializer.save()
            
            user = User()
            user.user_name = account.user_name
            user.save()

            response_data['response'] = "succesfully reistered a new user!"
            response_data['user_name'] = account.user_name
            response_data['email'] = account.email
            token = Token.objects.get(user=account).key
            response_data['token'] = token
        else:
            response_data = serializer.errors
        return Response(response_data)
