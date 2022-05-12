import { combineReducers } from "redux";
import refrigetatorReducer from "./refrigetator";
import tableReducer from "./table";
const rootReducer = combineReducers({
    table : tableReducer,
    refrigetator : refrigetatorReducer
})
export default rootReducer;