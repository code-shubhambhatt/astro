from flask import Flask
from config import Config
from extensions import mongo , jwt
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    mongo.init_app(app)
    jwt.init_app(app)

    CORS(app)
    
    from routes.health import health_bp
    from routes.services import services_bp
    from routes.testimonials import testimonials_bp
    from routes.bookings import bookings_bp
    from routes.about import about_bp
    from routes.auth import auth_bp
    from routes.blogs import blogs_bp
        
    app.register_blueprint(health_bp)
    app.register_blueprint(services_bp)
    app.register_blueprint(testimonials_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(about_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(blogs_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug= app.config["DEBUG"], host = "localhost")
