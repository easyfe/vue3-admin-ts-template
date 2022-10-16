import visualizer from "rollup-plugin-visualizer";

export function ConfigVisualizerConfig(): any {
    return visualizer({
        filename: "stats.html",
        open: false,
        gzipSize: true,
        brotliSize: true
    });
}
