from flask_pymongo import PyMongo

mongo = PyMongo() 

# if any route needs this import so insted of imorting it from app, they can simply use this imoprt
# i.e from extensions import mongo 