


const initalState = {}
const tableReducer = (state = initalState,action)=>{
    switch (action.type) {
        case "GET_DATA":
            return [
                ...state,
                ...action.payload
            ];
        default:
            return state;

    }
}
export default tableReducer;