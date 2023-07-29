<template>
  <div class="container">
    <!-- <van-button type="primary" >vant button</van-button> -->
    <!-- <var-button type="primary">主要按钮</var-button> -->
    <div class="img-wraper">
      <img
        v-water-mask:options="wmOption"
        src="https://img2.woyaogexing.com/2023/03/12/d3fb4d961ea7f01e70b345f88e919050.jpg"
        alt=""
      />
    </div>
    <hr />
    <div class="img-wraper">
      <img
        v-water-mask2="'张三hhhhhhhhh'"
        src="https://img2.woyaogexing.com/2023/03/12/d3fb4d961ea7f01e70b345f88e919050.jpg"
        alt=""
      />
    </div>
    <div>
      <img
        class="demo2"
        src="https://img2.woyaogexing.com/2023/03/12/d3fb4d961ea7f01e70b345f88e919050.jpg"
        alt=""
      />
    </div>
    <div class="demo2"></div>
  </div>
</template>

<script lang="ts" setup>
import vWaterMask from "./index";
import { directives as vWaterMask2 } from "./waterMaskDerective";
import { reactive } from "vue";

const wmOption = reactive({
  textArr: ["路灯下的光", `2023/04/14`, '展示额外的文本LOL哦咯'],
  deg: -35,
});
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: pink;
  position: absolute;
  z-index: 10;
}
.img-wraper {
  position: absolute;
  z-index: 9;
  background-color: blue;
  width: 100%;
  min-height: 300px;
}
img {
  width: 100%;
  height: auto;
}
.demo2::after {
  content: "后缀";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  color: red;
  z-index: 30;
  width: 100%;
  height: 20px;
}
</style>
