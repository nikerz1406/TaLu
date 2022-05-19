import filter from '../../utilities/filter';
// import { initData } from '../../utilities/test';

const initalState = [];
const recycleReducer = (state = initalState,action)=>{

    switch (action.type) {
        case 'UNDO_RECYCLE':
            return recycle.undo(state,action); 
        case 'ADD_RECYCLE':
            return recycle.add(state,action.item); 
        case 'CLEAR_RECYCLE':
            return recycle.clear(); 
        case "SORT_RECYCLE_TYPE":
            return filter.type.event(state,action.filterType);
        case "SORT_RECYCLE_NAME":
            return filter.name.event(state,action.filterName);
        case "SORT_RECYCLE_DATE":
            return filter.date.event(state,action.filterDate);
        default:
            return state;
    }
}

const recycle = {
    undo:null,
    add:null,
}
recycle.undo = (data,action) =>{
    return data.filter(i=>{
        return i.id !== action.id;
      });
}
recycle.add = (data,item) =>{
    data.unshift(item);
    return data;
}
recycle.clear = () =>{
    return [];
}
export default recycleReducer;

