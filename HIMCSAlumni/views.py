from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from .models import register
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request,"index.html")

def about(request):
    return render(request, "about.html")

def dashboard(request):
    name = request.session.get('user_name', 'Alumni')
    email = request.session.get('user_email', '')
    context = {
        'name': name,
        'email': email
    }
    return render(request, "dashboard.html", context)

def gallery(request):
    return render(request, "gallery.html")

def directory(request):
    return render(request, "directory.html")

def Register(request):
    if request.method == 'POST':
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        batch = request.POST.get('batch')
        course = request.POST.get('course')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            return render(request, "register.html", {'error': 'Passwords do not match'})

        full_name = f"{fname} {lname}".strip()

        if register.objects.filter(email=email).exists():
            return render(request, "register.html", {'error': 'Email already exists'})

        try:
            # Simple validation for batch to be an integer
            batch_int = int(batch)
        except ValueError:
             return render(request, "register.html", {'error': 'Invalid Batch Year'})

        register.objects.create(name=full_name, email=email, Batch=batch_int, course=course, password=password)
        messages.success(request, "Registration successful! Please login.")
        return redirect('login')
    
    return render(request, "register.html")

def Login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = register.objects.get(email=email)
            if user.password == password:
                # Manual session management
                request.session['user_id'] = user.id
                request.session['user_name'] = user.name
                request.session['user_email'] = user.email
                return redirect('dashboard')
            else:   
                return render(request, "login.html", {'error': 'Incorrect password'})
        except register.DoesNotExist:
            return render(request, "login.html", {'error': 'User does not exist'})

    return render(request, "login.html")

def Logout(request):
    request.session.flush()
    return redirect('login')

def contact(request):
    return render(request, "contact.html")