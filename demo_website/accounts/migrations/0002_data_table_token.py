# Generated by Django 4.0.6 on 2022-07-16 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='data_table',
            name='token',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
