import express from 'express';

const app = express();

function mapSensor(sensorId, location) {
  if (!location) {
    switch (sensorId) {
      case '1':
        location = 'Living Room';
        break;
      case '2':
        location = 'Bedroom';
        break;
      case '3':
        location = 'Kitchen';
        break;
      default:
        location = 'Unknown';
    }
  }

  if (!sensorId) {
    switch (location) {
      case 'Living Room':
        sensorId = '1';
        break;
      case 'Bedroom':
        sensorId = '2';
        break;
      case 'Kitchen':
        sensorId = '3';
        break;
      default:
        sensorId = '0';
    }
  }

  return { sensorId, location };
}

function buildTemperatureResponse(sensorId, location) {
  const { sensorId: sid, location: loc } = mapSensor(sensorId, location);
  const value = parseFloat((Math.random() * 12 + 18).toFixed(1));
  const timestamp = new Date().toISOString();

  return {
    value,
    unit: '°C',
    timestamp,
    location: loc,
    status: 'ok',
    sensor_id: sid,
    sensor_type: 'temperature',
    description: `Sensor ${sid} at ${loc}`,
  };
}

app.get('/temperature', (req, res) => {
  let { location = '', sensorId = '' } = req.query;

  const response = buildTemperatureResponse(sensorId, location);
  res.json({
    sensorId: response.sensor_id,
    location: response.location,
    value: response.value,
    unit: response.unit,
    timestamp: response.timestamp,
    status: response.status,
    sensor_id: response.sensor_id,
    sensor_type: response.sensor_type,
    description: response.description,
  });
});

app.get('/temperature/:id', (req, res) => {
  const sensorId = req.params.id || '';
  const response = buildTemperatureResponse(sensorId, '');

  res.json(response);
});

const PORT = 8081;
app.listen(PORT, () => console.log('server started on port', PORT));
