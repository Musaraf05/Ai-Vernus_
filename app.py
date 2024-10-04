from flask import Flask, render_template,redirect, request, jsonify,url_for
import pandas as pd
import os

app = Flask(__name__)

# Path to store the Excel file
excel_file_path = 'data/login_data.xlsx'

# Create a folder if it doesn't exist
os.makedirs(os.path.dirname(excel_file_path), exist_ok=True)

# Initialize the Excel file if it doesn't exist
if not os.path.isfile(excel_file_path):
    df = pd.DataFrame(columns=['Team Name'])
    df.to_excel(excel_file_path, index=False)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/main', methods=['GET'])
def main():
    return render_template('main.html')

@app.route('/submit', methods=['POST'])
def submit():
    # if request.method =='POST':
        team_name = request.form['team-name']
        team_member1 = request.form['team-member1']
        team_member2 = request.form['team-member2']
        team_member3 = request.form.get('team-member3', '')

    # Concatenate all values into a single string for the "Team Name" column
        combined_team_info = f"{team_name}; {team_member1}; {team_member2}; {team_member3}"

    # Create a DataFrame from the combined string
        new_data = pd.DataFrame([[combined_team_info]], columns=['Team Name'])

    # Load existing data
        try:
            existing_data = pd.read_excel(excel_file_path)
        except ValueError:
            existing_data = pd.DataFrame(columns=['Team Name'])

    # Append new data
        combined_data = pd.concat([existing_data, new_data], ignore_index=True)

    # Save the combined data back to Excel
        combined_data.to_excel(excel_file_path, index=False)

        return jsonify({"status": "success", "data": new_data.to_dict(orient='records')})
    #     return redirect(url_for('main'))
    # else:
    #     return redirect(url_for('login'))
    


if __name__ == '__main__':
    app.run(debug=True)
