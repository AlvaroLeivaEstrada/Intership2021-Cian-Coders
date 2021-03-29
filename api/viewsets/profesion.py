
# Django
from django.db.models.query_utils import select_related_descend
from django_filters.rest_framework import DjangoFilterBackend
# Rest Framework
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
# Serializer
from api.serializers.profesion import ProfesionSerializer,RegistroProfesionSerializer
# Model
from api.models.profesion import Profesion
from api.models.permission import IsAdmin
class ProfesionViewSet(viewsets.ModelViewSet):
    queryset = Profesion.objects.all()

    filter_backends =(DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter)
    filter_fields=("nombre",)
    search_fields=("nombre",)
    ordering_fields=("nombre",)

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return ProfesionSerializer
        else:
            return RegistroProfesionSerializer
    def get_permissions(self):
        permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]
    
    def create(self,request,*args,**kwargs):

        data = request.data
        serializer = RegistroProfesionSerializer(data=data)
        if serializer.is_valid():
            Profesion.objects.create(**data)
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(data, status=status.HTTP_201_CREATED)

