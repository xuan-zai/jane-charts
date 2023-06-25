<template>
    <div class="bar-container">
        <div class="bar-item-container" v-for="item in mock.data" :key="item.id">
            <div class="bar-item-title">{{ item.title }}</div>
            <div class="bar-item-chart-container">
                <div class="bar-item-chart" v-for="key in item.data" :key="key.id">
                    <div class="chart-item-container">
                        <LineCom v-if="key.data" :data="key.data" :config="key.config" />
                        <el-empty v-else :image-size="100" description="暂无图表数据" />
                    </div>
                    <div class="chart-item-info">
                        <div class="chart-item-title">{{ key.title }}</div>
                        <div class="chart-item-version" v-if="key.version">echarts 版本：v{{ key.version }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { reactive } from 'vue';
import LineCom from '@/components/line/index.vue';

const mock = reactive({
    data: [
        {
            id: 0,
            title: '基础折线图',
            data: [
                {
                    id: 0,
                    title: '基础折线图',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '简单',
                        },
                        x: {
                            data: ["2019", "2020", "2021", "2022", '2023'],
                            unitConfig: {
                                unit: '年',
                                location: 'after'
                            }
                        },
                        y: {
                        },
                        series: {
                            data: [100, 200, 100, 200, 20],
                        }
                    },
                    config: {
                        barStyle: {
                            width: 12,
                            round: 20
                        }
                    }
                }
            ]
        }
    ]
})
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>