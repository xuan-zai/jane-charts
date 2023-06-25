<template>
    <div class="menu-container">
        <el-menu :default-active="state.active" class="el-menu-vertical-demo" router>
            <el-menu-item index="bar">
                <span>柱状图</span>
            </el-menu-item>
            <el-menu-item index="line">
                <span>折线图</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const state = reactive({
    active: 'bar'
});

// 防止页面刷新之后，回到默认菜单项
watch(route, (newValue) => {
    state.active = newValue.path.replace('/', '')
}, { deep: true })

</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>