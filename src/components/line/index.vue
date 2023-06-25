<template>
    <div class="line-container" ref="lineRef"></div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from 'vue';
import * as echarts from 'echarts';
import processing from '@/utils/processingOptions';

const lineRef = ref();

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
        default: 'line'
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
    if (lineRef.value) {
        state.chart = echarts.init(lineRef.value);
        let { type, data, config } = props;
        console.log(props)
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