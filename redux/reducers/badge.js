const initalState = {
    'foods':null,
    'remove':null,
    'add':null,
    'qr':null,
    'refrigerator':null
};
const badgeReducer = (state = initalState,action)=>{

    switch (action.type) {
        case 'BADGE':
            return badge[action.module][action.command](state);
        default:
            // console.log("dont have "+action.type+" action in Badge case or type");
            return state;
    }
    
}
const badge = {
    'FOODS':{
        'add':null,
        'remove':null
    },
    'RECYCLE':{
        'add':null,
        'remove':null
    },
    'PLUS':{
        'add':null,
        'remove':null
    },
    'QR':{
        'add':null,
        'remove':null
    },
    'REFRIGETATOR':{
        'add':null,
        'remove':null
    }
}
badge.RECYCLE.add = function(state){

    state.remove = state.remove ? state.remove+1 : 1;
    return state;
}
badge.RECYCLE.remove = function(state){
    state.remove = null;
    return state;
}
export default badgeReducer;