from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Error
from rest_framework_simplejwt.authentication import JWTAuthentication




class SignUp(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not email or not password:
            return Response(
                {'msg': 'Empty field not accepted'},
                status=400
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'msg': 'Username already exists'},
                status=400
            )

        User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        return Response(
            {
                'msg': 'User created successfully',
                'signup_status': True,
            },
            status=201,
        )


class DeleteUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        password = request.data.get('password')
        user = authenticate(username=request.user.username, password=password)
        if user:
            user.delete()
            return Response({'msg': 'Account deleted successfully', 'delete_status': True})
        return Response({'msg': 'Password didnt matched yett', 'delete_status': False}, status=401)


class ChekUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'status': True,
            'username': user.username,
            'email': user.email,
            'id': user.id,
        })


class ResetPass(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        old_pass = request.data.get('old_pass')
        new_pass = request.data.get('new_pass')
        if not (new_pass and old_pass):
            return Response({'msg': 'passwords not given', 'password_change': False}, status=400)

        user = authenticate(username=request.user.username, password=old_pass)
        if not user:
            return Response({'msg': 'password didnt matched', 'password_change': False}, status=401)

        user.set_password(new_pass)
        user.save()
        tokens = get_tokens_for_user(user)
        return Response({
            'msg': 'password changed successfully',
            'password_change': True,
            'tokens': tokens,
        })


class Instructions(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        message = {
            "msg": "Welcome to the API",
            "instructions": {
                "msg": "This is a api made for a other frontend server, thats why it responses only json",
                "whatItDoes": "I want you please to read this readme, after reading this you will understand everything, all ans of your questions is answered in this repo good luck ;)",
                "HeresRepoLink": "https://github.com/CodeAddictHq/ProjectsWebApi"
            }}
        return Response(message)


class AddError(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        err = request.data.get('error')
        title = request.data.get('title')
        if (not err) or (not title):
            return Response({'msg': 'empty field not accepted', 'err_status': False}, status=400)
        Error.objects.create(author=request.user, title=title, error=err)
        return Response({'msg': 'note/err saved successfully', 'err_status': True})