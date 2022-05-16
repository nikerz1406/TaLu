const initalFilter = {
    type:0, // 0|1|2 == meat|vegetable|starch
    name:0, // 0|1 == des|asc
    date:0, // 0|1|2|3 == des full date| asc full date | des time | asc time
}
const filterReducer = (state = initalFilter,action)=>{
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

export default filterReducer;