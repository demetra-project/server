CREATE DATABASE IF NOT EXISTS demetra;
USE demetra;

CREATE TABLE IF NOT EXISTS sensors_data (
    id SERIAL UNIQUE,
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