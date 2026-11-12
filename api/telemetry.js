// api/telemetry.js
export default function handler(req, res) {
  // CORS configuration for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Base smart meter telemetry data with fluctuating power loads
  const baseMeters = [
    { id: 'MTR-ORT-01', kw: 4.2 }, { id: 'MTR-ORT-02', kw: 8.5 },
    { id: 'MTR-ORT-03', kw: 3.1 }, { id: 'MTR-ORT-04', kw: 1.8 },
    { id: 'MTR-ORT-05', kw: 2.9 }, { id: 'MTR-ORT-06', kw: 2.1 },
    { id: 'MTR-QC-01', kw: 6.4 }, { id: 'MTR-QC-02', kw: 3.7 },
    { id: 'MTR-QC-03', kw: 5.1 }, { id: 'MTR-QC-04', kw: 2.4 },
    { id: 'MTR-QC-05', kw: 9.2 }, { id: 'MTR-QC-06', kw: 1.4 },
    { id: 'MTR-BGC-01', kw: 7.8 }, { id: 'MTR-BGC-02', kw: 6.1 },
    { id: 'MTR-BGC-03', kw: 3.9 }, { id: 'MTR-BGC-04', kw: 5.5 },
    { id: 'MTR-BGC-05', kw: 8.9 }, { id: 'MTR-BGC-06', kw: 1.9 }
  ];

  const simulatedTelemetry = baseMeters.map(meter => {
    // Randomize the kW load slightly to simulate real-time usage
    const loadFluctuation = (Math.random() * 0.4 - 0.2); 
    const newKw = Math.max(0.1, meter.kw + loadFluctuation);
    
    return {
      id: meter.id,
      kw: parseFloat(newKw.toFixed(2)),
      timestamp: new Date().toISOString()
    };
  });

  res.status(200).json(simulatedTelemetry);
}