import packageJson from "../package.json";

declare global {
    interface Window {
        REACT_APP_API_HOST?: string;
        REACT_APP_NAME?: string;
        REACT_APP_MODE?: string;
    }
}
const APP_NAME = window.REACT_APP_NAME ?? import.meta.env.VITE_APP_NAME;

export const APP = {
    NAME: APP_NAME ?? "WEBAPP",
    POWERED_BY: import.meta.env.VITE_APP_POWERED_BY,
    POWERED_BY_WEBSITE: import.meta.env.VITE_APP_POWERED_BY_WEBSITE,
    VERSION: packageJson.version,
};

export const SECURE = {
    KEY: import.meta.env.VITE_APP_SECURE_KEY,
};

export const API = {
    HOST: window.REACT_APP_API_HOST ? window.REACT_APP_API_HOST : import.meta.env.VITE_APP_API_HOST,
    TIMEOUT: import.meta.env.VITE_APP_API_TIMEOUT_MS ? Number(import.meta.env.VITE_API_TIMEOUT_MS) : 30000,
};
