from mongoengine import fields, Document, EmbeddedDocument


# TODO - check if Django is adding ID


class Location(EmbeddedDocument):
    address = fields.StringField(max_length=200)
    coordinates = fields.GeoPointField()


class Rate(EmbeddedDocument):
    recommended = fields.BooleanField()
    comment = fields.StringField(max_length=200)
    issuer = fields.StringField(max_length=100, unique)


class Person(EmbeddedDocument):
    user_name = fields.StringField(max_length=100, unique)
    name = fields.StringField(min_length=2, max_length=100)
    surname = fields.StringField(min_length=2, max_length=100)
    age = fields.IntField(min_value=13, max_value=100)
    mail = fields.StringField(max_length=100, unique)
    telephone_number = fields.StringField(min_length=8, max_length=12, unique)
    location = fields.EmbeddedDocument(Location)
    percent_rating = fields.FloatField(max_value=0, max_value=100)
    ratings = fields.ListField(fields.EmbeddedDocumentField(Rate))
    bio = fields.StringField(max_length=500)
    facebook_link = fields.URLField(max_length=100)
    instagram_link = fields.URLField(max_length=100)
    open_for_invites = fields.BooleanField(default=False)
    intrests = fields.ListField(fields.EmbeddedDocumentField(Subcategory))

    def __str__(self):
        return self.name


class Team(EmbeddedDocument):
    eager_people = fields.ListField(fields.EmbeddedDocumentField(Person))
    current_number_of_people = fields.IntField(
        default=0, min_value=0, max_value=30)
    needed_amount_of_people = fields.DictField(
        default={'min': None, 'max': None})
    verified_people = fields.ListField(fields.EmbeddedDocumentField(Person))


class Subcategory(EmbeddedDocument):
    name = fields.StringField()
    main_category = fields.StringField()


class Event(EmbeddedDocument):
    name = fields.StringField(max_length=100)
    description = fields.StringField(max_length=300)
    date = fields.DateField()
    location = fields.EmbeddedDocumentField(Location)
    host = fields.EmbeddedDocumentField(Person)
    team = fields.EmbeddedDocumentField(Team)
    cost_for_person = fields.FloatField(max_value=100)
    categories = fields.ListField(
        fields.EmbeddedDocumentField(Subcategory))

    def __str__(self):
        return self.name
