import { combineReducers } from "redux";
import refrigetatorReducer from "./refrigetator";
import badgeReducer from "./badge";
import recycleReducer from "./recycle";
import foodsReducer  from "./foods";
import filterReducer from "./filters";
const rootReducer = combineReducers({
    foods : foodsReducer,
    refrigetator : refrigetatorReducer,
    filterFoods:filterReducer,
    badge:badgeReducer,
    history:recycleReducer
})
export default rootReducer;