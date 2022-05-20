import { configureStore } from '@reduxjs/toolkit';
import badgeReducer from './Reducers/badgeSlice';
import filterReducer from './Reducers/filtersSlice';
import foodsReducer from './Reducers/foodsSlice';
import recycleReducer from './Reducers/recycleSlice';
import refrigetatorReducer from './Reducers/refrigetatorSlice';

export default configureStore({
  reducer: {
    foods : foodsReducer,
    refrigetator : refrigetatorReducer,
    filterFoods:filterReducer,
    badge:badgeReducer,
    history:recycleReducer
  }
})