const initalState = {
    remove:null,
}
const navigatorReducer = (state = initalState,action)=>{
    switch (action.type) {
        case "ADD_NAVIGARTOR_REMOVE":
            return action.value;
        case "LOADING_REFRIGETATOR":
            return 'loading...';
        default:
            return state;

    }
}
export default navigatorReducer;