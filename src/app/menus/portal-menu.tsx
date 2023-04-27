import { TbHeartRateMonitor } from "react-icons/tb";
import { AiOutlineDashboard } from "react-icons/ai";

export const PORTAL_MENUS = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: <AiOutlineDashboard style={{ marginRight: 20 }} />,
        children: [
            {
                id: "overview",
                title: "Overview",
                path: "/admin/dashboard/overview",
            },
        ],
    },
    {
        id: "system",
        title: "System",
        icon: <TbHeartRateMonitor style={{ marginRight: 20 }} />,
        children: [
            {
                id: "logs",
                title: "Logs",
                path: "/admin/system/logs",
            },
        ],
    },
];
