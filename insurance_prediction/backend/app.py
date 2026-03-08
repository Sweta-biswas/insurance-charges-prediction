from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

model = pickle.load(open("insurance_model.pkl","rb"))

@app.route("/predict",methods=["POST"])
def predict():

    data = request.json

    features = np.array([[
        data["age"],
        data["sex"],
        data["bmi"],
        data["children"],
        data["smoker"],
        data["region_northwest"],
        data["region_southeast"],
        data["region_southwest"]
    ]])

    prediction = model.predict(features)

    return jsonify({
        "predicted_charges":float(prediction[0])
    })

if __name__ == "__main__":
    app.run(debug=True)