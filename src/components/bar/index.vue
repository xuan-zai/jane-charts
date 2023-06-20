<template>
    <div class="bar-container" ref="barRef"></div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const barRef = ref();

// 组件传递过来的数据
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})


onMounted(() => {
    if (barRef.value) {
        let myChart = echarts.init(barRef.value);
        if (props.data.option) {
            myChart.setOption(props.data.option);
        }
    }
});

</script>
  
<style lang="scss" scoped>
@import "./index.scss";
</style>