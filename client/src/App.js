import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory } from './features/inventory/inventorySlice';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import FilterPanel from './components/Filter/FilterPanel';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.filters);
  
  useEffect(() => {
    dispatch(fetchInventory(filters));
  }, [dispatch, filters]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Dashboard />
        <FilterPanel />
      </main>
    </div>
  );
}

export default App;