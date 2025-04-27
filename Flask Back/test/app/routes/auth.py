from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.models import get_user_by_username, add_decideur
from flask_jwt_extended import get_jwt


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Champs requis manquants'}), 400

    user = get_user_by_username(username)

    if user and check_password_hash(user[1], password):
        access_token = create_access_token(identity=str(user[0]), additional_claims={'role': user[2]})
        return jsonify({
            'message': 'Connexion réussie',
            'access_token': access_token,
            'role': user[2]  # Ajouter le rôle dans la réponse
        }), 200

    return jsonify({'error': 'Identifiants invalides'}), 401

@auth_bp.route('/token', methods=['GET'])
@jwt_required()
def auth():
    current_user_id = get_jwt_identity()  # ici tu récupères juste l'ID
    claims = get_jwt()  # récupérer les claims personnalisés (comme le role)

    return jsonify({
        'message': f"Bienvenue {claims['role']}",
        'user_id': current_user_id,
        'role': claims['role']
    }), 200
@auth_bp.route('/add_decideur', methods=['POST'])
@jwt_required()
def add_decideur_route():
     # Récupérer les claims du JWT, qui contiennent le rôle
    claims = get_jwt()

    # Vérifier si l'utilisateur est un superviseur
    if claims['role'] != 'superviseur':
        return jsonify({'error': 'Accès refusé'}), 403

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    role = data.get('role')

    if not username or not password or not email:
        return jsonify({'error': 'Champs requis manquants'}), 400

    try:
        add_decideur(username, password, email, role)  # 👈 ici role est fixé automatiquement
        return jsonify({'message': 'Décideur ajouté avec succès'}), 201
    except Exception as e:
        return jsonify({'error': f"Erreur lors de l'ajout du décideur : {str(e)}"}), 500