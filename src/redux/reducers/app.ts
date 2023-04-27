import { REDUX_ACTIONS } from "@/src/app/constants";

const INIT_STATE = {
    user: undefined,
};

export const AppReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case REDUX_ACTIONS.SET_USER: {
            return { ...state, user: action.payload };
        }
        default:
            return state;
    }
};
