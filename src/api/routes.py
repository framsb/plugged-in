"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import json

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/registrarse', methods=['POST'])
def handle_register():

    data = request.data
    data_decoded = json.loads(data)
    newUser = User(**data_decoded)
    user = User.query.filter_by(email=newUser.email,password=newUser.password).first()
    if user is None:
        db.session.add(newUser)
        db.session.commit()
        access_token = create_access_token(identity=newUser.id)
        response_body = {
            "message": "Usuario creado con exito",
            "token":access_token
        }
        return jsonify(response_body), 200
    else :
        response_body = {
            "message": "Usuario ya existe"
        }
        return jsonify(response_body), 400

@api.route('/iniciar-sesion', methods=['POST'])
def handle_login():

    data = request.data
    data_decoded = json.loads(data)
    user = User.query.filter_by(**data_decoded).first()
    if user is None:  
        response_body = {
            "message": "Credenciales Inválidas"
        }
        return jsonify(response_body), 400
    else :
        access_token = create_access_token(identity=user.id)
        response_body = {
            "message": "Iniciado sesión con éxito",
            "token":access_token
        }
        return jsonify(response_body), 200

@api.route("/encontrar-gamers",methods=["POST"])
@jwt_required()
def handle_private():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200

# @app.route('/juegos', methods=['POST'])
# def handle_games():

#     response = requests.post("https://api.igdb.com/v4/games")
#     response_decoded = response.json()
#     people = People.query.all()
#     if len(people) == 0:
#         for people in response_decoded['results']:
#             response_one_person = requests.get(people["url"])
#             response_one_person_decoded = response_one_person.json()
#             response_one_person_decoded['result']
#             one_person = People(**response_one_person_decoded['result']['properties'],_id=response_one_person_decoded['result']['_id'],uid=response_one_person_decoded['result']['uid'])
#             db.session.add(one_person)
#         db.session.commit()

#     return response_decoded, 200
