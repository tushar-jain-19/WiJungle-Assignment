import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertContext } from '../App';

const processData = (data) => {
  const counts = {};
  data.forEach(alert => {
    const destIP = alert.dest_ip;
    const destPort = alert.dest_port;
    if (!counts[destIP]) {
      counts[destIP] = { destIP, count: 0, ports: {} };
    }
    counts[destIP].count += 1;
    if (!counts[destIP].ports[destPort]) {
      counts[destIP].ports[destPort] = 0;
    }
    counts[destIP].ports[destPort] += 1;
  });

  Object.values(counts).forEach(item => {
    item.ports = Object.entries(item.ports)
      .sort((a, b) => b[1] - a[1]) 
      .slice(0, 10);
  });

  return Object.values(counts);
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 p-2 border border-gray-600 rounded">
        <p className="text-white"><span className='font-bold'>Destination IP:</span> {data.destIP}</p>
        <p className="text-white"><span className='font-bold'>Alert Count:</span> {data.count}</p>
        <p className="text-white"><span className='font-bold'>Top 10 Ports:</span></p>
        <ul className="text-white">
          {data.ports.map(([port, count]) => (
            <li className='pl-4' key={port}>{`${port} Port - ${count} times`}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

const DestinationAlertCountChart = () => {
  const data = useContext(AlertContext);
  const chartData = processData(data);

  return (
    <div className="container mx-auto p-6 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">Destination IP and Alert Count</h1>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
          <XAxis
            dataKey="destIP"
            angle={-45}
            tick={{ fontSize: 12, fill: '#cccccc' }}
            height={100}
            textAnchor="end"
            interval={0}
            padding={{ left: 15, right: 15 }}
          />
          <YAxis tick={{ fill: '#ddd' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={2}
            name="Alert Count"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DestinationAlertCountChart;
