import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
// import { initData } from '../../utilities/test';
import filter from '../../utilities/filter';
import axiosClient from '../../utilities/axiosClient';
import axios from 'axios';

// const initalState = initData(2);
const initialState = {
  data:[],
  status:'idle',
  error:null,
  page:0,
}

// status: 'idle' | 'pending' | 'succeeded' | 'failed'

export const foodsSlice = createSlice({
  name: 'foods',
  initialState: initialState,
  reducers: {
    foodsReducers: (state,action) => {
      switch (action.payload.type) {
          case "RELOAD_FOODS":            
              return foods.reload(state,action.payload)
          case "REMOVE_FOOD":
            return foods.remove(state,action.payload.code);
          case "ADD_FOOD":            
              return foods.add(state,action.payload.item);
          case "UNDO_FOOD":
            return foods.undo(state,action.payload.item);
          case "SORT_TYPE":
              state.data =  filter.type.event(state.data,action.payload.filterType);
              break;
          case "SORT_NAME":
              state.data =  filter.name.event(state.data,action.payload.filterName);
              break;
          case "SORT_DATE":
              state.data = filter.date.event(state.data,action.payload.filterDate);
              break;
          default:
              return state;
      }
      return state;
    }
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(getFoods.fulfilled, (state, { payload }) => {
      // upload status
      return foods.reload(state,payload.foods);

    })
    .addCase(getFoods.pending, (state, action) => {
      console.log("pending")
    })
    .addCase(getFoods.rejected, (state, action) => {
      
      console.log("error")
    })

    builder.addCase(addFoods.fulfilled, (state, { payload }) => {
      
      return foods.add(state,payload);

    })
    .addCase(addFoods.pending, (state, action) => {
      console.log("pending")
    })
    .addCase(addFoods.rejected, (state, action) => {
      console.log("error")
    })

  },
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
  state.data.unshift(item);
  return state;
}
foods.undo = (state,item)=>{
  state.data.unshift(item);
  return state;
}
foods.reload = (state,data)=>{
  if(state.data.length == 0){
    state.data = data;
    return state;  
  }
  if(data.length ==0){
    state.page++;
  }
  var new_data = [
    ...state.data,...data
  ]
  state.data = new_data.filter((value, index, self) => 
  self.findIndex((m) => m.code === value.code) === index);
  return state;
}
foods.remove = (state,code)=>{
  state.data = state.data.filter(i=>{
      return i.code !== code;
    });
  return state;
}

export const getFoods = createAsyncThunk(
  'foods/getFoods',
  async (item = {page : 0,refrigera_id :null}, thunkAPI) => {

    const response = await axiosClient.get("refrigerator/" + item.page + "/" + item.refrigera_id);
    return response;
  }
)

export const addFoods = createAsyncThunk(
  'foods/addFoods',
  ({ type,name,refrigera_id }, thunkAPI) => {
    var formData = new FormData();
    formData.append('type',type);
    formData.append('name',name);
    formData.append('refrigera_id',refrigera_id);
    return axiosClient.post('refrigerator/', formData);

  }
)