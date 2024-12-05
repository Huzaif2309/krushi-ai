# Krishi AI: Crop Yield Prediction and Analysis Web App  

**Krishi AI** is an innovative web application designed to empower farmers with real-time insights and analysis about crop yield potential on their farms. By leveraging advanced machine learning models and real-time data, Krishi AI makes agricultural decision-making smarter and more efficient.  

---

## 🌾 **Features**  

1. **Crop Yield Prediction**:  
   - Predict crop yield by simply selecting a location on an interactive **Folium Map**.  
   - Integrates real-time weather and soil data from **OpenWeather API** and soil-specific APIs for accurate predictions.  
   
2. **Data-Driven Insights**:  
   - Analysis of key factors like **temperature**, **rainfall**, **humidity**, and **soil quality**.  
   - Tailored recommendations for optimal crop planning.  

3. **Interactive UI**:  
   - Easy-to-use interface to make predictions and visualize the results.  
   - Farmers can navigate seamlessly and interact with real-time data.  

4. **AI Assistant**:  
   - **Text-to-Speech (TTS)** and **Speech-to-Text (STT)** functionalities for natural interactions.  
   - Personalized assistance for troubleshooting, crop recommendations, and guidance.  

---

## 📊 **Machine Learning Model**  

- The prediction model is trained on the [Crop Recommendation Dataset](https://www.kaggle.com/datasets/varshitanalluri/crop-recommendation-dataset/data).  
- Factors such as nitrogen, phosphorus, potassium content in soil, temperature, and humidity were used to train a robust regression-based model to analyze crop yield potential.  
- Real-time data inputs are mapped to trained model parameters for precise yield predictions.  

---

## 🗺️ **How It Works**  

1. Select your farm location using the **Folium Map** interface.  
2. The app automatically fetches **weather data** (e.g., temperature, humidity, rainfall) and **soil data** (e.g., nitrogen, phosphorus, potassium levels) using integrated APIs.  
3. These inputs are fed into the ML model to predict crop yield potential for that specific area.  
4. View detailed results and recommendations in a user-friendly dashboard.  

---

## 🚀 **Getting Started**  

### Prerequisites  
- Python 3.8+  
- Libraries: `pandas`, `numpy`, `sklearn`, `folium`, `flask`/`streamlit`, `requests`, `openai` (for AI Assistant), and others listed in `requirements.txt`.  
