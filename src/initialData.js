import { addBlock } from '../src/slices/blocksSlice';
import { sampleBlocks } from './sampleData';

// Function to initialize the Redux store with sample data
export const initializeStoreWithSampleData = (dispatch) => {
  sampleBlocks.forEach(block => {
    dispatch(addBlock(block));
  });
};
