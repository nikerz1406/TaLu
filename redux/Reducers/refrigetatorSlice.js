import { createSlice } from '@reduxjs/toolkit'

export const refrigetatorSlice = createSlice({
  name: 'refrigetator',
  initialState: ['No ID'],
  reducers: {
    refrigetatorReducers: (state,action) => {
      switch (action.payload.type) {
        case "ADD_REFRIGETATOR":
            return action.payload.value;
        case "LOADING_REFRIGETATOR":
            return 'loading...';
        default:
            return state;
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { refrigetatorReducers } = refrigetatorSlice.actions

export default refrigetatorSlice.reducer
