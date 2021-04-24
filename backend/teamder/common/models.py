from mongoengine import fields, Document, EmbeddedDocument


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
    age = fields.IntField(min_value=0, max_value=100)
    mail = fields.StringField(max_length=100, unique)
    telephone_number = fields.IntField(min_value=0, max_value=999999999, unique)
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


class People(EmbeddedDocument):
    current_number_of_people = fields.IntField(
        default=0, min_value=0, max_value=10000)
    needed_amount_of_people = fields.DictField(
        default={'min': None, 'max': None})
    list_of_people = fields.ListField(fields.EmbeddedDocumentField(Person))


class Subcategory(EmbeddedDocument):
    name = fields.StringField()
    main_category = fields.StringField()


class Event(EmbeddedDocument):
    name = fields.StringField(max_length=100)
    date = fields.DateField()
    location = fields.EmbeddedDocumentField(Location)
    host = fields.EmbeddedDocumentField(Person)
    people = fields.EmbeddedDocumentField(People)
    cost_for_person = fields.FloatField(min_value=0, max_value=10000)
    categories = fields.ListField(
        fields.EmbeddedDocumentField(Subcategory))

    def __str__(self):
        return self.name
