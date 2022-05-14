const initalState = ['No ID']
const refrigetatorReducer = (state = initalState,action)=>{
    switch (action.type) {
        case "ADD_REFRIGETATOR":
            return action.value;
        case "LOADING_REFRIGETATOR":
            return 'loading...';
        default:
            return state;

    }
}
export default refrigetatorReducer;