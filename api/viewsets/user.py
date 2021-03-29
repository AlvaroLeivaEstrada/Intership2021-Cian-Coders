import json
import smtplib 
import datetime
import email.message

# Django
from django.template.loader import get_template, render_to_string 
from django.core.mail import EmailMultiAlternatives,send_mail,EmailMessage
from django.core.files import File
from django import template
from django.conf import settings

# Django rest framework
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

# Models
from api.models import Profile

# Serializer
from api.serializers import UserSerializer, UserReadSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token" or self.action=="validarEmail":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
    
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        usuario = User.objects.get(username=request.data["username"])
        usuario.set_password(request.data["password"])
        usuario.profile=Profile.objects.create(user=usuario)
        usuario.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        print(data)
       
        try:
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            user = request.user
           
            if user.username != data["username"]:
                try:
                    User.objects.get(username=data["username"])
                    return Response(
                        {"detail": "the chosen username in not available, please pick another"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except User.DoesNotExist:
                    pass
            
            user.username = data["username"]
            user.first_name = data["nombre"]
            user.last_name = data["apellidos"]
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            if perfil is not None:
                perfil.nombre=data["nombre"]
                perfil.apellidos=data["apellidos"]
                perfil.phone = data["phone"]
                #profile.get("phone", perfil.phone)
                perfil.address = data["address"]
                #profile.get("address", perfil.address)
                perfil.gender = data["gender"]
                #profile.get("gender", perfil.gender)
            elif created is not None:
                created.nombre = data["nombre"]
                created.apellidos=data["apellidos"]
                created.phone = data["phone"]
                created.address=data["address"]
                created.gender=data["gender"]
                created.save()
                
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
      
        try:
            user = User.objects.get(email=data["email"])
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)
   
    def update(self,request,pk=None):
        data = request.data
        last_login = datetime.datetime.now()
        usuario = User.objects.get(pk=pk)
        usuario.set_password(data.get("password"))
        usuario.last_login = last_login
        usuario.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=["get"],detail=False)
    def totalUsuarios(self,request):
        total = User.objects.count()
        return Response(total,status=status.HTTP_200_OK)
        
    @action(methods=["get"],detail=False)
    def validarEmail(self,request):
        input_email = request.GET.get("email")
        try:
            user=User.objects.get(email=input_email)
            if (user):
                serializer=UserSerializer(user)
                self.send_email(input_email,user.id)
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response({"detail":"Correo incorrecto"},status=status.HTTP_404_NOT_FOUND)
        except User.MultipleObjectsReturned:
            return Response({"detail":"multipleObjects"},status=status.HTTP_400_BAD_REQUEST)
    
    def send_email(self,email,id):
        subject = 'Restablecer constraseña'
        email_from = settings.EMAIL_HOST_USER
        html_version = ' <h1>Restablecer constraseña</h1> <p> <a href="http://0.0.0.0:8080/#/settingNewPassword/{id}">Restablecer</a> </p>'.format(id=id)     
        message = EmailMessage(subject, html_version, email_from, [email])
        message.content_subtype = 'html' # this is required because there is no plain text email version
        message.send()


class SetNewPassword(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)
    permission_classes = (AllowAny,)

    @action(methods=["put"],detail=False)
    def registerNewPassword(self,request):
        data = request.data
        id_user = request.GET.get("id")
        user = User.objects.get(pk=id_user)
        user.set_password(data.get("password"))
        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)

       

