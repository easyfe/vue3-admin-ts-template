const ChartLine = defineAsyncComponent(() => import("./line.vue"));
const ChartBar = defineAsyncComponent(() => import("./bar.vue"));
const ChartOverview = defineAsyncComponent(() => import("./overview.vue"));

export { ChartBar, ChartLine, ChartOverview };
