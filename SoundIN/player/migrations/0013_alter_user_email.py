# Generated by Django 3.2.4 on 2021-11-23 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('player', '0012_alter_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]