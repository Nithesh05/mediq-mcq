"use client";

import { useState, useEffect } from "react";

export function useNotifications() {
    const [permission, setPermission] = useState<NotificationPermission>("default");

    useEffect(() => {
        if (typeof window !== "undefined" && "Notification" in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (typeof window === "undefined" || !("Notification" in window)) return false;

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result === "granted";
        } catch (error) {
            console.error("Error requesting notification permission:", error);
            return false;
        }
    };

    const sendPushNotification = (title: string, options?: NotificationOptions) => {
        if (permission === "granted") {
            new Notification(title, {
                icon: "/favicon.ico", // Assuming standard favicon location
                badge: "/favicon.ico",
                ...options
            });
        }
    };

    const sendEmailSimulation = (email: string, type: string) => {
        console.log(`[MOCK EMAIL SERVICE] Sending '${type}' to ${email}`);
        // In a real app, this would call an API endpoint
        return true;
    };

    return {
        permission,
        requestPermission,
        sendPushNotification,
        sendEmailSimulation
    };
}
