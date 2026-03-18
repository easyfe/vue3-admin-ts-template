<template>
    <div class="map-container">
        <map-container
            ref="myMap"
            map-key="6cb85da518029607d421917b7ddeb94a"
            :map-type="mapType"
            :height="mapHeight"
            :options="{ zoom: 5.37, center: [119.728933, 32.333552] }"
        >
            <template v-for="(item, index) in pointList" :key="item.fullname">
                <map-marker
                    :options="{
                        position: [Number(item.longitude), Number(item.latitude)],
                        size: [23, 35],
                        icon: location1
                        // label: {
                        //     content: item.fullname,
                        //     offset: [5, -15],
                        //     direction: 'right'
                        // }
                    }"
                    @dbclick="markerDbClick(item)"
                    @click="markerClick(item, index)"
                >
                </map-marker>
                <map-text
                    :options="{
                        position: [Number(item.longitude), Number(item.latitude)],
                        text: item.fullname,
                        offset: [25, 0],
                        style: {
                            color: '#CC3333',
                            fontSize: '13px',
                            backgroundColor: '#CCFFFF',
                            border: '0',
                            fontWeight: 'bold'
                        }
                    }"
                ></map-text>
                <map-info-window
                    :show="activeLabel === index"
                    :options="{ position: [Number(item.longitude), Number(item.latitude)] }"
                >
                    <a-spin :loading="infoWindowLoading">
                        <div style="display: flex; flex-direction: column; padding: 10px">
                            <div style="font-weight: bold; margin-bottom: 10px; color: rgb(85, 85, 85)">
                                {{ item.fullname }}
                            </div>
                            <template v-for="(v1, index1) in list" :key="index1">
                                <div style="display: flex; align-items: center; margin-bottom: 6px">
                                    <div
                                        :style="{
                                            width: '10px',
                                            height: '10px',
                                            background: v1.bgColor + ' !important',
                                            borderRadius: '0px',
                                            marginRight: '10px'
                                        }"
                                    ></div>
                                    <div style="display: inherit; font-size: 12px; color: rgb(85, 85, 85)">
                                        <span style="width: 80px">{{ v1.title }}</span>
                                        <span>{{ v1.value }}({{ v1.suffix }})</span>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </a-spin>
                </map-info-window>
            </template>
        </map-container>
        <div class="actions">
            <base-svg
                name="map3"
                :width="20"
                :height="20"
                :color="mapType === 'SATELLITE_MAP' ? '#3366FF' : '#000000'"
                @click="mapType = 'SATELLITE_MAP'"
            ></base-svg>
            <base-svg
                name="map4"
                :width="20"
                :height="20"
                :color="mapType === 'NORMAL_MAP' ? '#3366FF' : '#000000'"
                @click="mapType = 'NORMAL_MAP'"
            ></base-svg>
        </div>
        <div class="bottom-tips">
            <div class="tips-item">
                <img :src="location1" alt="" />
                <div>正常运行</div>
            </div>
            <div class="tips-item">
                <img :src="location2" alt="" />
                <div>告警运行</div>
            </div>
        </div>
        <div v-if="envHelper.dev()" class="map-dev">
            <a-button type="primary" @click="getCenterAndZoom">获取中心点和定位</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup name="MapBox1">
import { Svg as BaseSvg } from "@easyfe/admin-component";
import location1 from "./images/location1.png";
import location2 from "./images/location2.png";
import { MapContainer, MapMarker, MapText, MapInfoWindow } from "@/views/components/the-amap";
import type { MapType } from "@/views/components/the-amap";
import envHelper from "@/utils/helper/env";

const props = withDefaults(
    defineProps<{
        detail: any;
        dept: string;
    }>(),
    {}
);

const mapType = ref<MapType>("NORMAL_MAP");

const activeLabel = ref(-1);
const infoWindowLoading = ref(false);
const mapHeight = ref("100%");

const pointList = ref<
    {
        fullname: string;
        longitude: string;
        latitude: string;
    }[]
>([]);

const list = ref([
    {
        title: "在线设备",
        value: 0,
        suffix: "台",
        bgColor: "#2d76fe"
    },
    {
        title: "离线设备",
        value: 0,
        suffix: "台",
        bgColor: "#ff1111"
    },
    {
        title: "待处理工单",
        value: 0,
        suffix: "个",
        bgColor: "#ffb200"
    },
    {
        title: "待处理事件",
        value: 0,
        suffix: "个",
        bgColor: "#4db8ff"
    }
]);

const myMap = ref<{ map: AMap.Map }>();

function markerDbClick(v: any) {
    myMap.value?.map.setZoomAndCenter(15, [Number(v.longitude), Number(v.latitude)]);
}

function markerClick(item: any, index: number) {
    infoWindowLoading.value = true;
    activeLabel.value = index;
    setTimeout(() => {
        infoWindowLoading.value = false;
    }, 1000);
}

function getCenterAndZoom() {
    console.log(myMap.value?.map.getCenter());
    console.log(myMap.value?.map.getZoom());
}

onMounted(() => {
    pointList.value = [
        {
            fullname: "南京市",
            longitude: "118.796877",
            latitude: "32.060255"
        },
        {
            fullname: "上海市",
            longitude: "121.472644",
            latitude: "31.231706"
        }
    ];
});
</script>
<style lang="scss" scoped>
.map-container {
    width: 100%;
    height: 100%;
    position: relative;
    :deep(.baidu-map-container .shadow) {
        opacity: 0;
    }
    .actions {
        position: absolute;
        flex-direction: column;
        width: 40px;
        align-items: center;
        background: white;
        z-index: 99;
        right: 31px;
        top: 44px;
        height: 70px;
        justify-content: space-around;
        border-radius: 5px;
        display: flex;
    }
    .map-dev {
        position: absolute;
        right: 40px;
        bottom: 40px;
        z-index: 99;
    }
    .bottom-tips {
        position: absolute;
        bottom: 40px;
        left: 40px;
        z-index: 99;
        width: 150px;
        height: 100px;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px 20px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .tips-item {
            display: flex;
            align-items: center;
            margin-right: 20px;
            img {
                width: 23px;
                height: 35px;
                margin-right: 10px;
            }
            div {
                color: #fff;
            }
        }
    }
}
</style>
