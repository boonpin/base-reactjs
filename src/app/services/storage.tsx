export const local = {
    remove: (key: string) => localStorage.removeItem(key),
    set: (key: string, value: any) => {
        const v = typeof value === "object" ? JSON.stringify(value) : value;
        return localStorage.setItem(key, v);
    },
    has: (key: string) => localStorage.getItem(key) !== null,
    get: {
        value: (key: string, defaultValue = null): any => {
            const v = localStorage.getItem(key);
            if (v === null || v === undefined) {
                return defaultValue;
            }
            return v;
        },
        object: (key: string, defaultValue: any = null): any => {
            const v = localStorage.getItem(key);
            if (v === null || v === undefined) {
                return defaultValue;
            }
            return JSON.parse(v);
        },
    },
};

export const session = {
    remove: (key: string) => sessionStorage.removeItem(key),
    set: (key: string, value: any) => {
        const v = typeof value === "object" ? JSON.stringify(value) : value;
        return sessionStorage.setItem(key, v);
    },
    has: (key: string) => sessionStorage.getItem(key) !== null,
    get: {
        value: (key: string, defaultValue = null): any => {
            const v = sessionStorage.getItem(key);
            if (v === null || v === undefined) {
                return defaultValue;
            }
            return v;
        },
        object: (key: string, defaultValue: any = null): any => {
            const v = sessionStorage.getItem(key);
            if (v === null || v === undefined) {
                return defaultValue;
            }
            return JSON.parse(v);
        },
    },
};
