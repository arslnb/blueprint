from flask import Flask
from flask import render_template
from flask import Blueprint
from flask import url_for
from flask import jsonify
from flask import request
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

@app.route('/model', methods=["POST"])
@app.route('/model/<modelId>', methods=["GET", "PUT", "DELETE"])
def models(modelId = None):
    if request.method == "POST":
        return "new model write"
    elif request.method == "GET":
        return jsonify(mockCollection[int(modelId)])
    elif request.method == "PUT":
        return jsonify(request.get_json(force=True))
    else:
        return jsonify({'deleted': True})

if __name__ == "__main__":
    app.run(debug = True)