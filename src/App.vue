<template>
  <div class="app-container">
    <div class="wrapper">
      <div class="com-container">
        <div class="chart-container">
          <BaseBar :data="data" :config="config" />
        </div>
        <div class="options">

          <div class="title-con">
            <h3>标题</h3>
            <form action="#">
              主标题: <input v-model="data.title.text"/>
              副标题: <input v-model="data.title.sub"/>
              选中颜色: <input v-model="config.activeColor"> 
            </form>
          </div>

        </div>
      </div>
      <div class="time-container">
        <div class="start time">{{ formatTime(state.startTime) }}</div>
        <input class="time-com" type="range" ref="completed" :min="0" :max="100" v-model="state.completedNum"
          step="0.1" />
        <div class="end time">{{ formatTime(state.endTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import BaseBar from '@/components/bar/index.vue';
const completed = ref(); // 已完成

const state = reactive({
  completedNum: 0,
  startTime: 0,
  endTime: 36000
});

const formatTime = (time: number) => {
  let second = time / 1000; // 秒
  let minutes = 0; // 分钟
  if (second < 60) {
    let M = `${minutes}`.padEnd(2, '0');
    let S = `${Math.floor(second)}`.padEnd(2, '0');
    return `${M}:${S}`
  } else {

    let M = `${parseInt(`${second / 60}`)}`;
    if (+ M < 10) {
      M = M.padStart(2, '0')
    } else {
      M = M.padEnd(2, '0')
    }
    let S = `${Math.floor((second / 60 - (+M)) * 60)}`;
    if (+S < 10) {
      S = S.padStart(2, '0')
    } else {
      S = S.padEnd(2, '0')
    }
    return `${M}:${S}`
  }
};

const config = reactive({
  color: '#ddd',
  activeColor: '#52AC0B',
});

const data = reactive({
  title: {
    text: '主标题',
    sub: '鼠标移入柱图后会变色'
  },

  x: {
    data: ["2019", "2020", "2021", "2022"],
    unitConfig: {
      unit: '年',
      location: 'after'
    }
  },
  y: {
  },
  series: {
    data: [100, 200, 100, 200]
  }
});


watch(state, () => {
  state.startTime = state.completedNum * (state.endTime / 100);
}, { deep: true });


// watch(data, () => {
//   console.log(data)
//   // state.startTime = state.completedNum * (state.endTime / 100);
// }, { deep: true });

</script>

<style lang="scss" scoped>
@import "@/assets/app.scss";
</style>