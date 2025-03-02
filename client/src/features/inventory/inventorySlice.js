import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInventoryData } from '../../services/api';

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await getInventoryData(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  recentData: {},
  totalCounts: {
    NEW: 0,
    USED: 0,
    CPO: 0,
    total: 0
  },
  averageMSRP: {
    NEW: 0,
    USED: 0,
    CPO: 0
  },
  historyLog: [],
  status: 'idle',
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        
        // Calculate recent data metrics
        const sortedData = [...action.payload].sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        
        // Most recent date from data
        const mostRecentDate = sortedData.length > 0 ? sortedData[0].date : '';
        
        // Filter data by type
        const newVehicles = action.payload.filter(item => item.type === 'NEW');
        const usedVehicles = action.payload.filter(item => item.type === 'USED');
        const cpoVehicles = action.payload.filter(item => item.type === 'CPO');
        
        // Calculate total counts
        state.totalCounts = {
          NEW: newVehicles.length,
          USED: usedVehicles.length,
          CPO: cpoVehicles.length,
          total: action.payload.length
        };
        
        // Calculate average MSRP for each type
        state.averageMSRP = {
          NEW: newVehicles.length > 0 
            ? newVehicles.reduce((sum, item) => sum + parseFloat(item.msrp), 0) / newVehicles.length 
            : 0,
          USED: usedVehicles.length > 0 
            ? usedVehicles.reduce((sum, item) => sum + parseFloat(item.msrp), 0) / usedVehicles.length 
            : 0,
          CPO: cpoVehicles.length > 0 
            ? cpoVehicles.reduce((sum, item) => sum + parseFloat(item.msrp), 0) / cpoVehicles.length 
            : 0
        };
        
        // Generate history log entries by date
        const dateMap = {};
        
        action.payload.forEach(item => {
          const date = item.date.substring(0, 10); 
          
          if (!dateMap[date]) {
            dateMap[date] = {
              date,
              NEW: { count: 0, totalMSRP: 0 },
              USED: { count: 0, totalMSRP: 0 },
              CPO: { count: 0, totalMSRP: 0 }
            };
          }
          
          dateMap[date][item.type].count += 1;
          dateMap[date][item.type].totalMSRP += parseFloat(item.msrp);
        });
        
        // Convert to array and sort by date
        state.historyLog = Object.values(dateMap)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(entry => ({
            ...entry,
            NEW: {
              ...entry.NEW,
              avgMSRP: entry.NEW.count > 0 ? entry.NEW.totalMSRP / entry.NEW.count : 0
            },
            USED: {
              ...entry.USED,
              avgMSRP: entry.USED.count > 0 ? entry.USED.totalMSRP / entry.USED.count : 0
            },
            CPO: {
              ...entry.CPO,
              avgMSRP: entry.CPO.count > 0 ? entry.CPO.totalMSRP / entry.CPO.count : 0
            }
          }));
          
        // Recent gathered data
        state.recentData = {
          date: mostRecentDate,
          totalItems: state.totalCounts.total,
          newTotal: newVehicles.reduce((sum, item) => sum + parseFloat(item.msrp), 0),
          usedTotal: usedVehicles.reduce((sum, item) => sum + parseFloat(item.msrp), 0),
          cpoTotal: cpoVehicles.reduce((sum, item) => sum + parseFloat(item.msrp), 0),
          newItems: state.totalCounts.NEW,
          usedItems: state.totalCounts.USED,
          cpoItems: state.totalCounts.CPO
        };
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default inventorySlice.reducer;