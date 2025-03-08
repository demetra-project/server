# Demetra Server

## Description
Demetra server is a powerful and flexible server software designed to handle every task efficiently. Built with Node.js, Apollo Server, and GraphQL, it can be used for both small and large deployments, thanks to its scalability and high performance.

## Configuration
Before starting the server, create a .env file in the root directory of the project. Below is a sample .env configuration:
```plaintext
DB_HOST="localhost"           # Database host address
DB_PORT=3306                  # Database port (default for MySQL)
DB_NAME="..."                 # Name of your database
DB_USER="..."                 # Database username
DB_PASSWORD="..."             # Database password
DB_DIALECT=mysql              # Dialect for the database (MySQL)
```

## Installation
To install Demetra Server, follow these steps:
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

## Usage
To fetch all sensor data, you can use the following [curl](https://curl.se/) command:
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/graphql \
  --data '{"query": "{allSensorData { id temperature humidity gas createdAt } }" }'
```

## License
This project is licensed under the [GNU General Public License v3.0](https://github.com/demetra-project/server/blob/main/LICENSE).

## Credits
This project was developed and is maintained by [gkkconan](https://github.com/gkkconan).
