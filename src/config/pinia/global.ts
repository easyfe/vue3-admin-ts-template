import { defineStore } from "pinia";

export default defineStore({
    id: "global",
    state: () => ({
        theme: <"light" | "dark">"light",
        collapsed: false
    }),
    actions: {
        // Change theme color
        toggleTheme(dark: boolean) {
            if (dark) {
                this.theme = "dark";
                document.body.setAttribute("arco-theme", "dark");
            } else {
                this.theme = "light";
                document.body.removeAttribute("arco-theme");
            }
        }
    }
});
