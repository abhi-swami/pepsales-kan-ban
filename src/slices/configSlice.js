import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    allowedTransitions: {
      // Define your allowed transitions here
    },
  },
  reducers: {},
});

export default configSlice.reducer;
