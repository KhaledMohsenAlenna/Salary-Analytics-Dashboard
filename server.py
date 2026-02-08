from flask import Flask, jsonify, render_template
import pandas as pd
import country_converter as coco



df = pd.read_csv("DSsalaries.csv")

classes2 = df["job_title"].value_counts().index
values2 = df["job_title"].value_counts().values

data2 = []

for i in range(len(classes2)):
    data2.append({"class2": classes2[i], "value2":int(values2[i])})



app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")



#chart_1
@app.route('/get-datchar')
def get_datachart():
    us_data = df.loc[df['company_location'] == 'US']
    us_salary = us_data['salary'].sort_index().index
    values = df['work_year'].sort_values().values
    data = []
    for i in range(len(us_salary)):
        data.append({"class": int(us_salary[i]), "value":int(values[i])})
    # print(data)
    return jsonify(data)







@app.route('/get-datchar2')
def get_datachart2():

    classes2 = df["job_title"].value_counts().index
    values2 = df["job_title"].value_counts().values

    data2 = []

    for i in range(len(classes2)):
        data2.append({"class": classes2[i], "value":int(values2[i])})
    return jsonify(data2)



#chart_3
@app.route('/get-datchar3')
def get_datachart3():
    
        classes3 = df["experience_level"].value_counts().index
        values3 = df["experience_level"].value_counts().values
        data3 = []
        for i in range(len(classes3)):
            data3.append({"class": classes3[i], "value":int(values3[i])})
        print(data3)
        return jsonify(data3)

if __name__ == '__main__':
    app.run(debug=True)