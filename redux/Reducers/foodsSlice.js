import { createSlice } from '@reduxjs/toolkit'
import { initData } from '../../utilities/test';
import filter from '../../utilities/filter';
// const initalState = initData(2);

export const foodsSlice = createSlice({
  name: 'foods',
  initialState: initData(5),
  reducers: {
    foodsReducers: (state,action) => {
      switch (action.payload.type) {
          case "RELOAD_FOODS":            
              return foods.reload(state,action.payload)
          case "REMOVE_FOOD":
            return foods.remove(state,action.payload.id);
          case "ADD_FOOD":
            
              return foods.add(state,action.payload.item);
          case "SORT_TYPE":
              return filter.type.event(state,action.payload.filterType);
          case "SORT_NAME":
              return filter.name.event(state,action.payload.filterName);
          case "SORT_DATE":
              return filter.date.event(state,action.payload.filterDate);
          default:
              return state;
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { foodsReducers } = foodsSlice.actions

export default foodsSlice.reducer

const foods = {
  add:null,
  reload:null,
  remove:null
}
foods.add = (state,item)=>{
   
  state.unshift(item);
  return state;
}
foods.reload = (state,data)=>{
  // when call api change [
      // ...state,
      // ...data
  // ]
  return [
      ...state,
      data
  ];
}
foods.remove = (data,id)=>{
  return data.filter(i=>{
      return i.id !== id;
    });
}