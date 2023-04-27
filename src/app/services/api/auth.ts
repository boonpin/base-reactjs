import { Base } from "./base";
import { STORAGE_KEYS } from "@/src/app/constants";
import * as storage from "../storage";

export class Auth extends Base {
    get token() {
        return {
            clear: (): void => {
                storage.local.remove(STORAGE_KEYS.USER);
                storage.local.remove(STORAGE_KEYS.ACCESS_TOKEN);
            },
            exists: (): boolean => storage.local.has(STORAGE_KEYS.ACCESS_TOKEN),
        };
    }

    get password() {
        return {
            update: (current: string, new_password: string) =>
                this.http.post("/api/auth/password", {
                    current,
                    password: new_password,
                }),
        };
    }

    login(credential: { username: string; password: string }) {
        return this.http.post<any, { token: string; name: string }>("/api/auth/login", credential).then((rs) => {
            storage.local.set(STORAGE_KEYS.ACCESS_TOKEN, rs.token);
            return rs;
        });
    }

    profile() {
        return this.http.get<any, any>("/api/auth/profile");
    }

    update(values: any) {
        return this.http.put<any, any>("/api/auth/profile", values);
    }

    logout(): Promise<{ message: string }> {
        return new Promise((resolve) => {
            this.token.clear();
            resolve({ message: "success" });
        });
    }
}
