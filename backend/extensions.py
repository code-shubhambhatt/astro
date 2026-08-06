from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager

mongo = PyMongo() 
jwt = JWTManager()
# if any route needs this import so insted of imorting it from app, they can simply use this imoprt
# i.e from extensions import mongo 