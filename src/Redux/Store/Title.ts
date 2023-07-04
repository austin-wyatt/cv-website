import { TitleState, Action } from "../../types";

const initialState: TitleState = {
    title: "default title"    
};

export const SET_TITLE = "SET_TITLE";

const titleState = (state = initialState, action: Action) => 
{
    switch(action.type)
    {
        case SET_TITLE: {
            return {
                ...state,
                title: action.payload
            };         
        }
        default:
            return state;
    }
}

export default titleState;