import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertContext } from '../App';

const processData = (data) => {
    const counts = {};
    data.forEach(alert => {
        if (alert.alert) {
            const category = alert.alert.category;
            if (!counts[category]) {
                counts[category] = { category, count: 0 };
            }
            counts[category].count += 1;
        }
    });
    return Object.values(counts);
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-800 p-2 border border-gray-600 rounded">
                <p className="text-white"><span className='font-bold'>Category:</span> {data.category}</p>
                <p className="text-white"><span className='font-bold'>Alert Count:</span> {data.count}</p>
            </div>
        );
    }
    return null;
};

const AlertCategoryChart = () => {
    const data = useContext(AlertContext);
    const chartData = processData(data);

    return (
        <div className="container mx-auto p-6 bg-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-white text-center">Alert Count by Category</h1>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                    <XAxis
                        dataKey="category"
                        tick={{ fontSize: 14, fill: '#cccccc' }}
                        height={100}
                        interval={0}
                        padding={{ left: 15, right: 15 }}
                    />
                    <YAxis tick={{ fill: '#ddd' }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AlertCategoryChart;
