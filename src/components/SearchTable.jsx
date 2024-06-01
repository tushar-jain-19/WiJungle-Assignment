import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../App';
import { useLocation } from 'react-router-dom';

const toTitleCase = (str) => {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
};

const SearchTable = () => {
    const data = useContext(AlertContext);
    const [flowData, setFlowData] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const searchFlowData = () => {
        if (flowData.length != 0) {
            setFlowData([])
        }
        setFlowData(data.filter(alert => alert.flow_id == id))
    }

    useEffect(() => {
        searchFlowData();
    }, [id]);
    return (
        <div className="container mx-auto p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-8 text-center">Network Alert Details</h1>
            {flowData.length > 0 ? (
                <div className="overflow-x-auto border-gray-800 shadow-md ">
                    <table className="min-w-full bg-gray-800 overflow-hidden">
                        <tbody>
                            {Object.entries(flowData[0]).map(([key, value], index) => (
                                <React.Fragment key={key}>
                                    {typeof value === 'object' ? (
                                        Object.entries(value).map(([subKey, subValue], subIndex) => (
                                            <tr key={subKey} className={`group hover:bg-gray-700 ${subIndex % 2 !== 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                                                <td className={`px-6 py-4 group-hover:bg-gray-700 whitespace-nowrap font-semibold text-gray-300 ${subIndex % 2 !== 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>{`${toTitleCase(key)} - ${toTitleCase(subKey)}`}</td>
                                                <td className="px-6 py-4 text-gray-400">{subValue.toString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr key={key} className={`group hover:bg-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                                            <td className={`px-6 py-4 group-hover:bg-gray-700 whitespace-nowrap font-semibold text-gray-300 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>{toTitleCase(key)}</td>
                                            <td className="px-6 py-4 text-gray-400">{key === 'timestamp' ? formatDate(value) : value.toString()}</td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <h1 className="text-xl mb-8 text-center">Invalid ID</h1>}
        </div>
    );
};

export default SearchTable;
