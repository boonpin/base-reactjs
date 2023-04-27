import { useDispatch, useSelector } from "react-redux";
import { REDUX_ACTIONS } from "@/src/app/constants";

export const useAppStore = () => {
    const { app } = useSelector((state: any) => state);
    const { user } = app || {};
    return { user };
};

export const useAppDispatch = () => {
    const dispatch = useDispatch();
    const dispatcher = {
        user: {
            set: (user: any) => {
                dispatch({ type: REDUX_ACTIONS.SET_USER, payload: user });
            },
            unset: () => {
                dispatch({ type: REDUX_ACTIONS.SET_USER, payload: null });
            },
        },
    };

    return dispatcher;
};
