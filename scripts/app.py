from flask import Flask, request, jsonify
import google.generativeai as genai
import os 

app = Flask(__name__)

# Set your API key
os.environ['GOOGLE_API_KEY'] = "AIzaSyDTkAWk24ioZNuQYFRy-hkA2I2IF41Y-hU"
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

model = genai.GenerativeModel('gemini-pro')

@app.before_request
def cors_before_request():
    if request.method == 'OPTIONS':
        return jsonify({"result": "success"}), 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }

@app.after_request
def cors_after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

@app.route('/recommend', methods=['POST', 'OPTIONS'])
def recommend_fertilizer():
    if request.method == 'OPTIONS':
        return jsonify({"result": "success"}), 200

    # Check if input is provided
    if not request.json or 'input' not in request.json:
        return jsonify({'error': 'Input is required'}), 400

    input_data = request.json['input']
    
    prompt = f"Given the location of the land, the type of crop being grown, and the current weather conditions specified in the input '{input_data}', please suggest four types of fertilizers that are suitable for the specified crop in India. For each fertilizer, include the name (in bold HTML tags) and the manufacturer. Format the output as a numbered list without any additional formatting. So do not add '*' marks anywhere in the output text. give me the output text such that it gives the bold word wrapped within the html tag too. "
    
    try:
        response = model.generate_content(prompt)
        specialty = response.candidates[0].content.parts[0].text
        return jsonify({'specialty': specialty})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)