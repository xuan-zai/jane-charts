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
                        lineStyle: {
                            width: 12,
                            round: 20
                        }
                    }
                },
                {
                    id: 1,
                    title: '基础曲线图',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '曲线',
                            sub: '通过设置 config.lineStyle.smooth 来设置是否显示曲线'
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
                        lineStyle: {
                            smooth: true
                        }
                    }
                },
                {
                    id: 1,
                    title: '基础曲线图',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '多条曲线',
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
                        series: [
                            {
                                name: '2010',
                                type: 'line',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [3, 5, 9, 3, 8, 12, 10, 23],
                            },
                            {
                                name: '2011',
                                type: 'line',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [23, 10, 12, 8, 3, 9, 5, 3]
                            },
                            {
                                name: '2022',
                                type: 'line',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [10, 9, 23, 5, 3, 12, 8, 3]
                            },
                        ]
                    },
                    config: {
                        lineStyle: {
                            smooth: true
                        }
                    }
                },
                {
                    id: 1,
                    title: '基础堆叠曲线图',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '堆叠曲线',
                            sub: '通过设置 config.lineStyle.area.show 来设置是否堆叠'
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
                        series: [
                            {
                                name: '2010',
                                type: 'line',
                                stack: 'ad',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [3, 5, 9, 3, 8, 12, 10, 23],
                            },
                            {
                                name: '2011',
                                type: 'line',
                                stack: 'ad',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [23, 10, 12, 8, 3, 9, 5, 3]
                            },
                            {
                                name: '2022',
                                type: 'line',
                                stack: 'ad',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [10, 3, 23, 5, 9, 12, 8, 12]
                            },
                        ]
                    },
                    config: {
                        color: ['#0A9396', '#1a9bfc', '#99da69'],
                        lineStyle: {
                            smooth: true,
                            area: {
                                show: true
                            }
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