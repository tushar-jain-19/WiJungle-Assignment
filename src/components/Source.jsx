import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertContext } from '../App';


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-800 border border-gray-700 p-4 rounded shadow-md text-gray-200">
                <p className="label font-bold mb-1"> Source IP: <span className='font-normal'>{label}</span></p>
                <p className="font-semibold mb-1">Ports: <span className='font-normal'>{data.ports.join(', ')}</span> </p>
                <p className="font-semibold">Alert Count: <span className='font-normal'>{data.count}</span></p>
            </div>
        );
    }

    return null;
};

const processData = (data) => {
    const counts = {};
    data.forEach(alert => {
        const srcIP = alert.src_ip;
        const srcPort = alert.src_port;
        if (!counts[srcIP]) {
            counts[srcIP] = { count: 0, ports: new Set() };
        }
        counts[srcIP].count += 1;
        counts[srcIP].ports.add(srcPort);
    });
    return Object.keys(counts).map(ip => ({
        srcIP: ip,
        count: counts[ip].count,
        ports: Array.from(counts[ip].ports)
    }));
};

const SourceIP = () => {
    const data = useContext(AlertContext);
    const sourceIPCounts = processData(data);
    return (
        <div className="container mx-auto p-6 bg-gray-900 text-gray-200">
            <h1 className="text-3xl font-bold mb-8 text-white text-center">Source IP</h1>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart
                    data={sourceIPCounts}
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
                    <YAxis tick={{ fill: '#cccccc' }} />
                    <Tooltip content={<CustomTooltip heading={"Source"} />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} name="Alert Count" />
                    <Line type="monotone" dataKey="ports.length" stroke="#82ca9d" strokeWidth={2} name="Unique Ports" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SourceIP;
