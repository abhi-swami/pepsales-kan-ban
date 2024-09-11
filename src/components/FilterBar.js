
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/action';

const FilterBar = () => {
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const handleFilterChange = (key, value) => {
    dispatch(setFilter(key, value));
  };

  return (
    <div className="bg-gray-200 p-4 flex space-x-4">
      <select 
        className="p-2 rounded"
        value={filters.priority || ''}
        onChange={(e) => handleFilterChange('priority', e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input 
        type="text" 
        placeholder="Search by title"
        className="p-2 rounded"
        value={filters.title || ''}
        onChange={(e) => handleFilterChange('title', e.target.value)}
      />
    </div>
  );
};

export default FilterBar;