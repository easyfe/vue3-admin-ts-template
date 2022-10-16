<template>
    <div class="base-pic">
        <div v-for="(item, index) of list" :key="index" class="pic-item">
            <div class="header"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    list: {
        type: Array,
        default: () => {
            return [];
        }
    }
});
</script>

<style lang="scss" scoped>
.base-pic {
    width: 100%;
    .pic-item {
        width: 100%;
        height: 150px;
        border-radius: 2px;
        border: 1px solid #dcdde0;
        background: #ffffff;
        .header {
            height: 44px;
            padding: 0 15px;
            border-bottom: 1px solid #dcdde0;
        }
    }
}
</style>
