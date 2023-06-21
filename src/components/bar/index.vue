<template>
    <div class="bar-container" ref="barRef" @render="render"></div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from 'vue';
import * as echarts from 'echarts';
import processing from '@/utils/processingOptions';

const barRef = ref();

// 组件传递过来的数据
const props = defineProps({
    // 数据
    data: {
        type: Object,
        required: true
    },
    // 图表类型
    type: {
        type: String,
        default: 'bar'
    },
    // 配置项
    config: {
        type: Object,
        default: () => ({})
    }
});

const state = reactive({
    chart: null
})


onMounted(() => {
    if (barRef.value) {
        state.chart = echarts.init(barRef.value);
        let { type, data, config } = props;
        let options = processing(type, data, config)
        options && state.chart.setOption(options)
    }
});

watch(props, () => {
    let { type, data, config } = props;
    let options = processing(type, data, config)
    options && state.chart.setOption(options)
    // state.startTime = state.completedNum * (state.endTime / 100);
}, { deep: true });

</script>
  
<style lang="scss" scoped>
@import "./index.scss";
</style>