/**
 * 按需引入的 ECharts 接口
 * echarts版本 5.0.1^
 */

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";

// 引入折线图图表，图表后缀都为 Chart
import { LineChart } from "echarts/charts";
// 引入饼图图表，图表后缀都为 Chart
import { PieChart } from "echarts/charts";
// 引入地理坐标/地图图表，图表后缀都为 Chart
import { MapChart } from "echarts/charts";
// 引入仪表盘图表，图表后缀都为 Chart *注意BarChart和GaugeChart的导入顺序
import { BarChart } from "echarts/charts";
import { GaugeChart } from "echarts/charts";

const Chart = [LineChart, PieChart, MapChart, BarChart, GaugeChart];

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    DataZoomComponent,
    TransformComponent,
    VisualMapComponent,
    GeoComponent
} from "echarts/components";

const Component = [
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    DataZoomComponent,
    TransformComponent,
    VisualMapComponent,
    GeoComponent
];

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([...Chart, ...Component, CanvasRenderer]);

export default echarts;
