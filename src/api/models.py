from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self,username,email,password,birthdate):
        self.username = username
        self.email = email
        self.password = password
        self.birthdate = birthdate
        self.is_active = True
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    about_me = db.Column(db.String(250), unique=True, nullable=False)
    image = db.Column(db.String(240), nullable=True)
    post_id = db.relationship('Post_user', backref='post', lazy=True)
    friends = db.relationship('Friends', backref='Friends', lazy=True)

    


    
class Post_user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_name = db.Column(db.String(150), unique=True, nullable=False)
    post_description =db.Column(db.String(400), unique=True, nullable=False)
    posted = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('profile.id'))

class Friends(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey("profile.id"))

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey("profile.id"))
    created = db.Column(db.DateTime, nullable=False) #fecha de creacion
    comment_content = db.Column(db.String(400))
    post_id = db.Column(db.Integer, db.ForeignKey("post_user.id"))

class Games(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    genre = db.Column(db.String(100), unique=False, nullable=False)
    game_modes = db.Column(db.String(100), unique=False, nullable=False)
    release_dates = db.Column(db.Integer, unique=False)
        
    def __init__(self, id, name, genre, game_modes, release_dates):
        self.id = id
        self.name = name
        self.genre = genre
        self.game_modes = game_modes
        self.release_dates = release_dates
    
   