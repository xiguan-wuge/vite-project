<template>
  <div class="bullet">
    <div class="content">
      <div v-for="item in list" class="item">{{ item }}</div>
    </div>
  </div>
  <canvas
    id="canvas"
    width="300"
    height="200"
    class="canvas-wrapper"
  >
    您的浏览器不支持canvas标签。
  </canvas>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import {Barrage} from './ani.js'
const list = reactive([
  "akljdlkjdlka",
  "ask拉进来看大师决斗",
  "撒颗粒剂",
  "爱老敬老卡加斯东莨菪碱阿斯利康就打算立刻就搭上了肯德基阿斯利康大数据库拉德斯基爱上了",
]);

onMounted(() => {
  const barrage = new Barrage("canvas");
  barrage.draw();
  const textList = [
    "弹幕",
    "666",
    "233333333",
    "javascript",
    "html",
    "css",
    "前端框架",
    "Vue",
    "React",
    "Angular",
    "测试弹幕效果",
  ];

  textList.forEach((t) => {
    barrage.shoot(t);
  });
})



</script>
<style lang="less" scoped>
.bullet {
  width: 300px;
  height: 100px;
  background-color: lightblue;
  // overflow: scroll;
  padding: 10px;
}
.content {
  padding-top: 100px;
}
.item {
  width: auto;
  max-width: 180px;
  white-space: wrap;
  margin-bottom: 20px;
  text-align: left;
  &:nth-of-type(2n) {
    margin-left: 100px;
    text-align: right;
  }
}
.canvas-wrapper {
  background-color: pink;
}
</style>
