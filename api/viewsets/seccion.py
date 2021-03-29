import json


from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets

from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.settings import api_settings

from api.models.seccion import Seccion
from api.models.permission import IsAdmin
from api.serializers.seccion import SeccionSerializer,RegistroSeccionSerializer

from api.models.permission import IsAdmin
class SeccionViewset(viewsets.ModelViewSet):
    queryset = Seccion.objects.all()
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("tipo_seccion",)
    search_fields = ("tipo_seccion",)
    ordering_fields = ("tipo_seccion",)
    permission_classes = (IsAuthenticated,IsAdmin)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return SeccionSerializer
        else:
            return RegistroSeccionSerializer

   