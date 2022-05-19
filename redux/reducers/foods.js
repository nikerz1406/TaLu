import filter from '../../utilities/filter';
// import { initData } from '../../utilities/test';
// const initalState = initData(2);
const initalState = [];
const foodsReducer = (state = initalState,action)=>{
    switch (action.type) {
        case "RELOAD_FOODS":            
            return foods.reload(state,action.payload)
        case "REMOVE_FOOD":
           return foods.remove(state,action.id);
        case "ADD_FOOD":
            return foods.add(state,action.item);
        case "SORT_TYPE":
            return filter.type.event(state,action.filterType);
        case "SORT_NAME":
            return filter.name.event(state,action.filterName);
        case "SORT_DATE":
            return filter.date.event(state,action.filterDate);
        default:
            return state;
    }
}

const foods = {
    add:null,
    reload:null,
    remove:null
}
foods.add = (state,item)=>{
    if(state.item == undefined){
        state.item = [item];
        return state;
    }
        
    state.unshift(item);
    return state;
}
foods.reload = (state,data)=>{
    // when call api change [
        // ...state,
        // ...data
    // ]
    return [
        ...state,
        data
    ];
}
foods.remove = (data,id)=>{
    return data.filter(i=>{
        return i.id !== id;
      });
}

export default foodsReducer;
