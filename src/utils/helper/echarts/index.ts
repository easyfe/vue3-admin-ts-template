import { EChartsOption } from "echarts";
import { isArray, merge } from "lodash-es";

const echartsHelper = {
    option(params: Record<string, any>, merging?: boolean) {
        if (merging === false) {
            return merge(
                {
                    backgroundColor: "rgba(0,0,0,0)"
                },
                params
            );
        }
        const defaultOpt: EChartsOption = {
            backgroundColor: "rgba(0,0,0,0)",
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    label: {
                        backgroundColor: "#6a7985"
                    }
                }
            },
            legend: {
                icon: "rect",
                itemWidth: 8,
                itemHeight: 8,
                right: "10px"
            },
            grid: {
                top: 80,
                left: 20,
                right: 20,
                bottom: 20,
                containLabel: true
            }
        };
        const xAxisParmas = {
            axisLabel: {}
        };
        if (isArray(params?.xAxis)) {
            params?.xAxis?.forEach((item) => {
                merge(item, xAxisParmas);
            });
        } else {
            merge(params, {
                xAxis: xAxisParmas
            });
        }
        return merge(defaultOpt, params);
    }
};
export default echartsHelper;
