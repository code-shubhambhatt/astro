from flask import Blueprint, request
from extensions import mongo
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    data= request.get_json()
    if not data: 
        return {"error" : "enter your credentials!"}, 400
        
    email = data.get("email")
    password = data.get("password")
    if not email :
        return {"error" : "enter your email!"}, 400
    if not password :
        return {"error" : "enter your password"}, 400
    try: 
        user = mongo.db.admins.find_one({"email":email}) 
        if not user :
            return {"error": "invalid email"},401 #only for debugging -> later will change to invalid credentials
        hashed_password = user["password"]
        if check_password_hash(hashed_password, password):
            access_token = create_access_token(identity = str(user["_id"]))
            return {"access_token": access_token}, 200
        return {"error": "invalid password"},401 #only for debugging -> later will change to invalid credentials
            
    except Exception as e :
        return {"error" : str(e)}, 500