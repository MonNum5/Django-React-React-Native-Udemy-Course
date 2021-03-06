from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User

from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = (AllowAny,)

class MovieViewSet(viewsets.ModelViewSet):
	queryset = Movie.objects.all()
	serializer_class = MovieSerializer
	authentication_classes = (TokenAuthentication, )
	permission_classes = (IsAuthenticated, )
	@action(detail=True, methods=['POST'])
	def rate_movie(self, request, pk=None):
		if 'stars' in request.data:

			movie = Movie.objects.get(id=pk)
			stars = request.data['stars']
			user = request.user

			try:
				rating = Rating.objects.get(user=user.id, movie=movie.id)
				rating.stars = stars
				rating.save()
				serializer = RatingSerializer(rating, many=False)
				response = {
						'message':'updated',
						'result': serializer.data
						}
			except:
				rating = Rating.objects.create(user=user.id, movie=movie.id)
				serializer = RatingSerializer(rating, many=False)
				response = {
						'message':'created',
						'result': serializer.data
						}
				Rating.Objects.create(user = user, movie=movie, stars=stars)

			
			return Response(response, status=status.HTTP_200_OK)
		else:
			response = {
						'message':'please provide stars'
						}
			return Response(response, status=status.HTTP_400_BAD_REQUEST)

	
# Create your views here.
class RatingViewSet(viewsets.ModelViewSet):
	queryset = Rating.objects.all()
	serializer_class = RatingSerializer
	authentication_classes = (TokenAuthentication, )
	permission_classes = (IsAuthenticated, )

	def update(self, request, *args, **kwargs):
		response = {'message': 'You can not update your rating like that'}

		return Response(response, status=status.HTTP_400_BAD_REQUEST)

	def create(self, request, *args, **kwargs):
		response = {'message': 'You can not create your rating like that'}

		return Response(response, status=status.HTTP_400_BAD_REQUEST)