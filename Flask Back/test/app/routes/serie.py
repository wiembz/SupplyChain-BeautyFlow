from flask import Blueprint, request, jsonify
import joblib
import pandas as pd
from datetime import timedelta

serie_bp = Blueprint('serie', __name__)

# Charger le fichier pkl
models_dict = joblib.load("all_materials_models.pkl")

@serie_bp.route('/serie', methods=['GET'])
def serie():
    Material_Name = request.args.get('material')  # lire le paramètre ?material=...
    
    if not Material_Name:
        return jsonify({"error": "Veuillez spécifier une matière première avec le paramètre 'material'."}), 400
    
    if Material_Name not in models_dict:
        return jsonify({"error": f"La matière '{Material_Name}' n'existe pas."}), 404

    model = models_dict[Material_Name]
    steps = int(request.args.get('steps', 12))  # par défaut 12 mois

    # Faire la prédiction
    forecast = model.forecast(steps=steps)

    return jsonify({
        "material": Material_Name,
        "steps": steps,
        "forecast": forecast.tolist()
    })
