# настройка админки
from django.contrib import admin
from .models import Note

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    # Настройка админ панели Note
    list_dispaly = ['title', 'create_at', 'updated_at']
    list_filter = ['created_at', 'updated_at'] 
    search_fields = ['title', 'content']
    readonly_fields= ['created_at','updated_at']


    fieldsets = (
        ('Основная информация', {'fields':('title','content')}),    
        ('Временные метки', {'fields':('created_at','updated_at'),
                             'classes':'collaspe',})    
    
    ) 