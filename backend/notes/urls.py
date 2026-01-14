from django.contrib import admin
from django.urls import path,include

from apps import notes_app


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/',include('apps.notes_app.urls'))
]
 