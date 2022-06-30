"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Profile
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

@api.route('/detalles-usuario', methods=['GET','PUT'])
@jwt_required()
def handle_user_details():
    if request.method == 'GET':
        current_user = get_jwt_identity()
        user = User.query.filter_by(id=current_user).one_or_none()
        user_profile = Profile.query.filter_by(user_id = current_user).one_or_none()
        newUser = user.serialize()
        if user_profile is None:
            return jsonify({"user_data":newUser})
        user_details = user_profile.serialize()
        data = {**newUser, **user_details}
        return jsonify({"user_data":data}), 200
    if request.method == 'PUT':
        current_user = get_jwt_identity()
        data = request.data
        json_data = request.json
        data_decoded = json.loads(data)
        userProfile = Profile.query.filter_by(user_id=current_user).one_or_none()
        if userProfile is None:
            create_user_profile_data = Profile(user_id=current_user, about_me=json_data["about_me"], image=json_data['image'], favorite_games=json_data["favorite_games"], region=json_data["region"], contact=json_data["contact"])
            db.session.add(create_user_profile_data)
            db.session.commit()
            return jsonify ({"profile_data":create_user_profile_data.serialize()}), 201
        updated = userProfile.update(**data_decoded)
        if updated: 
            return jsonify ({"profile_data":"Usuario Actualizado"}), 204
        return jsonify ({"profile_data":"Ocurrio un error"}), 500
            

@api.route("/encontrar-gamers",methods=["POST"])
@jwt_required()
def handle_private():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200
