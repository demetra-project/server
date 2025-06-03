# Demetra Server

## Description
Demetra server is a powerful and flexible server software designed to handle every task efficiently. Built with Node.js, Apollo Server, and GraphQL, it can be used for both small and large deployments, thanks to its scalability and high performance.

## Configuration
Before starting the server, create a .env file in the root directory of the project. Below is a sample .env configuration:
```plaintext
DB_HOST="localhost"           # Database host address, set "db" if using Docker
DB_PORT=3306                  # Database port (default for MySQL)
DB_NAME="..."                 # Name of your database
DB_USER="..."                 # Database username
DB_PASSWORD="..."             # Database password
DB_DIALECT=mysql              # Dialect for the database (MySQL)
NODE_ENV="..."                # "development" or "production"
CLIENT_ORIGIN="..."           # the client url, if not set, the server will default to 127.0.0.1:8080
MYSQL_ROOT_PASSWORD="..."     # MySQL root password for Docker
```
If the environment variable `NODE_ENV` is set to `development`, the server will default drop and recreate the database tables.

Then import the database:
```bash
mysql -u [user] -p < demetra.sql
```

## Installation
To install Demetra server, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/demetra-project/server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the server:
   ```bash
   pnpm start
   ```

To set up the Docker container, after setting up the environment variables, run:
   ```bash
   docker-compose up
   ```

## Usage
Here are some examples on how to use Demetra server using [cURL](https://curl.se/):

- To fetch all sensors data:
  ```bash
    curl -X POST http://localhost:4000/ \
    -H "Content-Type: application/json" \
    -d '{"query":"{ allSensorData { temperature humidity gas gps_lat gps_lon created_at } }"}'
    ```
- To fetch a single sensor data acquisition:
  ```bash
    curl -X POST http://localhost:4000/ \
    -H "Content-Type: application/json" \
    -d '{"query":"{ sensorData(gps_lat:45.1234, gps_lon:9.1234, created_at:\"2025-04-24T00:00:00.000Z\") { temperature humidity gas gps_lat gps_lon created_at } }"}'
    ```
- To fetch all recognized objects:
  ```bash
    curl -X POST http://localhost:4000/ \
    -H "Content-Type: application/json" \
    -d '{"query":"{ allRecognitions { id object_name object_quantity gps_lat gps_lon sensor_created_at created_at } }"}'
    ```
  - To fetch just a single recognized object:
  ```bash
    curl -X POST http://localhost:4000/ \
    -H "Content-Type: application/json" \
    -d '{"query":"{ recognition(gps_lat:45.1234, gps_lon:9.1234, sensor_created_at:\"2025-04-24T00:00:00.000Z\") { id object_name object_quantity gps_lat gps_lon sensor_created_at created_at } }"}'
    ```
- To add a new sensors data acquisition:
  ```bash
    curl -X POST http://localhost:4000/ \
    -H "Content-Type: application/json" \
    -d '{"query":"mutation { addSensorData(temperature:23.5, humidity:45.2, gas:0.9, gps_lat:45.1234, gps_lon:9.1234, created_at:\"2025-04-24T00:00:00.000Z\") { temperature humidity gas gps_lat gps_lon created_at } }"}'
    ```
- To edit a sensor data acquisition:
  ```bash
    curl -X POST http://localhost:4000/ \
    -H "Content-Type: application/json" \
    -d '{"query": "mutation { editSensorData(gps_lat: 40.8448, gps_lon: -73.8648, created_at: \"2025-06-03T10:25:00Z\", temperature: 25.0, humidity: 65.0, gas: 0.035) { gps_lat gps_lon created_at temperature humidity gas } }" }'
    ```
- To add a recognized object:
  ```bash
    curl -X POST http://localhost:4000/ \
    -H "Content-Type: application/json" \
    -d '{"query":"mutation { addObject(object_name:\"Bottle\", object_quantity:2, gps_lat:45.1234, gps_lon:9.1234, sensor_created_at:\"2025-04-24T00:00:00.000Z\", created_at:\"2025-04-24T00:01:00.000Z\") { id object_name object_quantity gps_lat gps_lon sensor_created_at created_at } }"}'
    ```
- To edit a recognized object:
  ```bash
    curl -X POST http://localhost:4000/ \
    -H "Content-Type: application/json" \
    -d '{"query": "mutation { editRecognition(id: 1, object_name: \"Bottle\", object_quantity: 12) { id object_name object_quantity } }" }'
    ```

## License
This project is licensed under the [GNU General Public License v3.0](https://github.com/demetra-project/server/blob/main/LICENSE).

## Credits
This project was developed and is maintained by [gkkconan](https://github.com/gkkconan).