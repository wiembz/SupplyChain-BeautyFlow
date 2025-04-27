import os

class Config:
    SECRET_KEY = os.urandom(24)  # Clé secrète pour les sessions
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'super-secret-key'  
    # Base principale : Supply_Auth
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:azerty@localhost:5432/Supply_Auth'
    # Base secondaire (produits, dimensions)
    SQLALCHEMY_BINDS = {
        'second_db': 'postgresql://postgres:123456a@localhost:5432/DIMENSIONS'
    }

   