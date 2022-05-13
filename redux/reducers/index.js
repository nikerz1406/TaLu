import { combineReducers } from "redux";
import refrigetatorReducer from "./refrigetator";
import { foodsReducer,filterReducer } from "./foods";
const rootReducer = combineReducers({
    foods : foodsReducer,
    refrigetator : refrigetatorReducer,
    filterFoods:filterReducer,
})
export default rootReducer;