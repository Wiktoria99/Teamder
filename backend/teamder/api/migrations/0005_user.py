# Generated by Django 3.0.5 on 2021-05-04 16:20

from django.db import migrations, models
import django.db.models.deletion
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210504_1814'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=50, unique=True)),
                ('list_of_categories', djongo.models.fields.ArrayReferenceField(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.Subcategory')),
            ],
        ),
    ]
