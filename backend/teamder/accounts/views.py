from django.shortcuts import render, redirect

# Create your views here.
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

from django.contrib.auth import authenticate, login, logout

from .forms import CreateUserForm

from accounts.models import Person, Attribute


def index(request):
    return HttpResponse("Hello, world. You're at the accounts index.")


def user_info_page(request):
    context = {}
    person = Person.objects.get(user_name=request.user.username)
    context['my_attributes'] = person.list_of_attributes.all()
    context['all_attributes'] = Attribute.objects.all()


    
    return render(request, 'user_info.html', context)


def register_page(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')

            Person.objects.create(user_name=user)  # creating Person for user

            messages.success(request, 'Account was created for ' + user)
            return redirect('login')

    context = {'form':form}
    return render(request, 'register.html', context)


def login_page(request):
    if request.method == 'POST':
        
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password = password)
        
        if user is not None:
            login(request, user)
            return redirect('user_info')
        else:
            messages.info(request, "Username or password is incorrect")

    context = {}
    return render(request, 'login.html', context)


def logout_user(request):
    logout(request)
    return redirect('login')