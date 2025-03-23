CREATE DATABASE IF NOT EXISTS demetra;
USE demetra;

CREATE TABLE IF NOT EXISTS sensors_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature DECIMAL(10, 2) NOT NULL,
    humidity DECIMAL(10, 2) NOT NULL,
    gas DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- INITIAL DATA
INSERT INTO sensors_data (id, temperature, humidity, gas, created_at) VALUES
    (1, 25.5, 60.2, 100.0, '2025-03-23 08:00:00'),
    (2, 22.8, 55.1, 95.5, '2025-03-23 08:00:00'),
    (3, 28.3, 65.7, 105.2, '2025-03-23 08:00:00')
ON DUPLICATE KEY UPDATE
    temperature = VALUES(temperature),
    humidity = VALUES(humidity),
    gas = VALUES(gas),
    created_at = VALUES(created_at);