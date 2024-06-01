import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchTable from '../components/SearchTable';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const currentID = queryParams.get('id') || '';
        if (!currentID) {
            navigate("/");
        }
        setSearchTerm(currentID);
    }, [location.search, navigate]);

    const handleSearch = () => {
        if (searchTerm) {
            navigate(`?id=${searchTerm}`);
        } else {
            navigate(location.pathname);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-start pt-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-8">
                <h1 className="text-2xl font-bold text-gray-300 mb-4 text-center">Search Alerts</h1>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 w-full rounded-lg bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:border-gray-500"
                        placeholder="Enter Alert ID"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 focus:outline-none"
                    >
                        Search
                    </button>
                </div>
            </div>
            <SearchTable searchTerm={searchTerm} />
        </div>
    );
};

export default Search;
