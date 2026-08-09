from flask import Blueprint, request
from config import Config 
from extensions import mongo
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity


services_bp = Blueprint("services", __name__)

@services_bp.route("/api/services" ,methods= ["GET"])
def services():
    try: 
        active_services = mongo.db.services.find({"is_active": True}).sort("display_order",1)
        service_list = []
        for service in active_services:
            service["_id"] = str(service["_id"])    
            service_list.append(service)
        return {"services": service_list}, 200
    except Exception as e :
        return { "error" : str(e)}, 500
    
@services_bp.route("/api/services/<id>", methods= ["GET"])
def get_service(id):
    if not ObjectId.is_valid(id):
        return {"error": "Invalid Id"}, 400
    
    try:
        service = mongo.db.services.find_one({"_id": ObjectId(id) })
        if not service:
            return {"error": "Service not found"}, 404
        service["_id"] = str(service["_id"])
        if service["is_active"] :
            return {"data": service},200
        else :
            return {"status": "service is not available currently"},200
    except Exception as e :
        return {"error": str(e)},500
    
@services_bp.route("/api/services", methods= ["POST"])
@jwt_required()
def create_service():
    data = request.get_json()
    if not data :
        return {"error": "no data provided"}, 400
    
    required_fields = ["name", "slug", "description"]
    missing = [ f for f in required_fields if not data.get(f)]
    if missing:
        return {"error": f"Missing required fields: {missing}"}, 400
    try: 
        new_service = {
            "name": data.get("name"),
            "slug": data.get("slug"),
            "description": data.get("description"),
            "mode": data.get("mode"),
            "duration": data.get("duration", ""),
            "display_order": int(data.get("display_order")),
            "is_active": bool(data.get("is_active", True))
        }
        mongo.db.services.insert_one(new_service)
        return {"status": "service created successfully"}, 201

    except (TypeError, ValueError) as e:
        return {"error": f"Invalid field type: {str(e)}"}, 400
    except Exception as e:
        return {"error": str(e)}, 500

@services_bp.route("/api/services/<id>", methods = ["PUT"])
@jwt_required()
def update_service(id):
    if not ObjectId.is_valid(id) :
        return {"error" : "Invalid service id"}, 400
    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400

    try:
        updated_service = {
            "name": data.get("name"),
            "slug": data.get("slug"),
            "description": data.get("description"),
            "mode": data.get("mode"),
            "duration": data.get("duration", ""),
            "display_order": int(data.get("display_order")),
            "is_active": bool(data.get("is_active", True))
        }
        result = mongo.db.services.find_one(
            {"_id" : ObjectId(id)},
            {"$set": updated_service}
        )
        if result.matched_count == 0:
            return {"error": "Service not found"},404

        return {"status": "service updated successfully"}, 200

    except (TypeError, ValueError) as e:
        return {"error": f"Invalid field type: {str(e)}"}, 400

    except Exception as e:
        return {"error": str(e)}, 500
