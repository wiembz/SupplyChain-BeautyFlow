from app.extensions import db  # ✅ au lieu de from app import db

class RawMateriel(db.Model):
    __bind_key__ = 'second_db'  # Important pour lier au bon bind
    __tablename__ = 'DimRawMaterials'

    PK_RawMaterials = db.Column(db.Integer, primary_key=True)
    Material_ID = db.Column(db.Integer)
    Material_Name = db.Column(db.String(100))
    Material_Category = db.Column(db.String(100))
    Unit = db.Column(db.String(100))
    