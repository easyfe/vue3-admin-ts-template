import { ref, onMounted } from "vue";

const themeModeOptions = [
    { label: "亮色模式", value: "light" },
    { label: "暗色模式", value: "dark" },
    { label: "跟随系统", value: "auto" }
];

const defaultTheme: any = localStorage.getItem("arco-theme") || "auto";

const currentTheme = ref<"light" | "dark">(defaultTheme);
const currentThemeMode = ref<"light" | "dark" | "auto">(defaultTheme);

export const useTheme = () => {
    //设置自动主题模式
    const setAutoTheme = () => {
        if (currentThemeMode.value !== "auto") return;
        localStorage.setItem("arco-theme", "auto");
        const mode = darkModeQuery.matches ? "dark" : "light";
        currentThemeMode.value = "auto";
        currentTheme.value = mode;
        document.body.setAttribute("arco-theme", mode);
    };

    //设置手动主题模式
    const setManualTheme = (v: "light" | "dark") => {
        localStorage.setItem("arco-theme", v);
        currentThemeMode.value = v;
        currentTheme.value = v;
        document.body.setAttribute("arco-theme", v);
    };

    //获取当前浏览器主题色，并监听系统级切换
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addListener(setAutoTheme);

    //用于处理手动切换主题
    const handleThemeChange = (v: "light" | "dark" | "auto") => {
        if (v === "auto") {
            currentThemeMode.value = "auto";
            setAutoTheme();
        } else {
            setManualTheme(v);
        }
    };

    //初始化
    onMounted(() => {
        if (currentThemeMode.value === "auto") {
            currentThemeMode.value = "auto";
            setAutoTheme();
        } else {
            setManualTheme(currentThemeMode.value);
        }
    });

    onUnmounted(() => {
        darkModeQuery.removeListener(setAutoTheme);
    });

    return {
        currentTheme,
        currentThemeMode,
        themeModeOptions,
        handleThemeChange
    };
};
