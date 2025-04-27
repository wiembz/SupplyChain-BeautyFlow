from app import create_app
from flask_cors import CORS


app = create_app()

if __name__ == "__main__":
    CORS(app, origins="http://localhost:4200", supports_credentials=True)
    app.run(debug=True)

