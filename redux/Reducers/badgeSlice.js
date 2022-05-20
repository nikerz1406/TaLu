import { createSlice } from '@reduxjs/toolkit'

export const badgeSlice = createSlice({
  name: 'badge',
  initialState: {
    'foods':null,
    'remove':null,
    'add':null,
    'qr':null,
    'refrigerator':null
  },
  reducers: {
    badgeEvent: (state,action) => {
      switch (action.type) {
        case 'BADGE':
            return badge[action.module][action.command](state);
        default:
            // console.log("dont have "+action.type+" action in Badge case or type");
            return state;
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { badgeEvent } = badgeSlice.actions

export default badgeSlice.reducer

const badge = {
  'FOODS':{
      'add':null,
      'remove':null
  },
  'RECYCLE':{
      'add':null,
      'remove':null
  },
  'PLUS':{
      'add':null,
      'remove':null
  },
  'QR':{
      'add':null,
      'remove':null
  },
  'REFRIGETATOR':{
      'add':null,
      'remove':null
  }
}
badge.RECYCLE.add = function(state){

  state.remove = state.remove != null ? state.remove+1 : 1;
  return state;
}
badge.RECYCLE.remove = function(state){
  state.remove = null;
  return state;
}
badge.FOODS.add = function(state){
  
  state.foods = state.foods != null ? state.foods+1 : 1;
  console.log({state})
  return state;
}
badge.FOODS.remove = function(state){
  state.foods = null;
  return state;
}