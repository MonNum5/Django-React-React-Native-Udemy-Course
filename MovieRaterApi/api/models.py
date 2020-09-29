from django.db import models
from django.contrib.auth.models import User
from  django.core.validators import MaxValueValidator, MinValueValidator
import numpy as np
class Movie(models.Model):
	title = models.CharField(max_length=32)
	description = models.TextField(max_length=360)

	def no_of_ratings(self):
		ratings = Rating.objects.filter(movie=self)
		return len(ratings)

	def avg_rating(self):
		ratings = Rating.objects.filter(movie=self)
		sum = 0
		for rating in ratings:
			sum+=ratings[0].stars
		if len(ratings)>0:
			return(sum/len(ratings))
		else:
			return 0
			
class Rating(models.Model):
	movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

	class Meta:
		unique_together = (('user','movie'),)
		index_together = (('user','movie'),)