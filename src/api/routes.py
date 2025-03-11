"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, send_from_directory
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os

app = Flask(__name__)
Upload_Folder = os.path.join(os.getcwd(), 'uploads')
os.makedirs(Upload_Folder, exist_ok=True)
app.config['Upload_Folder'] = Upload_Folder
CORS(app)
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/test', methods=["GET"])
def test():
    return jsonify(message='Everything is correct'), 200


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


@api.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'msg': "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"msg": 'No selected file'}), 400

    filename = os.path.join(app.config['Upload_Folder'], file.filename)
    file.save(filename)
    file_url= f"https://crispy-succotash-5g4r7j4vqg7p2r67-3001.app.github.dev/uploads/{filename}"
    return jsonify({'msg': "File uploaded successfully", "filename": file.filename, "file_URL": file_url}), 200

@api.route('/files', methods=['GET'])
def get_files():
    try:
        files = os.listdir(app.config['Upload_Folder'])
        files = [f for f in files if os.path.isfile(os.path.join(app.config['Upload_Folder'],f))]
        return jsonify({"files": files}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/file')
def list_files():
    files=[]
    for filename in os.listdir(app.config["Upload_Folder"]):
        file_url= f"https://crispy-succotash-5g4r7j4vqg7p2r67-3001.app.github.dev/api/files/{filename}"
        files.append({"fileName":filename,"url":file_url})
        return jsonify(files)
@api.route('/files/<filename>')
def get_file(filename):
    return send_from_directory(app.config["Upload_Folder"], filename)

app.register_blueprint(api)
