import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Auth } from "@/src/app/containers";

import { AuthGuard } from "./auth.guard";
import { FullMidLayout } from "@/src/app/components/layouts/app/layout";
import { Button, Result } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Err404 = () => {
    const location = useLocation();

    return (
        <FullMidLayout>
            <Result
                status="warning"
                title={"Oops, Page not found"}
                subTitle={location.pathname}
                extra={
                    <Button href="/admin/dashboard" icon={<ArrowLeftOutlined />}>
                        Back to Dashboard
                    </Button>
                }
            />
        </FullMidLayout>
    );
};

export const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<Auth.Login />} />
            <Route path="/admin" element={<AuthGuard />}>
                <Route path="profile" element={<Auth.Profile />} />
                <Route path="dashboard" element={<Navigate to="/admin/dashboard/overview" />} />

                <Route path="*" element={<Err404 />} />
            </Route>

            <Route path="*" element={<Err404 />} />
        </Routes>
    );
};
