from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .models import register
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request,"index.html")

def about(request):
    return render(request, "about.html")

def dashboard(request):
    return render(request, "dashboard.html")

def Register(request):
        if request.method == 'POST':
            name=request.POST.get('name')
            email=request.POST.get('email')
            Batch=request.POST.get('Batch')
            course=request.POST.get('course')
            password=request.POST.get('password')
            confirm_password=request.POST.get('confirm_password')

            register.objects.create(name=name, email=email, Batch=Batch, course=course, password=password)
            return redirect('login')
        
        return render(request, "register.html")

def Login(request):
        if request.method == 'POST':
            email = request.POST.get('email')
            password = request.POST.get('password')

            user = register.objects.get(email=email)
            if user.password == password:
                return redirect('dashboard')

        return render(request, "login.html")
