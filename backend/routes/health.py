from flask import Blueprint
from config import Config
from extensions import mongo
from services.email import send_booking_notification


health_bp = Blueprint("health", __name__)

@health_bp.route("/api/health", methods=["GET"])
def health():
    try :
        mongo.db.command("ping")
        return { "status": "OK", "db": "connected"},200
    except Exception as e :
        return {"status" :"error", "db" : str(e)}, 500

@health_bp.route("/api/test-email", methods=["GET"])
def test_email():
    booking = {
        "name": "Test User",
        "phone": "9876543210",
        "email": "test@example.com",
        "service_interested": "Kundli Reading",
        "preferred_datetime": "10 August 2026, 5:00 PM",
        "message": "This is a test booking email."
    }

    try:
        send_booking_notification(booking)
        return {"message": "Test email sent successfully"}, 200
    except Exception as e:
        return {"error": str(e)}, 500