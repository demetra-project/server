CREATE DATABASE IF NOT EXISTS demetra;
USE demetra;

CREATE TABLE sensors_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  temperature DECIMAL(10, 2) NOT NULL,
  humidity DECIMAL(10, 2) NOT NULL,
  gas DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- INITIAL DATA
INSERT INTO sensors_data (temperature, humidity, gas) VALUES
(25.5, 60.2, 100.0),
(22.8, 55.1, 95.5),
(28.3, 65.7, 105.2);
