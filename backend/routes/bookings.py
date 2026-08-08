from flask import Blueprint , request
from extensions import mongo
import re 
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId

bookings_bp = Blueprint("bookings", __name__)

@bookings_bp.route('/api/bookings', methods=["GET"])
@jwt_required()
def get_bookings():
    try:
        bookings = mongo.db.bookings.find({}).sort("created_at",-1)
        booking_list = []
        for booking in bookings :
            booking["_id"] = str(booking["_id"])
            booking_list.append(booking)
        return { "bookings" : booking_list}, 200
    except Exception as e :
        return { "error" : str(e)}, 500

@bookings_bp.route("/api/bookings", methods=["POST"])
def create_bookings():
    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400
    required = ["name", "phone" , "service_interested", "preferred_datetime"]
    missing = [ f for f in required if not data.get(f)]
    if missing:
        return {"error": f"{missing[0]} field is required"},400
    
    phone = data.get("phone").strip()
    if not re.fullmatch(r"[6-9]\d{9}", phone):
        return {"error": "Invalid contact number"}, 400
        
    if data.get('email'):
        email = data.get("email").strip()
        if not re.fullmatch(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", email):
            return {"error": "Invalid email address"}, 400

    try :
        new_booking = {
            "name" : str(data.get("name")),
            "phone" : str(data.get("phone")),
            "email" : str(data.get("email","")),
            "service_interested" : str(data.get("service_interested")),
            "preferred_datetime" : str(data.get("preferred_datetime")),
            "message" : str(data.get("message", "")),
            "status" : "new",
            "created_at" : datetime.utcnow()
        }
        mongo.db.bookings.insert_one(new_booking)
        return {"status": "booking done sucessfully"},201
    except (TypeError, ValueError) as e:
        return {"error": f"Invalid field type: {str(e)}"}, 400
    except Exception as e:
        return {"error": str(e)}, 500
    
@bookings_bp.route("/api/bookings/<id>", methods = ["PUT"])
@jwt_required()
def update_booking_status(id):
    if not ObjectId.is_valid(id):
        return {"error": "Invalid Id"}, 400
    data = request.get_json()
    if not data :
        return {"error": "No data provided"}, 400
    status = data.get("status")
    if not (status in ("completed", "new")) :
        return {"error": "Invalid status provided"}, 400
    try :
        result = mongo.db.bookings.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"status": status}}                                  
            )
        if result.matched_count == 0:
            return {"error": "Booking not found"}, 404
        return {"status": "booking updated successfully"}, 200
    except Exception as e:
        return {"error": str(e)}, 500
