import csv
import datetime
import requests
from pymongo import MongoClient
from config import MONGODB_URI

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client.weather_getaway

# Define the API endpoint
API_ENDPOINT = 'https://archive-api.open-meteo.com/v1/archive'

# Read cities information from the CSV file
cities = []
with open('cities.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        cities.append(row)

# Get the current year
current_year = datetime.datetime.now().year

# Iterate over each city
for city in cities:
    city_name = city['name']
    city_country = city['country']
    city_continent = city['continent']
    city_latitude = city['latitude']
    city_longitude = city['longitude']

    # Calculate the start and end dates for the current city's data (1 year period)
    start_date = datetime.datetime(current_year, 1, 1)
    end_date = datetime.datetime(current_year, 12, 31)

    # Format the dates for the API request
    start_date_str = start_date.strftime('%Y-%m-%d')
    end_date_str = end_date.strftime('%Y-%m-%d')

    # Make API request for the current city
    response = requests.get(f'{API_ENDPOINT}?latitude={city_latitude}&longitude={city_longitude}&start={start_date_str}&end={end_date_str}')

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the response JSON
        data = response.json()

        # Extract the daily temperature data
        daily_temperatures = data['daily']

        # Create a dictionary to store the monthly average high and low temperatures
        monthly_temperatures = {}

        # Iterate over the daily temperature data and calculate the monthly averages
        for i in range(len(daily_temperatures['time'])):
            date = datetime.datetime.strptime(daily_temperatures['time'][i], '%Y-%m-%d')
            month = date.strftime('%B')
            max_temp = daily_temperatures['temperature_2m_max'][i]
            min_temp = daily_temperatures['temperature_2m_min'][i]

            if month not in monthly_temperatures:
                # Initialize the monthly temperature entry
                monthly_temperatures[month] = {
                    'sum_max_temp': max_temp,
                    'sum_min_temp': min_temp,
                    'count': 1
                }
            else:
                # Add the daily temperature to the monthly sum
                monthly_temperatures[month]['sum_max_temp'] += max_temp
                monthly_temperatures[month]['sum_min_temp'] += min_temp
                monthly_temperatures[month]['count'] += 1

        # Create the temperatures array for the city
        temperatures = []
        for month, data in monthly_temperatures.items():
            average_high = data['sum_max_temp'] / data['count']
            average_low = data['sum_min_temp'] / data['count']
            temperature = {
                'month': month,
                'averageHigh': average_high,
                'averageLow': average_low
            }
            temperatures.append(temperature)

        # Create a document to be inserted into MongoDB
        document = {
            'name': city_name,
            'country': city_country,
            'continent': city_continent,
            'temperatures': temperatures
        }

        # Insert the document into the collection
        collection = db['City']
        collection.insert_one(document)

        print(f"Data for {city_name} successfully populated and saved to MongoDB.")
    else:
        print(f"Error occurred while making the API request for {city_name}.")

print("Data population complete.")
