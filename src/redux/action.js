
export const MOVE_BLOCK = 'MOVE_BLOCK';
export const UPDATE_BLOCK_DATA = 'UPDATE_BLOCK_DATA';
export const SET_FILTER = 'SET_FILTER';

export const moveBlock = (blockId, toStage) => {
  // console.log('moveBlock action dispatched:', { blockId, toStage });
  return {
    type: MOVE_BLOCK,
    payload: { blockId, toStage }
  };
};

export const updateBlockData = (blockId, data) => {
  // console.log('updateBlockData action dispatched:', { blockId, data });
  return {
    type: UPDATE_BLOCK_DATA,
    payload: { blockId, data }
  };
};

export const setFilter = (key, value) => ({
  type: SET_FILTER,
  payload: { key, value }
});
