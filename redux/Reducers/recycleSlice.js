import { createSlice } from '@reduxjs/toolkit';
import filter from '../../utilities/filter';

export const recycleSlice = createSlice({
  name: 'recycle',
  initialState: [],
  reducers: {
    recycleReducers: (state,action) => {
      switch (action.payload.type) {
          case 'UNDO_RECYCLE':
              return recycle.undo(state,action.payload); 
          case 'ADD_RECYCLE':
              return recycle.add(state,action.payload.item); 
          case 'CLEAR_RECYCLE':
              return recycle.clear(); 
          case "SORT_RECYCLE_TYPE":
              return filter.type.event(state,action.payload.filterType);
          case "SORT_RECYCLE_NAME":
              return filter.name.event(state,action.payload.filterName);
          case "SORT_RECYCLE_DATE":
              return filter.date.event(state,action.payload.filterDate);
          default:
              return state;
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { recycleReducers } = recycleSlice.actions

export default recycleSlice.reducer

const recycle = {
  undo:null,
  add:null,
}
recycle.undo = (data,action) =>{
  return data.filter(i=>{
      return i.id !== action.id;
    });
}
recycle.add = (data,item) =>{
  data.unshift(item);
  return data;
}
recycle.clear = () =>{
  return [];
}