<template>
    <div class="bar-container">
        <div class="bar-item-container" v-for="item in mock.data" :key="item.id">
            <div class="bar-item-title">{{ item.title }}</div>
            <div class="bar-item-chart-container">
                <div class="bar-item-chart" v-for="key in item.data" :key="key.id">
                    <div class="chart-item-container">
                        <BarCom v-if="key.data" :data="key.data" :config="key.config" />
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
import BarCom from '@/components/bar/index.vue';

const mock = reactive({
    data: [
        {
            id: 0,
            title: '基础柱状图',
            data: [
                {
                    id: 0,
                    title: '基础柱状图',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '简单',
                            sub: '修改config.barStyle的width和round来改变柱状的宽度和圆角'
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
                            data: [100, 200, 100, 200, 20]
                        }
                    },
                    config: {
                        barStyle: {
                            width: 12,
                            round: 20
                        }
                    }
                },
                {
                    id: 1,
                    title: '渐变',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '渐变',
                            sub: '渐变颜色可以通过 config.barStyle.color 进行设置'
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
                            data: [100, 200, 100, 200, 20]
                        }
                    },
                    config: {
                        barStyle: {
                            width: 12,
                            round: 20,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#C84E89'
                                }, {
                                    offset: 1, color: '#F15F79'
                                }],
                            }
                        }
                    }
                },
                {
                    id: 2,
                    title: '带有背景色',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '带有背景色',
                            sub: '背景的颜色可以通过 config.bgcolor 进行设置'
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
                            data: [100, 200, 100, 200, 20]
                        }
                    },
                    config: {
                        barStyle: {
                            width: 12,
                            round: 9
                        },
                        color: '#0A9396',
                        bgcolor: {
                            show: true,
                            color: 'rgba(180, 180, 180, 0.2)',
                            round: 9
                        }
                    }
                },
                {
                    id: 3,
                    title: '针对轴线的设置',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '针对轴线的设置',
                            sub: '针对轴线的设置'
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
                            data: [100, 200, 100, 200, 20]
                        }
                    },
                    config: {
                        axis: {
                            x: {
                                show: true, // 控制 x 轴是否显示
                                lineStyle: {
                                    show: false, // 是否显示轴线
                                    color: 'red' // 轴线的颜色
                                },
                                tickStyle: {
                                    show: false
                                },
                                labelStyle: {
                                    show: true,
                                },
                                splitLine: {
                                    show: false
                                }
                            },
                            y: {
                                show: true, // 控制 y 轴是否显示
                                lineStyle: {
                                    show: false, // 是否显示轴线
                                },
                                tickStyle: {
                                    show: false
                                },
                                labelStyle: {
                                    show: false,
                                },
                                splitLine: {
                                    show: false
                                }
                            }
                        },
                        barStyle: {
                            width: 21,
                            round: 3
                        }
                    }
                },
                {
                    id: 4,
                    title: "基础动画效果",
                    version: "5.4.2",
                    data: {
                        title: {
                            text: '基础动画',
                            sub: '修改 animation.delay 来设置动画的延迟'
                        },
                        x: {
                            data: ["2019", "2020", "2021", "2022", '2023'],
                            unitConfig: {
                                unit: '年',
                                location: 'after'
                            }
                        },
                        series: {
                            data: [100, 200, 100, 200, 300]
                        }
                    },
                    config: {
                        barStyle: {
                            width: 12,
                            round: 20,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(0, 150, 199, 1)'
                                }, {
                                    offset: 1, color: 'rgba(255, 255, 255, 0)'
                                }],
                            }
                        },
                        animation: {
                            delay: 300
                        }
                    }
                },
                {
                    id: 5,
                    title: "不传 x 和 y",
                    version: "5.4.2",
                    data: {
                        title: {
                            text: '不传 x 和 y',
                            sub: '默认 x.type = category，data 的内容会自动从 series.data 中获取'
                        },
                        series: {
                            data: [100, 200, 100, 200, 300]
                        }
                    },
                    config: {
                        barStyle: {
                            width: 12,
                            round: 3,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(0, 150, 199, 1)'
                                }, {
                                    offset: 1, color: 'rgba(255, 255, 255, 0)'
                                }],
                            }
                        },
                        animation: {
                            delay: 600
                        },
                        axis: {
                            x: {
                                show: true, // 控制 x 轴是否显示
                                lineStyle: {
                                    show: false, // 是否显示轴线
                                },
                                tickStyle: {
                                    show: false
                                },
                                labelStyle: {
                                    show: true,
                                },
                                splitLine: {
                                    show: false
                                }
                            },
                            y: {
                                show: true, // 控制 y 轴是否显示
                                lineStyle: {
                                    show: false, // 是否显示轴线
                                },
                                tickStyle: {
                                    show: false
                                },
                                labelStyle: {
                                    show: false,
                                },
                                splitLine: {
                                    show: false
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            id: 1,
            title: '堆叠柱状图',
            data: [
                {
                    id: 0,
                    title: '简单堆叠柱状图',
                    version: '5.4.2',
                    data: {
                        title: {
                            text: '简单堆叠柱状图'
                        },
                        x: {
                            data: ['一', '二', '三', '四', '五', '六', '日'],
                            unitConfig: {
                                unit: '周',
                                location: 'before'
                            }
                        },
                        series: [
                            {
                                name: '2010',
                                type: 'bar',
                                stack: 'A',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [220, 132, 270, 134, 90, 230, 220],
                            },
                            {
                                name: '2011',
                                type: 'bar',
                                stack: 'Ad',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [320, 182, 191, 234, 290, 330, 320]
                            },
                            {
                                name: '2022',
                                type: 'bar',
                                stack: 'Ad',
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [200, 232, 300, 154, 190, 330, 232]
                            },
                        ]
                    },
                    config: {
                        barStyle: {
                            width: 12,
                            round: 6
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