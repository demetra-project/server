CREATE DATABASE IF NOT EXISTS demetra;
USE demetra;

CREATE TABLE IF NOT EXISTS sensors_data (
    temperature DECIMAL(10, 2) NOT NULL,
    humidity DECIMAL(10, 2) NOT NULL,
    gas DECIMAL(10, 2) NOT NULL,
    gps_lat DECIMAL(10, 7) NOT NULL,
    gps_lon DECIMAL(10, 7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (gps_lat, gps_lon, created_at)
);

CREATE TABLE IF NOT EXISTS recognitions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    object_name VARCHAR(255) NOT NULL,
    object_quantity INT NOT NULL DEFAULT 1,
    gps_lat DECIMAL(10, 7) NOT NULL,
    gps_lon DECIMAL(10, 7) NOT NULL,
    sensor_created_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gps_lat, gps_lon, sensor_created_at)
        REFERENCES sensors_data(gps_lat, gps_lon, created_at)
        ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS places (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     lat DECIMAL(10, 7) NOT NULL,
--     lon DECIMAL(10, 7) NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     objects_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


-- CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';
-- GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%';
-- FLUSH PRIVILEGES;


-- INITIAL DATA

-- INSERT INTO sensors_data (id, temperature, humidity, gas, gps_lat, gps_lon, created_at) VALUES
--     (1, 25.5, 60.2, 100.0, 45.1234567, 9.1234567, '2025-03-23 08:00:00'),
--     (2, 22.8, 55.1, 95.5, 45.1234567, 9.1234567, '2025-03-23 08:00:00'),
--     (3, 28.3, 65.7, 105.2, 45.1234567, 9.1234567, '2025-03-23 08:00:00')
-- ON DUPLICATE KEY UPDATE
--     temperature = VALUES(temperature),
--     humidity = VALUES(humidity),
--     gas = VALUES(gas),
--     gps_lat = VALUES(gps_lat),
--     gps_lon = VALUES(gps_lon),
--     created_at = VALUES(created_at);

-- INSERT INTO recognitions (id, object_name, object_quantity, created_at) VALUES
--     (1, "cardboard", 23, '2025-03-23 08:00:00'),
--     (2, "paper", 7, '2025-03-23 08:00:00'),
--     (3, "plastic", 11, '2025-03-23 08:00:00'),
-- ON DUPLICATE KEY UPDATE
--     object_name = VALUES(object_name),
--     object_quantity = VALUES(object_quantity),
--     created_at = VALUES(created_at);