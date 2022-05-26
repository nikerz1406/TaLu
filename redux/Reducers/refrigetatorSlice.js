import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient  from '../../utilities/initToken';

export const refrigetatorSlice = createSlice({
  name: 'refrigetator',
  initialState: {
    token:null,
    base64:null,
  },
  reducers: {
    refrigetatorReducers: (state,action) => {
      switch (action.payload.type) {
        case "SAVE":   
            return refrigetator.SAVE(state,action.payload.value);
        default:
            return state;
      }
    }
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(getToken.fulfilled, (state, { payload }) => {
      // upload status
      
      if(payload.token){
        return refrigetator.ADD(state,payload.token);
      }
      return state;

    })
    .addCase(getToken.pending, (state, action) => {
      console.log("pending")
    })
    .addCase(getToken.rejected, (state, action) => {
      
      console.log("error")
    })
  }
})

// Action creators are generated for each case reducer function
export const { refrigetatorReducers } = refrigetatorSlice.actions

export default refrigetatorSlice.reducer

const refrigetator = {
  'ADD':null,
  'SAVE':null,
  'CLEAN':null
}
refrigetator.ADD = function(state,value){
  state.token = value;
  return state;
}
refrigetator.SAVE = function(state,value){
  state.base64 = value;
  return state;
}

export const getToken = createAsyncThunk(
  'refrigetator/getToken',
  async (thunkAPI) => {
    const response = await axiosClient.get("BabyName/initToken");
    return response
  }
)
