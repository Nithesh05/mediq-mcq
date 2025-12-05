"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";

export default function DebugAuthPage() {
    const { user, loading } = useUser();
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [cookieStatus, setCookieStatus] = useState<string>("");

    useEffect(() => {
        // Check if we can see the cookie (only works if not httpOnly, but good to check)
        setCookieStatus(document.cookie);

        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => setApiResponse(data))
            .catch(err => setApiResponse({ error: err.message }));
    }, []);

    return (
        <div className="p-8 bg-white text-black min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Auth Debugger</h1>

            <div className="grid gap-6">
                <div className="border p-4 rounded shadow">
                    <h2 className="font-bold text-lg mb-2 text-blue-600">1. Client State (useUser Hook)</h2>
                    <div className="bg-gray-100 p-4 rounded font-mono text-sm overflow-auto">
                        {loading ? "Loading..." : (user ? "User Logged In" : "User is NULL")}
                        <pre className="mt-2 text-xs text-gray-600">
                            {JSON.stringify(user, null, 2)}
                        </pre>
                    </div>
                </div>

                <div className="border p-4 rounded shadow">
                    <h2 className="font-bold text-lg mb-2 text-green-600">2. API Response (/api/auth/me)</h2>
                    <div className="bg-gray-100 p-4 rounded font-mono text-sm overflow-auto">
                        {apiResponse ? (
                            apiResponse.user ? "API says: Logged In" : "API says: NULL (Logged Out)"
                        ) : "Fetching..."}
                        <pre className="mt-2 text-xs text-gray-600">
                            {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                    </div>
                </div>

                <div className="border p-4 rounded shadow">
                    <h2 className="font-bold text-lg mb-2 text-purple-600">3. Browser Cookies (Visible)</h2>
                    <div className="bg-gray-100 p-4 rounded font-mono text-sm break-all">
                        {cookieStatus || "No non-httpOnly cookies visible"}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Note: The 'session' cookie is HttpOnly, so it might not show up here, but it should be in DevTools.</p>
                </div>
            </div>

            <div className="mt-6 flex gap-4">
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Reload Page
                </button>
                <a
                    href="/login"
                    className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                >
                    Go to Login
                </a>
            </div>
        </div>
    );
}
