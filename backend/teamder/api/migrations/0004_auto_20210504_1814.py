# Generated by Django 3.0.5 on 2021-05-04 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_subcategory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subcategory',
            name='main_category',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
