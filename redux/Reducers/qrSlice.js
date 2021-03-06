import { createSlice } from '@reduxjs/toolkit'

// test case
const initialState = {
  value: '738ffbf75758d94c',
  registed: true,
  scanning:false,
  base64:null,
  old:'738ffbf75758d94c'
}

// // product case 
// const initialState = {
//   value: 'No ID',
//   registed: false,
//   scanning:false,
//   base64:null,
//   old:null
// }

export const qrSlice = createSlice({
  name: 'qr',
  initialState: initialState,
  reducers: {
    qrReducers: (state,action) => {
      switch (action.payload.type) {
        case "ADD_QR":  
          var value = action.payload.value.slice(0, 32);     
          return { 
            value,
            registed: true,
            scanning:false,
            base64:state.base64,
            old:action.payload.value
          };
        case "WAITTING_QR":
          return {
            value:'waitting...',
            registed: state.registed,
            scanning:true,
            base64:state.base64,
            old:state.old
          }
        case "OUT_SCREEN":
          return {
            value:state.old,
            registed: state.registed,
            scanning:false,
            base64:state.base64,
            old:state.old
          }
        default:
          return state;
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { qrReducers } = qrSlice.actions

export default qrSlice.reducer

const qr = {
  add_qr:null,
  loading_qr:null,
  
}