from flask import Blueprint
from config import Config
from extensions import mongo
health_bp = Blueprint("health", __name__)

@health_bp.route("/api/health", methods=["GET"])
def health():
    try :
        mongo.db.command("ping")
        return { "status": "OK", "db": "connected"},200
    except Exception as e :
        return {"status" :"error", "db" : str(e)}, 500
