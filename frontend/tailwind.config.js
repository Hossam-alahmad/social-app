module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "var(--primary-color)",
                secondry: "var(--secondry-color)",
                third: "var(--third-color)",
                "primary-font": "var(--primary-font)",
                "secondry-font": "var(--secondry-font)",
                "light-font": "var(--third-font)",
                "primary-border": "var(--primary-border)",
                "primary-dark": "var(--d-primary-color)",
                "secondry-dark": "var(--d-secondry-color)",
                "third-dark": "var(--d-third-color)",
                "primary-border-dark": "var(--d-primary-border)",
                "d-primary-font": "var(--d-primary-font)",
                danger: "var(--danger-color)",
                success: "var(--success-color)",
                warning: "var(--warning-color)",
            },
        },
    },
    plugins: [],
};
