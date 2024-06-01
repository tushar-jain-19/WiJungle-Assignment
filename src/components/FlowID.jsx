import React, { useContext } from 'react';
import { AlertContext } from '../App';
import { useNavigate } from 'react-router-dom';

const FlowTable = () => {
    const data = useContext(AlertContext);
    const navigate = useNavigate();
    const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        if (dateA.toDateString() !== dateB.toDateString()) {
            return dateB - dateA;
        } else {
            return dateB.getTime() - dateA.getTime();
        }
    });
    
    return (
        <div className="container mx-auto mt-3 p-6 pt-0 pr-0 h-[600px] overflow-y-scroll bg-gray-900">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Flow ID
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {sortedData.map((alert, index) => (
                        <tr 
                            key={index} 
                            onClick={() => navigate(`flowid?id=${alert.flow_id}`)}
                            className={`hover:bg-gray-700 cursor-pointer ${index % 2 != 0 ? 'even:bg-gray-800' : 'bg-gray-900'}`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">{new Date(alert.timestamp).toDateString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">{new Date(alert.timestamp).toTimeString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">{alert.flow_id}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlowTable;
