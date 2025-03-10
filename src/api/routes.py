"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

Upload_Folder='uploads'
api.config['Upload_Folder'] = Upload_Folder

if not os.path.exists(Upload_Folder):
    os.makedirs(Upload_Folder)

@api.route('/test', methods=["GET"])
def test():
    return jsonify(message= 'Everything is correct'), 200


@api.route('/auth/signup', methods=["POST"])
def signup():
    # return jsonify({'msg': 'Signup reached'}), 200
    data = request.get_json()

    if not data.get('email') or not data.get('name') or not data.get('password'):
        return jsonify({'msg': 'Missing fields'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({'msg': 'User already exists'}), 409

    hashed_password = generate_password_hash(data['password'])

    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg': 'User created successfully'}), 201


@api.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({'msg': 'Missing fields'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'msg': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        'msg': 'Login successful',
        'access_token': access_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
        }), 200
@api.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'msg':"No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"msg":'No selected file'}), 400
    
    filename = os.path.join(api.config['Upload_Folder'], file.filename)
    file.save(filename)
    return jsonify({'msg':"File uploaded successfully", "filename": file.filename}), 200
@api.route('/api/files', methods=['GET'])
def get_files():
    files = os.listdir(api.config['Upload_Folder'])
    return jsonify({'files':files}), 200