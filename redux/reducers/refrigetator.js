const initalState = ['No ID']
const refrigetatorReducer = (state = initalState,action)=>{
    switch (action.type) {
        case "ADD_DATA":
            return action.value;
        default:
            return state;

    }
}
export default refrigetatorReducer;