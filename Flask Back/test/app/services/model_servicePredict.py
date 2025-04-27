import pickle
import pandas as pd
from datetime import datetime

# Chargement du modèle sauvegardé
def load_model():
    with open('linear_model.pkl', 'rb') as f:
        model = pickle.load(f) 
    return model

# Fonction de prédiction
def predict_total_amount(shopname, date):
    # Charger le modèle
    model = load_model()
    
    # Extraire les informations du shop et de la date
    # Encodage du nom du shop
    shopname_encoded = encode_shopname(shopname)
    
    # Convertir la date en année, mois et jour
    date_obj = datetime.strptime(date, '%Y-%m-%d')
    year = date_obj.year
    month = date_obj.month
    day = date_obj.day
    
    # Créer les features pour la prédiction
    features = pd.DataFrame({
        'shopname_encoded': [shopname_encoded],
        'year': [year],
        'month': [month],
        'day': [day]
    })
    
    # Prédire le TotalAmount
    predicted_amount = model.predict(features)
    
    return predicted_amount[0]

# Fonction pour encoder le nom du shop (à adapter selon ton encodage)
def encode_shopname(shopname):
    # Exemple d'encodage simple avec un dictionnaire
    shopname_dict = {
        "shop-Hammamet-005": 0,
        "shop-Hammamet-010": 1,
        "shop-Monastir-004": 2,
        # Ajouter d'autres encodages ici...
    }
    
    # Retourne l'ID encodé du shop
    return shopname_dict.get(shopname, -1)  # -1 si le shop n'est pas trouvé
