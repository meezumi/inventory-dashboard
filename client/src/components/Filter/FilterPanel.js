import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setMakeFilter, 
  setDurationFilter, 
  clearAllFilters
} from '../../features/filters/filtersSlice';
import { MAKES, FILTER_DURATIONS } from '../../utils/constants';
import './FilterPanel.css';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.filters);
  
  // Create local state to store temporary filter selections
  const [tempFilters, setTempFilters] = useState({
    make: [...filters.make],
    duration: filters.duration
  });
  
  // Update local state when Redux state changes
  useEffect(() => {
    setTempFilters({
      make: [...filters.make],
      duration: filters.duration
    });
  }, [filters]);
  
  const handleMakeChange = (make) => {
    const currentMakes = [...tempFilters.make];
    const index = currentMakes.indexOf(make);
    
    if (index > -1) {
      currentMakes.splice(index, 1);
    } else {
      currentMakes.push(make);
    }
    
    setTempFilters({
      ...tempFilters,
      make: currentMakes
    });
  };
  
  const handleDurationChange = (duration) => {
    const newDuration = tempFilters.duration === duration ? null : duration;
    setTempFilters({
      ...tempFilters,
      duration: newDuration
    });
  };
  
  const handleApplyFilters = () => {
    // Dispatch actions to update Redux state with temporary filter values
    dispatch(setMakeFilter(tempFilters.make));
    dispatch(setDurationFilter(tempFilters.duration));
  };
  
  const handleClearFilters = () => {
    dispatch(clearAllFilters());
  };
  
  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filter Data By</h3>
      </div>
      
      <div className="filter-section">
        <h4 className="filter-title">MAKE</h4>
        {MAKES.map(make => (
          <div key={make.id} className="filter-option">
            <input
              type="checkbox"
              id={`make-${make.id}`}
              checked={tempFilters.make.includes(make.id)}
              onChange={() => handleMakeChange(make.id)}
            />
            <label htmlFor={`make-${make.id}`}>{make.label}</label>
          </div>
        ))}
      </div>
      
      <div className="filter-section">
        <h4 className="filter-title">DURATION</h4>
        {FILTER_DURATIONS.map(duration => (
          <div key={duration.id} className="filter-option">
            <input
              type="checkbox"
              id={`duration-${duration.id}`}
              checked={tempFilters.duration === duration.id}
              onChange={() => handleDurationChange(duration.id)}
            />
            <label htmlFor={`duration-${duration.id}`}>{duration.label}</label>
          </div>
        ))}
      </div>
      
      <div className="filter-actions">
        <button 
          className="apply-btn"
          onClick={handleApplyFilters}
        >
          APPLY FILTER
        </button>
        <button 
          className="clear-btn"
          onClick={handleClearFilters}
        >
          REMOVE ALL FILTERS
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;