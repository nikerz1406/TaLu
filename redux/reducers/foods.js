import filter from '../../utilities/filter';
function initData(number){
    
    var result = []
    for(var i=0;i<number;i++){
        var id = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2); 
        var value = Math.floor(Math.random() * 60*60*24*365);
        var today  = new Date(value);
        var type = Math.floor(Math.random() * 3);
        var item = {
        id,date:today.toLocaleDateString(),time:today.toLocaleTimeString(),type,
        name:id,
        }
        result.push(item);
    }
    return result;
}
const initalState = initData(2);
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
    state.push(item);
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
