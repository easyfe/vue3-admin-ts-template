import visualizer from "rollup-plugin-visualizer";
import type { Plugin } from "vite";

export function ConfigVisualizerConfig(): Plugin {
    return visualizer({
        filename: "stats.html",
        open: false,
        gzipSize: true,
        brotliSize: true
    });
}
