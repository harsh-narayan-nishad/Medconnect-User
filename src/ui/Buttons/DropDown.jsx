import React from 'react';

const Input = () => {
  return (
    
      <div className="relative flex items-center max-w-xs text-gray-500">
        <select className="text-sm outline-none rounded-lg h-9 px-3 pr-6 border border-gray-300 bg-white focus:border-slate-600 shadow-sm">
          <option >IND</option>
          <option>US</option>
          <option>ES</option>
          <option>MR</option>
        </select>
      </div>

  );
};

export default Input;
