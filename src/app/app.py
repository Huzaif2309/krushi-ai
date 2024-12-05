import pickle
import numpy as np
import pandas as pd
from flask import Flask, render_template, request, jsonify
from sklearn.preprocessing import StandardScaler, LabelEncoder
import requests

app = Flask(__name__)

# Load model, scaler, and label encoder
with open('crop_recommendation_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('std_scaler.pkl', 'rb') as scaler_file:
    std_scaler = pickle.load(scaler_file)

# Load original dataset for reference
df = pd.read_csv('Crop_Recommendation.csv')
label_encoder = LabelEncoder()
label_encoder.fit(df['Crop'])

# Hardcoded location features for 5 different regions
LOCATION_FEATURES = {
    'Maharashtra, India': {
        'features': [65, 40, 210, 28.5, 65, 6.7, 12.5],  # Likely for Cotton or Soybean
        'localtime': '2024-01-15 14:30'
    },
    'Punjab, India': {
        'features': [80, 50, 230, 22.0, 55, 7.2, 5.0],   # Likely for Wheat
        'localtime': '2024-01-15 15:45'
    },
    'Kerala, India': {
        'features': [50, 25, 180, 30.5, 80, 5.5, 250.0], # Likely for Rice
        'localtime': '2024-01-15 16:20'
    },
    'Rajasthan, India': {
        'features': [40, 20, 170, 35.0, 40, 8.0, 2.0],   # Likely for Bajra (Pearl Millet)
        'localtime': '2024-01-15 17:10'
    },
    'Tamil Nadu, India': {
        'features': [55, 35, 195, 32.0, 70, 6.0, 100.0], # Likely for Sugarcane
        'localtime': '2024-01-15 18:00'
    }
}

@app.route('/')
def index():
    return render_template('map.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get polygon coordinates from the request
        data = request.json
        polygon_coords = data['polygon_coords']
        
        # Find the matching location based on coordinates
        # You might want to implement a more sophisticated location matching logic
        location_name = next(
            (name for name, info in LOCATION_FEATURES.items() 
             if any(abs(coord[0] - lat) < 1 and abs(coord[1] - lon) < 1 
                    for coord in polygon_coords 
                    for lat, lon in [(float(info['features'][3]), float(info['features'][6])))]
            ),
            'Unknown Location'
        )

        # Get features for the matched location
        location_info = LOCATION_FEATURES.get(location_name, list(LOCATION_FEATURES.values())[0])
        avg_features = location_info['features']
        localtime = location_info['localtime']

        # Scale the features using the saved scaler
        features_scaled = std_scaler.transform([avg_features])
        
        # Predict probabilities
        probabilities = model.predict_proba(features_scaled)[0]
        
        # Get the index of the highest probability
        predicted_index = np.argmax(probabilities)
        predicted_crop = label_encoder.inverse_transform([predicted_index])[0]

        # Prepare probabilities dictionary
        prob_dict = dict(zip(label_encoder.classes_, probabilities.tolist()))
        sorted_probs = sorted(prob_dict.items(), key=lambda x: x[1], reverse=True)

        return jsonify({
            'predicted_crop': predicted_crop,
            'top_5_crops': sorted_probs[:5],
            'features': avg_features,
            'confidence': float(probabilities[predicted_index]),
            'location': location_name,
            'localtime': localtime
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/prediction')
def prediction_page():
    predicted_crop = request.args.get('predicted_crop', 'No prediction')
    features = request.args.get('features', 'No features')
    location = request.args.get('location')
    return render_template('prediction.html', 
                            predicted_crop=predicted_crop, 
                            features=list(map(float, features[1 : -1].split(',') if isinstance(features, str) else features)),
                            location=location)

if __name__ == '_main_':
    app.run(debug=True, port=7000)