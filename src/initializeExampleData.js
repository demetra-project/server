const { SensorData, Recognitions } = require('./database.model');

async function initializeExampleData(){
  const existing = await SensorData.count();
  if(existing > 0) return;

  await SensorData.bulkCreate([
    {
      temperature: 26.4, humidity: 58.2, gas: 0.040,
      gps_lat: 40.7128, gps_lon: -74.0060,
      created_at: '2025-06-03 10:00:00'
    },
    {
      temperature: 25.9, humidity: 61.0, gas: 0.030,
      gps_lat: 40.7851, gps_lon: -73.9683,
      created_at: '2025-06-03 10:05:00'
    },
    {
      temperature: 27.1, humidity: 55.4, gas: 0.045,
      gps_lat: 40.7430, gps_lon: -74.0324,
      created_at: '2025-06-03 10:10:00'
    },
    {
      temperature: 26.0, humidity: 59.8, gas: 0.038,
      gps_lat: 40.6782, gps_lon: -73.9442,
      created_at: '2025-06-03 10:15:00'
    },
    {
      temperature: 25.2, humidity: 63.1, gas: 0.035,
      gps_lat: 40.7282, gps_lon: -73.7949,
      created_at: '2025-06-03 10:20:00'
    },
    {
      temperature: 24.8, humidity: 60.0, gas: 0.032,
      gps_lat: 40.8448, gps_lon: -73.8648,
      created_at: '2025-06-03 10:25:00'
    }
  ]);


  await Recognitions.bulkCreate([
    {
      object_name: 'plastic bottle', object_quantity: 4,
      gps_lat: 40.7128, gps_lon: -74.0060,
      sensor_created_at: '2025-06-03 10:00:00',
      created_at: '2025-06-03 10:01:00'
    },
    {
      object_name: 'can', object_quantity: 2,
      gps_lat: 40.7851, gps_lon: -73.9683,
      sensor_created_at: '2025-06-03 10:15:00',
      created_at: '2025-06-03 10:06:00'
    },
    {
      object_name: 'glass', object_quantity: 1,
      gps_lat: 40.7430, gps_lon: -74.0324,
      sensor_created_at: '2025-06-03 10:10:00',
      created_at: '2025-06-03 10:11:00'
    },
    {
      object_name: 'paper', object_quantity: 5,
      gps_lat: 40.6782, gps_lon: -73.9442,
      sensor_created_at: '2025-06-03 10:15:00',
      created_at: '2025-06-03 10:16:00'
    },
    {
      object_name: 'cardboard', object_quantity: 3,
      gps_lat: 40.7282, gps_lon: -73.7949,
      sensor_created_at: '2025-06-03 10:20:00',
      created_at: '2025-06-03 10:21:00'
    },
    {
      object_name: 'plastic bag', object_quantity: 2,
      gps_lat: 40.8448, gps_lon: -73.8648,
      sensor_created_at: '2025-06-03 10:15:00',
      created_at: '2025-06-03 10:26:00'
    }
  ]);

  console.log('Development data inserted into the database!');
}

module.exports = initializeExampleData;