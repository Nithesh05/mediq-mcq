"use client";

import { useState, useEffect } from "react";

export function useUser() {
    const [user, setUser] = useState<{ id: number; username: string; streak: number; xp: number; level: number; role: string; email?: string; security_question?: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    return { user, loading };
}
