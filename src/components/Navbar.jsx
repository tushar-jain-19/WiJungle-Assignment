import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-white text-lg font-bold cursor-pointer" onClick={() => navigate('/')}>Network Alert</h1>
        </div>
        <ul className="flex space-x-4">
          <li className={`text-white ${location.pathname === '/' ? 'text-gray-300 border-b' : 'hover:text-gray-300'} cursor-pointer`} onClick={() => navigate("/")}>
            Dashboard
          </li>
          <li className={`text-white ${location.pathname === '/flowid' ? 'text-gray-300 border-b' : 'hover:text-gray-300'} cursor-pointer`}>
            Search Flow
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
