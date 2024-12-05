import pickle
import numpy as np
import pandas as pd
from flask import Flask, render_template, request, jsonify
from sklearn.preprocessing import StandardScaler, LabelEncoder
import requests
import os

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

def get_weather_data(lat, lon, api_key):
    url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={lat},{lon}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            localtime = data['location'].get('localtime', 'Not Available')
            return {
                'Temperature': data['current']['temp_c'],
                'Humidity': data['current']['humidity'],
                'Rainfall': data['current']['precip_mm'],
                'localtime': localtime
            }
    except Exception as e:
        print(f"Weather API error: {e}")

# Function to fetch soil data using SoilGrids API
    # Function to fetch soil data using hardcoded values from the dataset
def get_soil_data(lat, lon):
    # Dataset
    soil_data = [
        {'Latitude': 27.2038, 'Longitude': 77.5011, 'Nitrogen': 50, 'Phosphorus': 25, 'Potassium': 200, 'pH_Value': 6.5},
        {'Latitude': 28.7041, 'Longitude': 77.1025, 'Nitrogen': 60, 'Phosphorus': 30, 'Potassium': 180, 'pH_Value': 7.0},
        {'Latitude': 19.0760, 'Longitude': 72.8777, 'Nitrogen': 55, 'Phosphorus': 35, 'Potassium': 190, 'pH_Value': 6.8},
        {'Latitude': 13.0827, 'Longitude': 80.2707, 'Nitrogen': 45, 'Phosphorus': 20, 'Potassium': 170, 'pH_Value': 5.5},
        {'Latitude': 22.5726, 'Longitude': 88.3639, 'Nitrogen': 70, 'Phosphorus': 40, 'Potassium': 220, 'pH_Value': 7.2},
        {'Latitude': 23.2599, 'Longitude': 77.4126, 'Nitrogen': 65, 'Phosphorus': 33, 'Potassium': 210, 'pH_Value': 6.7},
        {'Latitude': 17.3850, 'Longitude': 78.4867, 'Nitrogen': 48, 'Phosphorus': 28, 'Potassium': 195, 'pH_Value': 6.2},
        {'Latitude': 15.3173, 'Longitude': 75.7139, 'Nitrogen': 52, 'Phosphorus': 26, 'Potassium': 185, 'pH_Value': 6.0},
        {'Latitude': 25.5941, 'Longitude': 85.1376, 'Nitrogen': 62, 'Phosphorus': 38, 'Potassium': 205, 'pH_Value': 6.9},
        {'Latitude': 11.0168, 'Longitude': 76.9558, 'Nitrogen': 47, 'Phosphorus': 22, 'Potassium': 175, 'pH_Value': 5.8},
    ]
    
    # Calculate distances and find the nearest point
    def haversine(lat1, lon1, lat2, lon2):
        from math import radians, sin, cos, sqrt, atan2
        
        # Radius of the Earth in kilometers
        R = 6371.0
        
        # Convert degrees to radians
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        
        # Differences
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        
        # Haversine formula
        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        
        return R * c
    
    # Find the closest match
    closest_point = min(
        soil_data, 
        key=lambda point: haversine(lat, lon, point['Latitude'], point['Longitude'])
    )
    
    # Return the closest soil data
    return {
        'Nitrogen': closest_point['Nitrogen'],
        'Phosphorus': closest_point['Phosphorus'],
        'Potassium': closest_point['Potassium'],
        'pH_Value': closest_point['pH_Value']
    }

    
    # Default

# Function to get average features from polygon coordinates
def get_average_features(polygon_coords, api_key):
    features_list = []
    
    for lat, lon in polygon_coords:
        # Fetch weather data
        weather_data = get_weather_data(lat, lon, api_key)
        
        # Fetch soil data
        soil_data = get_soil_data(lat, lon)
        
        # Combine features in the order: Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall
        features = [
            soil_data['Nitrogen'],
            soil_data['Phosphorus'],
            soil_data['Potassium'],
            weather_data['Temperature'],
            weather_data['Humidity'],
            soil_data['pH_Value'],
            weather_data['Rainfall']
        ]
        features_list.append(features)
    
    # Calculate average features
    avg_features = np.mean(features_list, axis=0)
    return avg_features, weather_data['localtime']

@app.route('/')
def index():
    return render_template('map.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get polygon coordinates from the request
        data = request.json
        polygon_coords = data['polygon_coords']
        api_key = os.environ['weather_api']  # Your WeatherAPI key

        # Get average features for the polygon
        avg_features, location = get_average_features(polygon_coords, api_key)

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
            'features': avg_features.tolist(),
            'confidence': float(probabilities[predicted_index]),
            'location': location
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
                            features=list(map(float, features[1 : -1].split(','))),
                            location=location)

if __name__ == '__main__':
    app.run(debug=True, port=7000)
