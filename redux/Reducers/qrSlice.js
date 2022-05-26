import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: 'No ID',
  registed: false,
  base64:null
}

export const qrSlice = createSlice({
  name: 'qr',
  initialState: initialState,
  reducers: {
    qrReducers: (state,action) => {
      switch (action.payload.type) {
        case "ADD_QR":        
            return { 
              value: action.payload.value,
              registed:true,
            };
        case "LOADING_QR":
            
            return {
              value:'loading...',
              registed:false,
            };
        default:
            return state;
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { qrReducers } = qrSlice.actions

export default qrSlice.reducer
