# Weather Getaway App

Discover your dream vacation destination based on preferred temperature with WeatherGetaway!

This web application allows users to search for cities based on temperature criteria. The application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

- Users can search for cities based on average temperature and month.
- The application uses an external weather API to retrieve historical temperature data for cities.
- Cities matching the temperature criteria are displayed to the user.

## Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine.
- MongoDB should be installed and running.

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Install the dependencies for the server:

```bash
cd server
npm install
```

3. Create a configuration file:

* Rename the `config.example.js` file in the `server` folder to `config.js`.
* Open `config.js` and replace `<your_database_username>` and `<your_database_password>` with your MongoDB database username and password.

4. Install the dependencies for the client:

```bash
cd ../client
npm install
```

5. Start the server:

```bash
cd ../server
npm start
```
The server should start running on http://localhost:5000.

6. Start the client:

```bash
cd ../client
npm start
```
The client should open in your default web browser at http://localhost:3000.

## Usage
* Access the application by visiting http://localhost:3000 in your web browser.
* Enter the desired search criteria in the form, including the travel month, minimum temperature, and maximum temperature.
* Click the "Search" button to retrieve cities matching the temperature criteria.
* The search results will be displayed on the page.

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
