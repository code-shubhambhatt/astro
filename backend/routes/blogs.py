from flask import Blueprint, request
from extensions import mongo
from flask_jwt_extended import jwt_required
from datetime import datetime, timezone
from bson import ObjectId
from flask_jwt_extended import get_jwt_identity
import re


def create_slug(title):
    slug = title.strip().lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"[\s-]+", "-", slug)
    return slug.strip("-")

blogs_bp = Blueprint("blogs", __name__)



@blogs_bp.route("/api/blogs", methods = ["POST"])
@jwt_required()
def create_blog():
    data = request.get_json()
    if not data :
        return {"error": "empty blog cannot be added"}, 400
    
    required = ["title", "content" , "status"]

    missing = [field for field in required if not data.get(field).strip()]
    
    if missing :
        return {"error": f"please enter {missing}"},400
    
    if  not (data.get("status") in ("draft", "published")) :
        return {"error": "invalid status"}, 400
        

    try :
        now = datetime.now(timezone.utc)
        blog_data = {
            "title" : data["title"].strip(),
            "slug": create_slug(data["title"]),
            "content" : data["content"].strip(),
            "created_at" : now,
            "updated_at" : now,
            "status" : data["status"]
        }
        
        mongo.db.blogs.insert_one(blog_data)
        
        return {"status": "Blog created sucessfully"}, 201
        
    except Exception as e :
        return {"error": str(e)}, 500
        
        
@blogs_bp.route("/api/blogs", methods= ["GET"])
@jwt_required(optional=True)
def get_blogs():
    
    identity = get_jwt_identity()
    if identity is None:
        query =  {"status": "published"}
    else :
        query =  {}
    try :
        blogs = mongo.db.blogs.find(query)
        all_blogs = []
        for blog in blogs :
            blog["_id"] = str(blog["_id"])
            all_blogs.append(blog)

        if not all_blogs :
            return {"blogs": []}, 200 

        return {"blogs": all_blogs}, 200
    
    except Exception as e :
        return {"error": str(e)}, 500
    
@blogs_bp.route("/api/blogs/<id>", methods=["GET"])
@jwt_required(optional=True)
def get_blog(id):
    if not ObjectId.is_valid(id) :
        return {"error": "Invalid id"}, 400

    try :
        blog = mongo.db.blogs.find_one({"_id": ObjectId(id)})
        if blog:
            blog["_id"]= str(blog["_id"])
            if get_jwt_identity() is not None:
                return {"blog": blog}, 200
            else:
                if blog["status"] == "published" :
                    return {"blog" : blog},200
                else :
                    return {"error": "blog does not exist"}, 404
        return {"status": "blog does not exist"}, 404
        
    except Exception as e :
        return {"error": str(e)},500
    
@blogs_bp.route("/api/blogs/<id>", methods= ["PATCH"])
@jwt_required()
def update_blog(id):
    if not ObjectId.is_valid(id):
        return {"error":"Invalid id"}, 400
    
    data = request.get_json()
    if not data :
        return { "error": "data not provided to update"},400
    
    fields = ["title" ,"content", "status"]
    # updates = {field: data.get(field) for field in fields if data.get(field)}
    
    provided_fields = set(data.keys())
    allowed_fields = set(fields)
    
    extra = provided_fields - allowed_fields
    
    if extra :
        return {"error": "Bad request"}, 400
    updates = {}
    
    if "title" in data :
        if data["title"].strip() == "":
            return {"error": "title cannot be empty"}, 400
        else:
            updates["title"] = data.get("title").strip()
            updates["slug"]  = create_slug(data["title"])
        
    if "content" in data:
        if data["content"].strip() == "":
            return {"error": "content cannot be empty"}, 400
        else:
            updates["content"] = data.get("content").strip()
        
    if "status" in data:
        if data.get("status") in ("draft", "published"):
            updates["status"] = data.get("status")
        else: 
            return {"error" : "invalid status"},400
        
    
    updates["updated_at"] = datetime.now(timezone.utc)
    try :
        result = mongo.db.blogs.update_one(
            {"_id": ObjectId(id)},
            {"$set": updates  }    
        )
        if result.matched_count ==0 :
            return {"error": "Blog not found"}, 404
        return {"status": "blog updated sucessfully"}, 200
        
    except Exception as e :
        return {"error": str(e)},500