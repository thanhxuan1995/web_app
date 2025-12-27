from flask import Flask, request, jsonify, send_file, render_template
from main import PARTITION
import os
import tempfile
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/partition', methods=['POST'])
def partition_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400
    # Save uploaded file temporarily
    temp_dir = tempfile.mkdtemp()
    file_path = os.path.join(temp_dir, uploaded_file.filename)
    uploaded_file.save(file_path)

    # Create output CSV name based on uploaded file
    base_name, _ = os.path.splitext(uploaded_file.filename)
    output_csv_name = f"{base_name}_partition.csv"
    output_csv = os.path.join(temp_dir, output_csv_name)

    # Process file
    parser = PARTITION(file_path)
    parser.partition_to_wide(output_csv=output_csv)

    # Return CSV file
    return send_file(output_csv, as_attachment=True, download_name=output_csv_name)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)