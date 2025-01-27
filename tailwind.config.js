/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b21713",
        secondary: "#d95252",
        /* Background Colors */
        main: "var(--main-bg)",
        secondary: "var(--secondary-bg)",
        header: "var(--header-bg)",
        "header-alt": "var(--header-alt-bg)",
        toggle: "var(--toggle-bg)",
        muted: "var(--muted-bg)",
        highlight: "var(--highlight-bg)",
        active: "var(--active-bg)",
        "active-alt": "var(--active-alt-bg)",

        /* Text Colors */
        text: "var(--main-text)",
        contrast: "var(--contrast-text)",
        disabled: "var(--disabled-text)",
        placeholder: "var(--placeholder-text)",
        "section-header": "var(--section-header-text)",

        /* Grey Colors */
        grey: "var(--gray)",
        "border-gray": "#616166",
        "slate-gray": "var(--slate-gray)",
        "light-gray": "var(--light-gray)",
        "gray-dark": "var(--dark-gray)",
        "gray-button": "var(--button-gray)",
        "gray-icon": "var(--icon-gray)",
        "gray-border": "var(--border-gray)",
        "gray-muted-text": "var(--muted-text-gray)",

        /* Accent Colors */
        accent: "var(--primary-accent)",
        inactive: "var(--inactive-state)",
      },
      fontSize: {
        17: "17px",
      },
      borderRadius: {
        base: "10px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
