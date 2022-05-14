

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
            return filterFoods.type.event(state,action.filterType);
        case "SORT_NAME":
            return filterFoods.name.event(state,action.filterName);
        case "SORT_DATE":
            return filterFoods.date.event(state,action.filterDate);
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
            // state.date = state.date == 3 ? 0 : state.date+1;
            state.date = state.date == 1 ? 0 : state.date+1;
            return state;
        default:
            return state;

    }
}

const filterFoods = {
    type:{
        event:null,
        method:{
            meat:null,
            vegetable:null,
            starch:null,
        }
    },
    date:{
        event:null,
        switch:{
            full:{
                desc:null,
                asc:null
            },
            short:{
                desc:null,
                asc:null
            }
        }
    },
    name:{
        event:null,
        switch:{
            desc:null,
            asc:null
        }
    }
};
filterFoods.date.event = (data,type) =>{
    switch (type) {
        case 0:
            console.log("filterDateDesc");
            return filterFoods.date.switch.full.desc(data);
        case 1:
            console.log("filterDateAsc");
            return filterFoods.date.switch.full.asc(data);
        case 2:
            console.log("filterTimeDesc");
            return filterFoods.date.switch.short.desc(data);
        default:
            console.log("filterTimeAsc");
            return filterFoods.date.switch.short.asc(data);
    }
}
filterFoods.date.switch.full.desc = (data) =>{
    data = data.slice(0);
    return data.sort(function(a,b) {
        if (Date.parse(a.date +" "+ a.time) < Date.parse(b.date +" "+ b.time)) {
            return -1;
            }
        if (Date.parse(a.date +" "+ a.time) > Date.parse(b.date +" "+ b.time)) {
            return 1;
        }
        return 0;
    });
    
}
filterFoods.date.switch.full.asc = (data) =>{
    data = data.slice(0);
    return data.sort(function(a,b) {
        if (Date.parse(a.date +" "+ a.time) > Date.parse(b.date +" "+ b.time)) {
            return -1;
            }
        if (Date.parse(a.date +" "+ a.time) < Date.parse(b.date +" "+ b.time)) {
            return 1;
        }
        return 0;
    });
}
filterFoods.date.switch.short.desc = (data) =>{
    const now = Date.now();
    data = data.slice(0);
    data.forEach((element,k) => {
        data[k].sort_time = now - Date.parse(element.date +" "+ element.time);
    });
    return data.sort(function(a,b) {
        if (a.sort_time > b.sort_time) {
            return -1;
            }
        if(a.sort_time < b.sort_time){
            return 1;
        }
        return 0;
    });
}
filterFoods.date.switch.short.asc = (data) =>{
    const now = Date.now();
    data = data.slice(0);
    data.forEach((element,k) => {
        data[k].sort_time = now - Date.parse(element.date +" "+ element.time);
        data[k].sort_time_txt = timeValueToString(data[k].sort_time)
    });
    return data.sort(function(a,b) {
        if (a.sort_time < b.sort_time) {
            return -1;
            }
        if(a.sort_time > b.sort_time){
            return 1;
        }
        return 0;
    });
}
filterFoods.type.event = (data,type) =>{
    switch (type) {
        case 0:
            // 0=> 1=>2
            return [
                ...filterFoods.type.method.meat(data),
                ...filterFoods.type.method.vegetable(data),
                ...filterFoods.type.method.starch(data),
            ]
            case 1:
                // 1=>2=>0
                return [
                    ...filterFoods.type.method.vegetable(data),
                    ...filterFoods.type.method.starch(data),
                    ...filterFoods.type.method.meat(data),
                ]
        default:
            // 2=>0=>1
            return [
                ...filterFoods.type.method.starch(data),
                ...filterFoods.type.method.meat(data),
                ...filterFoods.type.method.vegetable(data),
            ]
           
    }
}
filterFoods.type.method.meat = (data) => {
    return data.filter((i)=>{return i.type== 0})
}
filterFoods.type.method.vegetable = (data) => {
    return data.filter((i)=>{return i.type== 1})
}
filterFoods.type.method.starch = (data) => {
    return data.filter((i)=>{return i.type== 2})
}
filterFoods.name.event = (data,name)=>{

    switch (name) {
        case false:
            return filterFoods.name.switch.desc(data);
        default:
            return filterFoods.name.switch.asc(data);
    }
    
}
filterFoods.name.switch.desc = (data) =>{
    data = data.slice(0);
    return data.sort(function(a,b) {
        if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
    });
}
filterFoods.name.switch.asc = (data) =>{
    data = data.slice(0);
    return data.sort(function(a,b) {
        if (a.name > b.name) {
            return -1;
            }
            if (a.name < b.name) {
            return 1;
            }
            return 0;
    });
}

function timeValueToString(value){
    var t = new Date(value);
    var m = t.getMonth();
    var d = t.getMonth();
    var h = t.getMonth();
    var mi = t.getMonth();

    if(m==0 && d == 0 && h == 0 && mi == 0){
        return `${mi} mins`;
    }
    if(m==0 && d == 0 && h == 0 && mi != 0){
        return `${mi} mins`;
    }

    if(m==0 && d == 0 && h != 0 && mi == 0){
        return `${h} hours ${mi} mins`;
    }
    if(m==0 && d == 0 && h != 0 && mi != 0){
        return `${h} hours ${mi} mins`;
    }
    
    if(m==0 && d != 0 && h == 0 && mi == 0){
        return `${d} days, ${h} hours ${mi} mins`;
    }
    
    if(m==0 && d != 0 && h != 0 && mi == 0){
        return `${d} days, ${h} hours ${mi} mins`;
    }
    
    if(m==0 && d != 0 && h == 0 && mi != 0){
        return `${d} days, ${h} hours ${mi} mins`;
    }

    if(m==0 && d != 0 && h != 0 && mi != 0){
        return `${d} days, ${h} hours ${mi} mins`;
    }

    if(m!=0 && d == 0 && h == 0 && mi == 0){
        return `${m} month ${d} days, ${h} hours ${mi} mins`;
    }
    if(m!=0 && d != 0 && h == 0 && mi == 0){
        return `${m} month ${d} days, ${h} hours ${mi} mins`;
    }
    if(m!=0 && d == 0 && h != 0 && mi == 0){
        return `${m} month ${d} days, ${h} hours ${mi} mins`;
    }
    if(m!=0 && d != 0 && h != 0 && mi == 0){
        return `${m} month ${d} days, ${h} hours ${mi} mins`;
    }
    if(m!=0 && d == 0 && h == 0 && mi != 0){
        return `${m} month ${d} days, ${h} hours ${mi} mins`;
    }
    if(m!=0 && d != 0 && h == 0 && mi != 0){
        return `${m} month ${d} days, ${h} hours ${mi} mins`;
    }
    if(m!=0 && d == 0 && h != 0 && mi != 0){
        return `${m} month ${d} days, ${h} hours ${mi} mins`;
    }
    if(m!=0 && d != 0 && h != 0 && mi != 0){
        return `${m} month ${d} days, ${h} hours ${mi} mins`;
    }
    
}