import visualizer from "rollup-plugin-visualizer";
import { Plugin } from "vite";

export function ConfigVisualizerConfig(): Plugin {
    return visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
    });
}
