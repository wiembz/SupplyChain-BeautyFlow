from flask import Blueprint, jsonify, current_app
from app.models.product_model import Product
from app.extensions import db

product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/products', methods=['GET'])
def get_products():
    try:
        with current_app.app_context():
            products = (
                db.session.query(Product.productname, Product.category)
                .distinct()
                .all()
            )

            result = [{'productname': p.productname, 'category': p.category} for p in products]
            return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500