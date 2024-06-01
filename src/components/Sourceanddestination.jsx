import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertContext } from '../App';

const processData = (data) => {
  const counts = {};
  data.forEach(alert => {
    const srcIP = alert.src_ip;
    const destIP = alert.dest_ip;
    const key = `${srcIP}-${destIP}`;
    if (!counts[key]) {
      counts[key] = { srcIP, destIP, count: 0 };
    }
    counts[key].count += 1;
  });
  return Object.values(counts);
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { srcIP, ...rest } = payload[0].payload;
    return (
      <div className="bg-gray-800 p-2 border border-gray-600 rounded">
        <p className="text-white"><strong>Source IP:</strong> {srcIP}</p>
        {Object.entries(rest).map(([destIP, count]) => (
          <p key={destIP} className="text-white"><strong>Destination IP:</strong> {destIP}, <strong>Alert Count:</strong> {count}</p>
        ))}
      </div>
    );
  }
  return null;
};

const SourceAndDestination = () => {
  const data = useContext(AlertContext);
  const chartData = processData(data);
  const srcIPs = [...new Set(chartData.map(item => item.srcIP))];
  const destIPs = [...new Set(chartData.map(item => item.destIP))];

  const transformedData = srcIPs.map(srcIP => {
    const dataPoints = { srcIP };
    destIPs.forEach(destIP => {
      const found = chartData.find(item => item.srcIP === srcIP && item.destIP === destIP);
      dataPoints[destIP] = found ? found.count : 0;
    });
    return dataPoints;
  });

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  return (
    <div className="container mx-auto p-6 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">Source IP and Destination IP Relationship</h1>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
          <XAxis
            dataKey="srcIP"
            angle={-45}
            tick={{ fontSize: 12, fill: '#cccccc' }}
            height={100}
            textAnchor="end"
            interval={10}
            padding={{ left: 15, right: 15 }}
          />
          <YAxis tick={{ fill: '#ddd' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
          <Legend />

          {destIPs.map((destIP, index) => (
            <Line
              key={destIP}
              type="monotone"
              dataKey={destIP}
              stroke={colors[index]}
              strokeWidth={2}
              name={`Destination: ${destIP}`}
            />
          ))}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SourceAndDestination;
