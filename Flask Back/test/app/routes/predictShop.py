from flask import Blueprint, request, jsonify
from app.services.model_servicePredict import predict_total_amount

# Création du blueprint pour gérer les routes de prédiction
predict_shop = Blueprint('predict_shop', __name__)

@predict_shop.route('/predictShop', methods=['POST'])
def predict():
    # Récupérer les données JSON envoyées par le client
    data = request.get_json()
    
    # Vérifier si les clés nécessaires sont présentes dans la requête
    if 'shopname' not in data or 'date' not in data:
        return jsonify({"error": "Missing shopname or date in request"}), 400
    
    shopname = data['shopname']
    date = data['date']
    
    # Appeler la fonction de prédiction
    total_amount = predict_total_amount(shopname, date)
    
    # Retourner la prédiction sous forme JSON
    return jsonify({"total_amount": total_amount})

