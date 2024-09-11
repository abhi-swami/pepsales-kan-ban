import { createSlice } from '@reduxjs/toolkit';

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: [],
  reducers: {
    addBlock: (state, action) => {
      state.push(action.payload);
    },
    updateBlock: (state, action) => {
      const { id, updates } = action.payload;
      const block = state.find(block => block.id === id);
      if (block) {
        Object.assign(block, updates);
        if (!block.history) {
          block.history = [];
        }
        if (updates.stage && block.stage !== updates.stage) {
          block.history.push({
            from: block.stage,
            to: updates.stage,
            timestamp: new Date().toLocaleString()
          });
        }
        block.stage = updates.stage || block.stage;
      }
    },
    setInitialData: (state, action) => {
      return action.payload.map(block => ({
        ...block,
        history: block.history || []
      }));
    }
  },
});

export const { addBlock, updateBlock, setInitialData } = blocksSlice.actions;
export default blocksSlice.reducer;