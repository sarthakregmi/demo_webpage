from django.shortcuts import  render,redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


# Create your views here.
def home(request):
    return render(request,'login.html')

def login(request):
    if request.method== 'POST':
        username = request.POST['Username']
        password = request.POST['Password']

        user = auth.authenticate(username=username,password=password)

        if user is not None:
            auth.login(request, user)
            print("LOG IN SUCCESSFUL")
            return render(request,'Main.html')
        else:
            messages.info(request,'invalid credentials')
            return redirect('login')

    else:
        return render(request,'login.html')

    
def register(request):
    if request.method == 'POST':
        
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        password1 = request.POST['password']
        password2 = request.POST['password_confirmation']
        email = request.POST['email']
        typeof = request.POST['selectgroup']
        
        
        if password1==password2:
            if User.objects.filter(username=username).exists():
                
                return redirect('register')
            elif User.objects.filter(email=email).exists():
                return redirect('register')
            else:
                if typeof =='A':
                    user = User.objects.create_user(username=username, password=password1, email=email,first_name=first_name,last_name=last_name,is_staff= True)
                else:
                    user = User.objects.create_user(username=username, password=password1, email=email,first_name=first_name,last_name=last_name,is_staff= False)
                
                user.save();
                print('user created')
                return redirect('home')

        else:
            messages.info(request,'password not matching..')    
            return redirect('register')
        return
        
    else:
        return render(request,'signup.html')
