CREATE DATABASE IF NOT EXISTS demetra;
USE demetra;

CREATE TABLE IF NOT EXISTS sensors_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature DECIMAL(10, 2) NOT NULL,
    humidity DECIMAL(10, 2) NOT NULL,
    gas DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recognitions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    object_name VARCHAR(255) NOT NULL,
    object_quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- INITIAL DATA

-- INSERT INTO sensors_data (id, temperature, humidity, gas, created_at) VALUES
--     (1, 25.5, 60.2, 100.0, '2025-03-23 08:00:00'),
--     (2, 22.8, 55.1, 95.5, '2025-03-23 08:00:00'),
--     (3, 28.3, 65.7, 105.2, '2025-03-23 08:00:00')
-- ON DUPLICATE KEY UPDATE
--     temperature = VALUES(temperature),
--     humidity = VALUES(humidity),
--     gas = VALUES(gas),
--     created_at = VALUES(created_at);

-- INSERT INTO recognitions (id, object_name, object_quantity, created_at) VALUES
--     (1, "cardboard", 23, '2025-03-23 08:00:00'),
--     (2, "paper", 7, '2025-03-23 08:00:00'),
--     (3, "plastic", 11, '2025-03-23 08:00:00'),
-- ON DUPLICATE KEY UPDATE
--     object_name = VALUES(object_name),
--     object_quantity = VALUES(object_quantity),
--     created_at = VALUES(created_at);