from flask import Blueprint, jsonify, current_app
from app.models.rawMateriel_model import RawMateriel
from app.extensions import db

rawmateriel_bp = Blueprint('rawmateriel_bp', __name__)

@rawmateriel_bp.route('/rawmaterials', methods=['GET'])
def get_rawmaterials():
    try:
        with current_app.app_context():
            materials = (
                db.session.query(RawMateriel.Material_Name)
                .distinct()
                .all()
            )

            result = [{'material_name': m.Material_Name} for m in materials]
            return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
