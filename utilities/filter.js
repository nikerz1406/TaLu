const filter = {
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
filter.date.event = (data,type) =>{
    switch (type) {
        case 0:
            console.log("filterDateDesc");
            return filter.date.switch.full.desc(data);
        case 1:
            console.log("filterDateAsc");
            return filter.date.switch.full.asc(data);
        case 2:
            console.log("filterTimeDesc");
            return filter.date.switch.short.desc(data);
        default:
            console.log("filterTimeAsc");
            return filter.date.switch.short.asc(data);
    }
}
filter.date.switch.full.desc = (data) =>{
    data = data.slice(0);

    return data.sort(function(a,b) {
        if (Date.parse(a.date +"T"+ a.time) < Date.parse(b.date +"T"+ b.time)) {
            return -1;
            }
        if (Date.parse(a.date +"T"+ a.time) > Date.parse(b.date +"T"+ b.time)) {
            return 1;
        }
        return 0;
    });
    
}
filter.date.switch.full.asc = (data) =>{
    data = data.slice(0);
    return data.sort(function(a,b) {
        if (Date.parse(a.date +"T"+ a.time) > Date.parse(b.date +"T"+ b.time)) {
            return -1;
            }
        if (Date.parse(a.date +"T"+ a.time) < Date.parse(b.date +"T"+ b.time)) {
            return 1;
        }
        return 0;
    });
}
filter.date.switch.short.desc = (data) =>{
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
filter.date.switch.short.asc = (data) =>{
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
filter.type.event = (data,type) =>{
    switch (type) {
        case 0:
            // 0=> 1=>2
            console.log(0)
            return [
                ...filter.type.method.meat(data),
                ...filter.type.method.vegetable(data),
                ...filter.type.method.starch(data),
            ]
            case 1:
                // 1=>2=>0
                console.log(1)
                return [
                    ...filter.type.method.vegetable(data),
                    ...filter.type.method.starch(data),
                    ...filter.type.method.meat(data),
                ]
        default:
            // 2=>0=>1
            console.log(2)
            return [
                ...filter.type.method.starch(data),
                ...filter.type.method.meat(data),
                ...filter.type.method.vegetable(data),
            ]
           
    }
}
filter.type.method.meat = (data) => {
    return data.filter((i)=>{return i.type== 0})
}
filter.type.method.vegetable = (data) => {
    return data.filter((i)=>{return i.type== 1})
}
filter.type.method.starch = (data) => {
    return data.filter((i)=>{return i.type== 2})
}
filter.name.event = (data,name)=>{

    switch (name) {
        case false:
            return filter.name.switch.desc(data);
        default:
            return filter.name.switch.asc(data);
    }
    
}
filter.name.switch.desc = (data) =>{
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
filter.name.switch.asc = (data) =>{
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

export default filter;