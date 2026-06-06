from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import Error
class SignUp(APIView):
  def post(self, request):
    if request.user.is_authenticated:
      return Response({'msg':'User already logged in'})
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    if (not username) or (not email) or (not password):
      return Response({'msg':'Empty field not accepted'})
    if User.objects.filter(username=username).exists(): 
      return Response({'msg':'Username Already Exists'})
    newUser = User.objects.create_user(username=username, password=password, email=email)
    login(request, newUser)
    return Response({'msg':'User created successfully', 'signup_status':True})
  
    
class LogOut(APIView):
  def get(self, request):
    if request.user.is_authenticated:
      logout(request)
      return Response({'msg':'Logged out successfully', 'logout_status':True})
    return Response({'msg':'already logged out'})
    
    

from rest_framework.permissions import AllowAny
class LogIn(APIView):
  permission_classes=[]
  def post(self, request):
    if request.user.is_authenticated:
      return Response({'msg':'already logged in', 'login_status':True})
    username = request.data.get('username')
    password = request.data.get('password')
    if (not username) or (not password):
      return Response({'msg':'empty field not accepted', 'login_status':False})
    user_found = User.objects.filter(username=username).exists()
    if user_found:
      user = authenticate(username=username, password=password)
      if not user: 
        return Response({'msg':'Password didnt matched', 'login_status':False})
      login(request, user)
      return Response({'msg':'logged in successfully', 'login_status':True})
    elif not user_found:
      return Response({'msg':'User not found , username is not valid', 'login_status':False})
      
    
  
      
    

class DeleteUser(APIView):
  permission_classes=[]
  def post(self, request):
    if request.user.is_authenticated:
      password = request.data.get('password')
      
      user = authenticate(password=password, username=request.user.username)
      if user:
        valid_user = User.objects.get(username=request.user.username)
        valid_user.delete()
        return Response({'msg':'Account deleted successfully', 'delete_status':True})
      return Response({'msg':'Password didnt matched yett'})
    return Response({'msg':'User is not authenticated'})


class ChekUser(APIView):
  def get(self, request):
    user = request.user
    if user.is_authenticated:
      return Response({
        'status':True,
        'username':user.username,
        'email':user.email,
        'id':user.id,
      })
    return Response({
        'status':False,
        'username':'no username found ',
        'email':'abal@gmail.com',
      })
from django.middleware.csrf import get_token
from django.http import JsonResponse

def get_csrf(request):
    get_token(request)
    return JsonResponse({'msg': 'csrf cookie set'})
      
class ResetPass(APIView):
  permission_classes = []
  def post(self, request):
    old_pass = request.data.get('old_pass')
    new_pass = request.data.get('new_pass')
    if new_pass and old_pass:
      user = authenticate(username=request.user.username, password=old_pass)
      if user:
        authenticated_user = request.user 
        authenticated_user.set_password(new_pass)
        authenticated_user.save()
        login(request, request.user)
        return Response({'msg':'password changed successfully', 'password_change':True})
      elif not user:
        return Response({'msg':'password didnt matched', 'password_change':False})
    else:
      return Response({'msg':"passwords not given", 'password_change':False})
      
class Instructions(APIView):
  def get(self, request):
    message = {
      "msg": "Welcome to the API",
      "instructions": {
        "msg":"This is a api made for a other frontend server, thats why it responses only json",
        "whatItDoes":"I want you please to read this readme, after reading this you will understand everything, all ans of your questions is answered in this repo good luck ;)",
        "HeresRepoLink":"https://github.com/CodeAddictHq/ProjectsWebApi"
      }}
    return Response(message)

class addError(APIView):
  def post(self, request):
    if not request.user.is_authenticated:
      return Response({'msg':'login required', 'err_status':False})
    if request.user.is_authenticated:
      err = request.data.get('error')
      title = request.data.get('title')
      if (not err) or (not title):
        return Response({'msg':'empty field not accepted', 'err_status':False})
      saveErr = Error.objects.create(
      author=request.user,
      title=title, 
      error=err,
      )
      return Response({'msg':'note/err saved successfully', 'err_status':True})