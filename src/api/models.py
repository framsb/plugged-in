from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    imagen = db.Column(db.String(250))
    fecha_registro = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class User_Profile(db.Model):
    __tablename__ = 'user_profile'
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey("user.id"))
    about_me = db.Column(db.String(250), unique=True, nullable=False)
    #games_fav = db.relationship()
    #user_id = db.relationship()

class Post_user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.String(250), unique=True, nullable=False)

class Games(db.Model):
    __tablename__ = 'games'
    id = db.Column(db.Integer, primary_key=True)
    # Api por decidir, si no manual
    # Nombre, año, plataforma

class Amigos(db.Model):
    __tablename__ = 'amigos'
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user_to_id = db.Column(db.Integer, db.ForeignKey("user.id"))

class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.String, ForeignKey("user.id"))
    #post_id =
    comment_content = db.Column(db.String(140))
    # post = relationship
    user = relationship("User")