import { combineReducers } from "redux";
import { MOVE_BLOCK, UPDATE_BLOCK_DATA, SET_FILTER } from "./action";
import { initialBlocksState } from "../data/data";


const blocksReducer = (state = initialBlocksState, action) => {
  console.log("blocksReducer called with action:", action);
  switch (action.type) {
    case MOVE_BLOCK:
      console.log("MOVE_BLOCK action received in reducer");
      const updatedState = state.map((block) => {
        if (block.id === action.payload.blockId) {
          console.log("Updating block:", block.id);
          return {
            ...block,
            stage: action.payload.toStage,
            transitions: [
              ...block.transitions,
              {
                from: block.stage,
                to: action.payload.toStage,
                date: new Date().toLocaleString(),
              },
            ],
            updatedAt: new Date().toLocaleString(),
          };
        }
        return block;
      });

      console.log("Updated state:", updatedState);
      return updatedState;

    case UPDATE_BLOCK_DATA:
      const updateData = state.map((block) => {
        console.log("UPDATE_BLOCK_DATA",block)
        if (block.id === action.payload.blockId) {
          return {
            ...block,
            ...action.payload.data,
            updatedAt: new Date().toLocaleString(),
          };
        }
        return block;
      });
      console.log("Updated data:", updateData);
      return updateData;
    default:
      return state;
  }
};

const initialFiltersState = {
  priority: "",
  title: "",
};

const filtersReducer = (state = initialFiltersState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  blocks: blocksReducer,
  filters: filtersReducer,
});

export default rootReducer;
