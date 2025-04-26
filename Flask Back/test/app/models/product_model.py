from app.extensions import db  # ✅ au lieu de from app import db

class Product(db.Model):
    __bind_key__ = 'second_db'  # Important pour lier au bon bind
    __tablename__ = 'DimProducts'

    Pk_Products = db.Column(db.Integer, primary_key=True)
    productid = db.Column(db.String(100))
    productname = db.Column(db.String(100))
    category = db.Column(db.String(100))
    brandname = db.Column(db.String(100))
    materialid = db.Column(db.String(100))
    materialname = db.Column(db.String(100))
    materialcategory = db.Column(db.String(100))
