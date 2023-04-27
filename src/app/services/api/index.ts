import axios from "axios";
import * as CONFIG from "@/src/config";
import { storage } from "@/src/app/services";
import { STORAGE_KEYS } from "@/src/app/constants";

import { Auth } from "./auth";
import { System } from "./system";

const http = axios.create({
    baseURL: CONFIG.API.HOST,
    timeout: CONFIG.API.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use(
    (config: any) => {
        if (!config.headers) {
            config.headers = {};
        }
        const token = storage.local.get.value(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);
http.interceptors.response.use(
    (response: any) => {
        // do nothing on response (direct response the data)
        return response ? response.data : null;
    },
    async (error: any) => {
        let res = error;
        if (error) {
            if (error.response && error.response.data) {
                if (error.response.data.type === "application/json") {
                    res = JSON.parse(await error.response.data.text());
                } else if (error?.response?.headers?.["content-type"].indexOf("/json") > 0) {
                    res = error.response.data;
                }
            } else {
                res = {
                    message: error.message,
                    statusCode: error.status,
                    error,
                };
            }

            if (error.status === 401) {
                storage.local.remove(STORAGE_KEYS.ACCESS_TOKEN);
            }
        }
        return Promise.reject(res);
    }
);

export const services = {
    auth: new Auth(http),
    system: new System(http),
};
