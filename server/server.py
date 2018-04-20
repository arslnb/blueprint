from flask import Flask
from flask import render_template
from flask import Blueprint
from flask import url_for
from flask import jsonify
from mock import mockCollection

app = Flask(__name__)

client = Blueprint('client', __name__, 
     static_folder='../client/static',
     template_folder='../client/templates',
     static_url_path='/client/static')

@client.route('/')
def home():
    return render_template('index.html')

app.register_blueprint(client)

@app.route('/collection')
def collections():
    return jsonify(mockCollection)

@app.route('/model', methods=["GET"])
@app.route('/model/<id>', methods=["GET", "POST"])
def models(id):
    return "model"

if __name__ == "__main__":
    app.run(debug = True)