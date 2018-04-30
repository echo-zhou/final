from django.core.management.base import BaseCommand, CommandError
from movies.models import Movie, Showtime, Theater

class Command(BaseCommand):
    help = 'Remove all movie data from the database'

    # clean the database
    def handle(self, *args, **options):
        Movie.objects.all().delete()
        Theater.objects.all().delete()
        Showtime.objects.all().delete()
