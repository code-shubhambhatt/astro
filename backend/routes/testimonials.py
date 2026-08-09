from flask import Blueprint,request
from extensions import mongo
from bson import ObjectId
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity


testimonials_bp = Blueprint("testimonials", __name__)

@testimonials_bp.route("/api/testimonials", methods=["GET"])
def testimonials():
    try:
        testimonials = mongo.db.testimonials.find({"is_visible": True}).sort("created_at",-1)
        testimonial_list = []
        for testimonial in testimonials:
            testimonial["_id"] = str(testimonial["_id"])
            testimonial_list.append(testimonial)
        return {"testimonials": testimonial_list    }, 200
    except Exception as e :
        return {"error": str(e)}, 500
    
@testimonials_bp.route("/api/testimonials", methods=["POST"])
def create_testimonial():
    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400
    required = ["client_name", "service_type", "quote"]
    missing = [ f for f in required if not data.get(f)]
    if missing :
        return {"error": f"missing required fields {missing}"}, 400
    try :
        new_testimonial = {
            "client_name": data.get("client_name"),
            "service_type": data.get("service_type"),
            "client_occupation": data.get("client_occupation"),
            "quote": data.get("quote"),
            "rating": int(data.get("rating", 5)),
            "created_at": datetime.utcnow(),
            "is_visible" : True,
        }
        mongo.db.testimonials.insert_one(new_testimonial)
        return {"status": "testimonial created sucessfully"}, 201

    except (TypeError, ValueError) as e:
        return {"error": f"Invalid field type: {str(e)}"}, 400
    except Exception as e:
        return {"error": str(e)}, 500
    
@testimonials_bp.route("/api/testimonials/<id>", methods=["PUT"])
@jwt_required()
def update_testimonial(id):
    if not ObjectId.is_valid(id):
        return {"error": "Invalid Id"}, 400

    data = request.get_json()

    if not data:
        return {"error": "No data provided"}, 400

    try:
        updated_testimonial = {
            "client_name": data.get("client_name"),
            "client_occupation": data.get("client_occupation"),
            "service_type": data.get("service_type"),
            "quote": data.get("quote"),
            "rating": int(data.get("rating", 5)),
            "is_visible": bool(data.get("is_visible", True))
        }

        result = mongo.db.testimonials.update_one(
            {"_id": ObjectId(id)},
            {"$set": updated_testimonial}
        )

        if result.matched_count == 0:
            return {"error": "Testimonial not found"}, 404

        return {"status": "testimonial updated successfully"}, 200

    except (TypeError, ValueError) as e:
        return {"error": f"Invalid field type: {str(e)}"}, 400

    except Exception as e:
        return {"error": str(e)}, 500