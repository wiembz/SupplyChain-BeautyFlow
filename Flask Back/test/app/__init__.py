from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.extensions import db
from app.routes.predict import predict_bp  
from app.routes.auth import auth_bp
from app.routes.product import product_bp
from app.routes.serie import serie_bp
from app.routes.rawMateriel import rawmateriel_bp
from app.routes.predictShop import predict_shop


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app, origins="http://localhost:4200", supports_credentials=True)
    
    db.init_app(app)  # ✅ Initialise l'instance SQLAlchemy AVEC le contexte d'app
    JWTManager(app)

    # Blueprints
    app.register_blueprint(predict_bp)
    app.register_blueprint(serie_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(predict_shop)

    app.register_blueprint(rawmateriel_bp)

    return app
