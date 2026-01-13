# Определяет сериализаторы для модели Note
from calendar import c
from rest_framework import serializers
from django.utils.html import escape
from .models import Note



class NoteSerializer(serializers.ModelSerializer):
    # базовый сериализатор для модели note
    class Meta():
         model = Note
         fields = ['id','title','content','created_at','updated_at']
         read_only_fields = ['created_at', 'updated_at'] 


# проверка наличия заголовка
    def validate_title(self,value):
         if not value.strip():
              raise serializers.ValidationError('Заголовок не может быть пустым')
         return escape(value.strip())
    
# проверка наличия контента

    def validate_content(self,value):
         if not value.strip():
              raise serializers.ValidationError('Содержание не может быть пустым')
         return escape(value.strip())
    
class NoteCreateSerializer(NoteSerializer):
     pass

# для обновления заметок - делает поля необязательными
class NoteUpdateSerializer(NoteSerializer):
    title = serializers.CharField(required=False)
    content = serializers.CharField(required=False)