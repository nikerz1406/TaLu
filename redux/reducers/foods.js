

function initData(number){
    
    var result = []
    for(var i=0;i<number;i++){
        var id = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2); 
        var value = Math.floor(Math.random() * 60*60*24*365);
        var today  = new Date(value);
        var type = Math.floor(Math.random() * 3);
        var item = {
        id,date:today.toLocaleDateString(),time:today.toLocaleTimeString(),type,
        name:id
        }
        result.push(item);
    }
    return result;
}
const initalState = initData(10);
export const foodsReducer = (state = initalState,action)=>{
    switch (action.type) {
        case "GET_FOODS":
            return [
                ...state,
                action.payload
            ];
        case "REMOVE_FOOD":
            return state.filter(i=>{
                return i.id !== action.id;
              });
        case "SORT_TYPE":
            return filterType(state,action.filterType);
        case "SORT_NAME":
            return filterName(state,action.filterName);
        default:
            return state;

    }
}

const initalFilter = {
    type:0, // 0|1|2 == meat|vegetable|starch
    name:0, // 0|1 == des|asc
    date:0, // 0|1|2|3 == des full date| asc full date | des time | asc time
}
export const filterReducer = (state = initalFilter,action)=>{
    switch (action.type) {
        case "FILTER_TYPE":
            state.type = state.type == 2 ?  0  : state.type + 1;
            return state;
        case "FILTER_NAME":
            state.name = !state.name;
            return state;
        case "FILTER_DATE":
            state.date = state.date == 3 ? 0 : state.date+1;
            return state;
        default:
            return state;

    }
}

const filterType = (data,type)=>{

    var result = data.filter((i)=>{return i.type==type})
    type = type == 2 ? 0 : type + 1;
    var result2 = data.filter((i)=>{return i.type==type})
    type = type == 2 ? 0 : type + 1;
    var result3 = data.filter((i)=>{return i.type==type})

    return [
        ...result,
        ...result2,
        ...result3
    ];
}

const filterName = (data,name)=>{
    var byName = data.slice(0);
    if(name){
        return byName.sort(function(a,b) {
            if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
        });
    }

    return byName.sort(function(a,b) {
        if (a.name > b.name) {
            return -1;
            }
            if (a.name < b.name) {
            return 1;
            }
            return 0;
    });
    
}