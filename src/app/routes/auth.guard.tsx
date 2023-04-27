import { Outlet, useNavigate } from "react-router-dom";
import { api, ui } from "@/src/app/services";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { REDUX_ACTIONS } from "@/src/redux";
import { AppLayout } from "@/src/app/components/layouts";
import { Result } from "antd";
import { useAppStore } from "@/src/app/store";

export const AuthGuard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useAppStore();

    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (api.auth.token.exists()) {
            api.auth
                .profile()
                .then((rs) => {
                    dispatch({ type: REDUX_ACTIONS.SET_USER, payload: rs });
                    setReady(true);
                })
                .catch((err) => {
                    if (err.statusCode === 401) {
                        ui.notify.warn("Login require.");
                        navigate("/auth/login", { replace: true });
                    } else {
                        setError(err.message);
                    }
                });
        } else {
            ui.notify.warn("Login require.");
            navigate("/auth/login", { replace: true });
        }
    }, []);

    return (
        <AppLayout>
            {ready && user && <Outlet />}
            {error && <Result status="error" title="Error" subTitle={error} />}
        </AppLayout>
    );
};
