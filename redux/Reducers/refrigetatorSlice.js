import { createSlice } from '@reduxjs/toolkit'

export const refrigetatorSlice = createSlice({
  name: 'refrigetator',
  initialState: ['No ID'],
  reducers: {
    refrigetatorEvent: (state,action) => {
      switch (action.type) {
        case "ADD_REFRIGETATOR":
            return action.value;
        case "LOADING_REFRIGETATOR":
            return 'loading...';
        default:
            return state;
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { refrigetatorEvent } = refrigetatorSlice.actions

export default refrigetatorSlice.reducer
