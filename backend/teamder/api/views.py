from django.shortcuts import render
from django import core

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token


from .serializers import *

from .models import *

# Create your views here.



class SubcategoryView(generics.ListAPIView):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer




class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



@api_view(['GET',])
def user_info_view(request):
    data = core.serializers.serialize('json', User.objects.all(), ensure_ascii=False)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST',])
def registration_view(request):

    if request.method =='POST':
        serializer = RegistrationSerializer(data = request.data)
        response_data = {}
        if serializer.is_valid():
            account = serializer.save()
            response_data['response'] = "succesfully reistered a new user!"
            response_data['user_name'] = account.user_name
            response_data['email'] = account.email
            token = Token.objects.get(user=account).key
            response_data['token'] = token
        else:
            response_data = serializer.errors
        return Response(response_data)

