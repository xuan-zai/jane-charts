<template>
  <div class="app-container">

    <div class="demo demo-1">
      <SlashBar :data="demoOne" />
    </div>
    <div class="demo demo-2">
      <SlashBar :data="demoTwo" />
    </div>
    <div class="demo demo-3">
      <SlashBar :data="demoThree" />
    </div>
    <div class="demo demo-4">
      <SlashBar :data="demoFour" />
    </div>
    <div class="demo demo-5">
      <SlashBar :data="demoFive" />
    </div>
    <div class="demo demo-6">
      <SlashBar :data="demoSix" />
    </div>
    <div class="demo demo-7">
      <SlashBar :data="demoSeven" />
    </div>
    <div class="demo demo-8">
      <SlashBar :data="demoEight" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { reactive } from 'vue';
import SlashBar from '@/components/bar/index.vue';

const demoOne = reactive({
  option: {
    title: {
      text: '基础柱状图',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      data: [2021, 2020, 2019, 2018, 2017],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 9
      }
    },
    yAxis: {
      type: 'value',
      show: false
    },
    color: '#52AC0B',
    series: [
      {
        data: [{
          value: 100,
          itemStyle: {
            color: '#ddd'
          }
        },
        {
          value: 120,
        },
        {
          value: 60,
          itemStyle: {
            color: '#ddd'
          }
        },
        {
          value: 90,
          itemStyle: {
            color: '#ddd'
          }
        },
        {
          value: 70,
          itemStyle: {
            color: '#ddd'
          }
        }],
        type: 'bar',
        itemStyle: {
          borderRadius: 8
        },
        animationDelay: function (idx: any) {
          return idx * 10;
        }
      }
    ],
    animationDelayUpdate: function (idx: any) {
      return idx * 5;
    }
  }
});

const demoTwo = reactive({
  option: {
    title: {
      text: '带背景色柱状图',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 9,
        show: false
      }
    },
    yAxis: {
      type: 'value',
      show: false
    },
    color: '#0A9396',
    series: [
      {
        data: [100, 200, 120, 90, 210, 110, 60],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: "#E9EDF7",
          borderRadius: 300
        },
        itemStyle: {
          borderRadius: 300
        },
        barWidth: 15,
        animationDelay: function (idx: any) {
          return idx * Math.random() * 100;
        }
      },
    ],
    animationDelayUpdate: function (idx: any) {
      return idx * 5;
    }
  }
});

const demoThree = reactive({
  option: {
    title: {
      text: '显示最大值分界线的柱状图',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        show: true
      }
    },
    yAxis: {
      type: 'value',
      show: false,
      max: 330,
      // max: function (val: any) {
      //   console.log(val.max + val.max * 0.3)
      //   return val.max + val.max * 0.3
      // }
    },
    color: '#4361EE',
    series: [
      {
        data: [100, 200, 120, 90, 300, 110, 60, 100, 200, 120, 90, 210].map(ele => {
          if (ele !== 300) {
            return {
              value: ele,
              itemStyle: {
                color: '#ddd'
              }
            }
          }
          return ele;
        }),
        type: 'bar',
        itemStyle: {
          borderRadius: 8
        },
        animationDelay: function (idx: any) {
          return idx * 100;
        },
        markLine: {
          data: [{
            yAxis: 330,
            lineStyle: {
              width: 3
            },
            label: {
              formatter: 'MAX'
            }
          }],
          symbol: 'none'
        }
      }
    ],
    animationDelayUpdate: function (idx: any) {
      return idx * 5;
    }
  }
});

const demoFour = reactive({
  option: {
    title: {
      text: '柱状堆叠图',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        show: false
      }
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    legend: {
      bottom: 30,
      left: '10%',
      itemGap: 12,
      borderRadius: 30,
      icon: 'circle',
    },
    color: ['#F72585', '#7209B7', '#4CC9F0'],
    series: [
      {
        name: '2010',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        showBackground: true,
        backgroundStyle: {
          color: "#E9EDF7",
          borderRadius: 15
        },
        barWidth: 15,
        itemStyle: {
          borderRadius: 15
        },
        data: [220, 132, 270, 134, 90, 230, 220, 132, 270, 134, 90, 230],
      },
      {
        name: '2011',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        showBackground: true,
        backgroundStyle: {
          color: "#E9EDF7",
          borderRadius: 15
        },
        barWidth: 15,
        itemStyle: {
          borderRadius: 15
        },
        data: [320, 182, 191, 234, 290, 330, 320, 182, 191, 234, 290, 330]
      },
      {
        name: '2022',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        showBackground: true,
        backgroundStyle: {
          color: "#E9EDF7",
          borderRadius: 15
        },
        barWidth: 15,
        itemStyle: {
          borderRadius: 15
        },
        data: [200, 232, 300, 154, 190, 330, 232, 300, 154, 190, 330, 410]
      },
    ],
    animationDelayUpdate: function (idx: any) {
      return idx * 5;
    }
  }
});

