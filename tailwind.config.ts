import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                "primary-hover": "var(--primary-hover)",
                "sidebar-bg": "var(--sidebar-bg)",
                "sidebar-text": "var(--sidebar-text)",
                accent: "var(--accent)",
                "card-bg": "var(--card-bg)",
                border: "var(--border)",
            },
        },
    },
    plugins: [],
};
export default config;
