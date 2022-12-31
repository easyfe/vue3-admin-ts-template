<template>
    <n-menu
        :options="menuOptions"
        :collapsed="props.collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="20"
        :indent="24"
        @update:value="clickMenuItem"
        @update-expanded-keys="menuExpanded"
    />
</template>
<script lang="ts" setup>
import routes from "@/config/pinia/routes";
import { MenuOption } from "naive-ui";
import { RouteConfig } from "types";
import BaseSvg from "@/resources/components/base-svg/index.vue";
const props = withDefaults(
    defineProps<{
        collapsed: boolean;
    }>(),
    {}
);
const emits = defineEmits<{
    (e: "update:collapsed", value: boolean): void;
}>();
const menuOptions = computed(() => {
    return initMenus();
});
const clickMenuItem = (key: string) => {
    console.log("clickMenuItem", key);
};
const menuExpanded = (key: string[]) => {
    console.log("menuExpanded", key);
};
const initMenus = (): MenuOption[] => {
    const renderIcon = (icon: string) => {
        return () => h(BaseSvg, { name: icon, width: 20, height: 20 }, {});
    };
    const setRoutes = (tmpRoutes: RouteConfig[]) => {
        let cloneData: MenuOption[] = [];
        tmpRoutes.forEach((item) => {
            cloneData.push({
                label: item.meta?.title,
                icon: item.meta?.icon ? renderIcon(item.meta?.icon) : undefined,
                key: item.name
            });
        });
        for (const key in tmpRoutes) {
            if (tmpRoutes[key].children?.length) {
                cloneData[key].children = setRoutes(tmpRoutes[key].children || []);
            }
        }
        return cloneData;
    };
    return setRoutes(routes().routes);
};
</script>
<style lang="scss" scoped></style>
