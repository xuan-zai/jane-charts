<template>
  <div class="app-container">
    <el-container class="app-el-container">
      <el-aside width="200px">
        <MenuCom />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MenuCom from '@/views/menu/index.vue';
</script>

<style lang="scss" scoped>
@import "@/assets/app.scss";
</style>