import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings



from api.models.empresa import Empresa
from api.serializers.empresa import EmpresaRegistroSerializer, EmpresaSerializer


class EmpresaViewset(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "direccion")
    search_fields = ("direccion")
    ordering_fields = ("nombre", "direccion")

    serializer_class = EmpresaRegistroSerializer

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EmpresaSerializer
        else:
            return EmpresaRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self,request, *args, **kwargs):
        serializer = EmpresaRegistroSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
