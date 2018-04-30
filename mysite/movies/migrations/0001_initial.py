# Generated by Django 2.0.3 on 2018-04-21 01:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('movie_id', models.IntegerField(unique=True)),
                ('runtime', models.IntegerField()),
                ('releaseDate', models.DateField()),
                ('poster', models.CharField(max_length=300)),
                ('rating', models.CharField(max_length=10, null=True)),
                ('movie_genre', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Showtime',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.CharField(max_length=8)),
                ('tickets', models.CharField(max_length=250)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='Theater',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=20)),
                ('name', models.CharField(default='A Theater!', max_length=100)),
                ('th_id', models.CharField(max_length=10, unique=True)),
                ('lat', models.DecimalField(decimal_places=4, max_digits=10, null=True)),
                ('long', models.DecimalField(decimal_places=4, max_digits=10, null=True)),
                ('city', models.CharField(max_length=30)),
            ],
        ),
        migrations.AddField(
            model_name='showtime',
            name='theater',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='movies.Theater'),
        ),
        migrations.AddField(
            model_name='movie',
            name='theaters',
            field=models.ManyToManyField(to='movies.Theater'),
        ),
    ]