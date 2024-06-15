import requests
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from ..models import Users
from ..forms import SignupForm

def nile_login(request): # name is to separate from the built-in login function, which we are wrapping in this view
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')  # Redirect to a success page.
        else:
            messages.error(request, 'Invalid credentials')
    return render(request, 'todolist/login.html')

def nile_logout(request):
    logout(request);
    return redirect('index')

def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            
            # Make a POST request to the external service to create the user
            data = {"email": email, "password": password}
            print(data)
            response = requests.post(settings.NILEDB_API_URL+'/users', json=data)

            if response.status_code == 201:
                user_data = response.json()
                user = authenticate(request, username=email, password=password)

                # Log the user in
                login(request, user)
                return redirect('index')
            else:
                print(response.status_code)
                print(response.text)
                messages.error(request, 'Signup failed. Please try again.')
    else:
        form = SignupForm()

    return render(request, 'todolist/signup.html', {'form': form})