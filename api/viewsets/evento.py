import json
from datetime import date
# Django
from django.db.models.query_utils import select_related_descend
from django_filters.rest_framework import DjangoFilterBackend
# Rest Framework
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
# Serializer
from api.serializers.evento import EventoSerializer,RegistroEventoSerializer

# Model
from api.models.evento import Evento
from api.models.ciclo import Ciclo
from api.models.permission import IsAdmin,IsCated,IsEstud

class EventoViewset(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    permission_classes = (IsAdmin,)
    
    filter_backends =(DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter)
    filter_fields=("titulo",)
    search_fields=("titulo",)
    ordering_fields=("titulo",)

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return EventoSerializer
        else:
            return RegistroEventoSerializer

    def create(self,request,*args,**kwargs):

        data = request.data
        time = data.get("hora")
        time_object = datetime.strptime(time,'%H%M').time()

        serializer = RegistroEventoSerializer(data=data)
        if serializer.is_valid():
            ciclo = Ciclo.objects.get(pk=data.get("ciclo"))
            Evento.objects.create(
                ciclo=ciclo,
                titulo=data.get("titulo"),
                descripcion=data.get("descripcion"),
                fecha = datetime.strptime(data.get("fecha"),'%Y-%m-%d').date(),
                hora = time_object
            )
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        try:            
            data = request.data
            serializer = RegistroEventoSerializer(data=data)
            if serializer.is_valid():
                
                ciclo = Ciclo.objects.get(pk=data.get("ciclo"))
               
                evento = Evento.objects.get(pk=pk)               
                evento.ciclo = ciclo
                evento.titulo = data.get("titulo")
                evento.descripcion = data.get("descripcion")
                evento.fecha = datetime.strptime(data.get("fecha"),'%Y-%m-%d').date()
                evento.hora = datetime.strptime(data.get("hora"),'%H%M').time()             
                evento.save()
                

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
   

class OperateByUsers (viewsets.ModelViewSet):
    queryset = Evento.objects.all()    
    filter_backends =(DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter)
    filter_fields=("titulo",)
    search_fields=("titulo",)
    ordering_fields=("titulo",)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsCated|IsEstud]
        return [permission() for permission in permission_classes]

    @action(methods=["get"],detail=False)
    def eventosProximos(self,request):
        today = date.today()
        now = today.strftime('%Y-%m-%d')
        proximosEventos = Evento.objects.raw('SELECT * FROM api_evento WHERE fecha >= %s',[now])
        serializer = EventoSerializer(proximosEventos,many=True)    
        return Response(serializer.data,status=status.HTTP_200_OK)


