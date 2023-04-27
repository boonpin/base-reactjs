import moment from "dayjs";

export const toDisplayTime = (date: any) => {
    return date ? moment(date).format("LT") : "";
};

export const toDisplayDate = (date: any) => {
    return date ? moment(date).format("YYYY-MM-DD") : "";
};

export const toDisplayDatetime = (date: any) => {
    return date ? moment(date).format("YYYY-MM-DD h:mma") : "";
};

export const toDisplayDetailDatetime = (date: any) => {
    return date ? moment(date).format("YYYY-MM-DD h:mm:ssa") : "";
};

export const toDuration = (from: any, to: any) => {
    const duration = (unit: "minutes" | "hours" | "days") => {
        if (from && to) {
            return moment(to).diff(from, unit);
        }
        return null;
    };
    return {
        minutes: () => duration("minutes"),
        hours: () => duration("hours"),
        days: () => duration("days"),
    };
};

export const toDisplayMac = (mac: string, empty = null) => {
    return mac ? `${mac}`.toUpperCase() : empty;
};

export const toDisplayDuration = (seconds: number) => {
    seconds = Math.round(seconds);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const secs = ((seconds % 86400) % 3600) % 60;

    if (days > 0) {
        return `${days} days ${hours} hours ${minutes} minutes ${secs} seconds`;
    } else if (hours > 0) {
        return `${hours} hours ${minutes} minutes ${secs} seconds`;
    } else if (minutes > 0) {
        return `${minutes} minutes ${secs} seconds`;
    }

    return `${seconds} seconds`;
};

export const toDisplayDurationMinutes = (seconds: number) => {
    if (isNaN(seconds)) {
        return "-";
    }

    seconds = Math.round(seconds);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor(((seconds % 86400) % 3600) / 60);

    if (days > 0) {
        return `${days} days ${hours} hours ${minutes} minutes`;
    } else if (hours > 0) {
        return `${hours} hours ${minutes} minutes`;
    } else if (minutes > 0) {
        return `${minutes} minutes`;
    }
    return `${seconds} seconds`;
};
