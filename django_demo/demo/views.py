from django.shortcuts import render
from django.http import HttpResponse
from django.views import View 
from .models import Book
from rest_framework import viewsets
from .serializers import BookSerializer, BookMiniSerializer
from .models import Book
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

#class view with httpresponse
class Another(View):

	def __init__(self):
		books = Book.objects.filter(id=1)

		self.output = ''

		for book in books:
			self.output+= f"We have {book.title} in DB with {book.id}<br>"

	def get(self, request):
		return HttpResponse(self.output)
#render with template
def first(request):
	books = Book.objects.all()

	return render(request, 'first_temp.html',{'books':books})

#seriaizer 
class BookViewSet(viewsets.ModelViewSet):
	serializer_class = BookSerializer
	queryset = Book.objects.all()
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
