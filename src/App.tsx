import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./redux/store";
import { AppRoute } from "@/src/app/routes";
import { ConfigProvider } from "antd";

const store = configureStore();

const App = () => {
    return (
        <ConfigProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRoute />
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    );
};

export default App;
