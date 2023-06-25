# jane-charts

一个使用 vue3 + ts + vite + echarts 编写的 echarts 示例库，暂时只包含展示功能，后续会进行完善图例编辑功能和预览功能。

## 项目进度
- 2023/6/25：
  1. `优化展示页面的 ui`
  2. `新增了折线图示例，并且对柱状图的配置进一步的优化和完善`
  3. `新增了兼容功能，若是没有传递 x 也没有 y 的话，默认 x.type = category，data 的内容会自动从 series.data 中获取`


## 预览

- 克隆本项目
  ```
    git clone git@github.com:xuan-zai/jane-charts.git
  ```
  
- 运行本项目
  ```
    npm run dev
  ```