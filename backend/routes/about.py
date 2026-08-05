from flask import Blueprint, request
from extensions import mongo

about_bp = Blueprint("about", __name__)

@about_bp.route("/api/about", methods=["PUT"])
def update_about():
    data = request.get_json()

    if not data:
        return {"error": "No data provided"}, 400

    try:
        mongo.db.about.update_one(
            {},
            {"$set": data},
            upsert=True
        )

        return {"message": "About updated successfully"}, 200

    except Exception as e:
        return {"error": str(e)}, 500
    
@about_bp.route("/api/about", methods=["GET"])
def get_about():
    try :
        about = mongo.db.about.find_one({}, {"_id":0})
        if not about:
            return {"error": "About data not found"}, 404
        return {"about" :about}, 200
        
    except Exception as e :
        return {"error": str(e)}, 500