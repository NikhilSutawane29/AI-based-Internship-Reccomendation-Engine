from flask import Flask, render_template, request
import mysql.connector
import os

app = Flask(__name__)

# MySQL Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'yourpassword',
    'database': 'pminternship_recommender'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

def load_internships():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM internships")
    internships = cursor.fetchall()
    cursor.close()
    conn.close()
    return internships

def recommend_internships(user_data):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = """
    SELECT * FROM internships
    WHERE sector = %s
    AND required_education = %s
    AND (location = %s OR state = %s)
    """
    cursor.execute(query, (
        user_data['sector'],
        user_data['education'],
        user_data['location'],
        user_data['location']
    ))
    recommendations = cursor.fetchall()
    cursor.close()
    conn.close()
    return recommendations

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_data = {
            'education': request.form['education'],
            'skills': [s.strip() for s in request.form['skills'].split(',') if s.strip()],
            'sector': request.form['sector'],
            'location': request.form['location']
        }
        recommendations = recommend_internships(user_data)
        return render_template('results.html', recommendations=recommendations)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
