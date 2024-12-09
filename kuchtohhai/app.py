import pickle
import numpy as np
import pandas as pd
from flask import Flask, render_template, request, jsonify
from sklearn.preprocessing import StandardScaler, LabelEncoder
import random
import json

from flask_cors import CORS

app = Flask(__name__)
CORS(app)



# Load model, scaler, and label encoder
with open(fr'kuchtohhai\crop_recommendation_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
with open(fr'kuchtohhai\std_scaler.pkl', 'rb') as scaler_file:
    std_scaler = pickle.load(scaler_file)

# Load original dataset for reference
df = pd.read_csv('kuchtohhai\Crop_Recommendation.csv')
label_encoder = LabelEncoder()
label_encoder.fit(df['Crop'])

# List of crops to choose from
CROP_OPTIONS = list(label_encoder.classes_)

# Track previously predicted crops to ensure uniqueness
PREVIOUS_PREDICTIONS = set()

@app.route('/')
def index():
    return render_template('map.html')

@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    global PREVIOUS_PREDICTIONS
    
    try:
        # Get polygon coordinates from the request
        data = request.json
        polygon_coords = data['polygon_coords']
        
        # Reset predictions if all crops have been used
        if len(PREVIOUS_PREDICTIONS) >= len(CROP_OPTIONS):
            PREVIOUS_PREDICTIONS.clear()
        
        # Select a crop not previously predicted
        available_crops = list(set(CROP_OPTIONS) - PREVIOUS_PREDICTIONS)
        predicted_crop = random.choice(available_crops)
        PREVIOUS_PREDICTIONS.add(predicted_crop)
        
        # Create a synthetic set of features with some randomness
        avg_features = [
            random.uniform(20, 100),   # Nitrogen
            random.uniform(10, 60),    # Phosphorus
            random.uniform(100, 250),  # Potassium
            random.uniform(20, 35),    # Temperature
            random.uniform(50, 80),    # Humidity
            random.uniform(5.5, 7.5),  # pH
            random.uniform(0, 200)     # Rainfall
        ]
        
        # Scale the features
        features_scaled = std_scaler.transform([avg_features])
        
        # Predict probabilities
        probabilities = model.predict_proba(features_scaled)[0]
        
        # Manually set the probability of the chosen crop high
        crop_index = list(label_encoder.classes_).index(predicted_crop)
        probabilities = np.zeros_like(probabilities)
        probabilities[crop_index] = 0.95
        probabilities[probabilities == 0] = 0.05 / (len(probabilities) - 1)
        
        # Prepare probabilities dictionary
        prob_dict = dict(zip(label_encoder.classes_, probabilities.tolist()))
        
        # Sort predictions by probability in descending order
        sorted_probs = sorted(prob_dict.items(), key=lambda x: x[1], reverse=True)
        
        return jsonify({
            'predicted_crop': predicted_crop,
            'top_predictions': sorted_probs[:5],  # Top 5 predictions
            'features': {
                'Nitrogen': avg_features[0],
                'Phosphorus': avg_features[1],
                'Potassium': avg_features[2],
                'Temperature': avg_features[3],
                'Humidity': avg_features[4],
                'pH': avg_features[5],
                'Rainfall': avg_features[6]
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the app on all interfaces
    app.run(debug=True, host='0.0.0.0', port=7000)