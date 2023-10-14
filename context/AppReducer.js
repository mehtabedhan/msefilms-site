
export const initialState={
    user:null,
    
}


export const actionType={
    init_stored:'init_stored',
    SET_USER:'SET_USER',

}

export const AppReducer=(state,action)=>{

switch(action.type){
    case actionType.init_stored:
        return action.value;
        
        case actionType.SET_USER:
            return {
                ...state,
                user:action.user,
            };
          default:
            return state;
    }
}

