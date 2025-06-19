from flask import Flask, jsonify, request
from pymongo import MongoClient
import os

app = Flask(__name__)
client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
db = client['devopsdb']
items = db.items

@app.route('/')
def home():
    return "DevOps Advanced Project API is running!"

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify([{'name': i['name']} for i in items.find()])

@app.route('/items', methods=['POST'])
def add_item():
    name = request.json.get('name')
    items.insert_one({'name': name})
    return jsonify({'name': name}), 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)