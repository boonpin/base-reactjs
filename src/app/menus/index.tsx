import { PORTAL_MENUS } from "./portal-menu";

export function getMenus(user?: any): any[] {
    //TODO: filter by user?
    return PORTAL_MENUS;
}
