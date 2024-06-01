import React from 'react';
import SourceIP from '../components/Source';
import DestinationIP from '../components/Destination';
import FlowTable from '../components/FlowID';
import Sourceanddestination from '../components/Sourceanddestination';
import AlertCategoryChart from '../components/AlertCategory';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <div className="flex items-center px-48 pt-6 gap-4">
                <h1 className="text-xl font-bold text-gray-100">Timestamp with Flow ID</h1>
                <span className="text-xl text-gray-300">(Click row for More Info)</span>
            </div>
            <div className="p-6 rounded-lg shadow-md mb-24">
                <FlowTable />
            </div>
            <div>
                <h1 className="text-5xl font-bold mb-3 text-gray-100 text-center">Statistics</h1>
                <div className="flex text-black shadow-md">
                    <SourceIP />
                    <DestinationIP />
                </div>
                <Sourceanddestination />
                <AlertCategoryChart />
            </div>
        </div>
    );
}

export default Dashboard;
