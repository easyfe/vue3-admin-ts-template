<template>
    <div id="amap-container" class="amap-container" :style="getStyle">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import type { MapType } from "./index";

const props = withDefaults(
    defineProps<{
        height: number | string;
        options?: AMap.MapOptions;
        mapType?: MapType;
        mapKey: string;
    }>(),
    {
        mapType: "NORMAL_MAP",
        options: () => {
            return {
                viewMode: "3D",
                zoom: 11,
                center: [116.397428, 39.90923]
            };
        }
    }
);

const emits = defineEmits<{
    (e: "click", value: any): void;
}>();

let map = shallowRef<AMap.Map | null>(null);

let infoWindow: AMap.InfoWindow | null = null;

provide("map", map);
provide("infoWindow", infoWindow);

const getStyle = computed(() => {
    if (typeof props.height === "number") {
        return {
            height: `${props.height}px`
        };
    }
    return {
        height: props.height
    };
});

function init() {
    AMapLoader.load({
        key: props.mapKey, //首次load必填
        version: "2.0",
        AMapUI: {
            version: "1.1",
            plugins: ["overlay/SimpleMarker"]
        }
    })
        .then(() => {
            const mapOptions = props.options;
            satellite = new AMap.TileLayer.Satellite();
            map.value = new AMap.Map("amap-container", mapOptions);
            map.value.on("click", function (ev) {
                emits("click", ev);
            });
        })
        .catch((e) => {
            console.error(e);
        });
}

let satellite: any = null;

watch(
    () => props.mapType,
    (v) => {
        if (map.value) {
            if (v === "NORMAL_MAP") {
                map.value.removeLayer(satellite);
            } else {
                map.value.addLayer(satellite);
            }
        }
    }
);

defineExpose({
    map
});

onMounted(() => {
    init();
});

onUnmounted(() => {
    map.value?.destroy();
});
</script>
<style lang="scss" scoped>
.amap-container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 800px;
}
:deep(.amap-icon) {
    img {
        width: 100%;
    }
}
</style>
