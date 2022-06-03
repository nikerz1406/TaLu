import { configureStore } from '@reduxjs/toolkit';
import badgeReducers from './Reducers/badgeSlice';
import filterReducers from './Reducers/filtersSlice';
import foodsReducers from './Reducers/foodsSlice';
import qrReducers from './Reducers/qrSlice';
import refrigetatorReducers from './Reducers/refrigetatorSlice';

export default configureStore({
  reducer: {
    foods : foodsReducers,
    qr : qrReducers,
    filterFoods:filterReducers,
    badge:badgeReducers,
    refrigetator:refrigetatorReducers
  }
})