const demoFive = reactive({
  option: {
    title: {
      text: '正负柱状图',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        show: false
      }
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    legend: {
      // bottom: 30,
      top: 30,
      left: '10%',
      itemGap: 12,
      borderRadius: 30,
      icon: 'circle',
    },
    color: ['#F72585', '#7209B7', '#4CC9F0'],
    series: [
      {
        name: 'Income',
        type: 'bar',
        stack: 'Total',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          borderRadius: [300, 300, 0, 0]
        },
        barWidth: 15,
        data: [320, 302, 341, 374, 120, 450, 420],
        markLine: {
          data: [{
            yAxis: 0,
            lineStyle: {
              width: 1,
              color: '#000'
            },
            label: {
              formatter: '0'
            }
          }],
          symbol: 'none'
        }
      },
      {
        name: 'Expenses',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderRadius: [0, 0, 300, 300]
        },
        barWidth: 15,
        emphasis: {
          focus: 'series'
        },
        data: [-120, -132, -101, -134, -190, -230, -210]
      }
    ],
    animationDelayUpdate: function (idx: any) {
      return idx * 5;
    }
  }
});

const demoSix = reactive({
  option: {
    title: {
      text: '柱状数据集',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      data: ['2021', '2022', '2023', '2024', '2025'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        show: true
      }
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    color: ['#F72585', '#7209B7', '#4CC9F0'],
    series: [
      {
        name: 'City Alpha',
        type: 'bar',
        data: [165, 170, 30, 150, 105, 110],
        itemStyle: {
          borderRadius: 300
        },
        barWidth: 15,
      },
      {
        name: 'City Beta',
        type: 'bar',
        data: [100, 105, 110, 170, 30, 150],
        itemStyle: {
          borderRadius: 300
        },
        barWidth: 15,
      },
    ],
    animationDelayUpdate: function (idx: any) {
      return idx * 5;
    }
  }
});

const demoSeven = reactive({
  option: {
    title: {
      text: '渐变条形图',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 9,
        show: false
      }
    },
    color: '#0A9396',
    series: [
      {
        data: [100, 200, 120, 90, 270],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: "#E9EDF7",
          borderRadius: 300
        },
        itemStyle: {
          borderRadius: 300,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#C84E89' },
            { offset: 1, color: '#F15F79' }
          ])
        },
        barWidth: 20,
        animationDelay: function (idx: any) {
          return idx * Math.random() * 100;
        }
      }
    ],
    animationDelayUpdate: function (idx: any) {
      return idx * 5;
    }
  }
});

const demoEight = reactive({
  option: {
    title: {
      text: '阶梯瀑布图',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        show: false
      }
    },
    yAxis: {
      type: 'value',
      show: true,
      axisLabel: {
        formatter: (val: any) => {
          return val / 1000 + 'k'
        }
      },
      interval: 2000
    },
    color: ['#F72585', '#7209B7', '#4CC9F0'],
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        silent: true,
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
        },
        barWidth: 15,
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
        data: [1900, 1200, 2245, 1530, 0, 1376, 1511, 7000, 956, 1495, 1292]
      },
      {
        name: 'Income',
        type: 'bar',
        stack: 'Total',
        label: {
          show: false,
          position: 'top'
        },
        itemStyle: {
          borderRadius: 300
        },
        data: [3600, '-', 3900, '-', '-', 3235, 3178, 2286, '-', '-', '-']
      },
      {
        name: 'Expenses',
        type: 'bar',
        stack: 'Total',
        label: {
          show: false,
          position: 'bottom'
        },
        itemStyle: {
          borderRadius: 300
        },
        data: ['-', 2000, '-', 6108, 3154, '-', '-', '-', 2219, 3361, 5203]
      }
    ],
    animationDelayUpdate: function (idx: any) {
      return idx * 5;
    }
  }
});

</script>

<style lang="scss" scoped>
@import "@/assets/app.scss";
</style>