<template>
  <div class="bullet" id="bullet">
    <!-- 弹幕循环 -->
    <div class="content" id="content" :style="{marginTop: marginTop+'px'}">
      <div class="item" v-for="item in showList" :key="item.text">
        <span class="item-inner" :class="[item.enter? 'bullet-scale': '']">{{item.text}}</span>
      </div>
    </div>
  </div>
  <p>less loop 实现弹幕</p>
  <div class="bullet">
    <div class="content content-less">
      <div class="item" v-for="(item, index) in 100" :key="index">
        <!-- <span class="item-inner">{{item.text}}</span> -->
        <span class="item-inner" :style="{animation: 'bullet 2.3s linear ' + Number(index+0.5) + 's infinite'}">
          {{index+0.5}}-{{item}}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref, onMounted, onBeforeUnmount, reactive} from 'vue'
import {pxToVw} from '@/utils/index.ts'

const bulletList = [
  '1adkajlj安利大家来看',
  '2aasdsadasadd222',
  '3啊哈侃大山打卡机水电卡收到货撒可兑换萨卡大卡司33',
  '4cccccccccccccccc44',
  '5啊啊啊',
  '666666迹卡得很',
  '7777777777777按客户可结案的痕迹卡得很',
  '7777777777777按客户可结案dadasd的痕迹卡得很',
  '888按客户可结案的痕迹卡得很',
  '9999按客户可结案的痕迹卡得很',
  '10按客户可结案的dadsadsa痕迹卡得很',
  '11按客户可结案的jklaj的点点滴滴多多多多多多多dlkajldkaj 痕迹卡得很',
  '12按客户可结dsadsa案的痕迹卡得很',
  '13按客户可结案的痕迹卡得很',
  '14按客户可结sdsadasdas发送方三房案的痕迹卡得很',
  '15按客户可结案的痕迹卡得很',
  '16按客户可结案的痕迹卡得很',
  '17按客户可打撒所大撒大所大所结案的痕迹卡得很',
  '18按客户可是多少大结案的痕迹卡得很',
  '19按客户可结案的痕迹卡得很',
  '20按客户可结顶顶顶顶案的痕迹卡得很',
]

const showList = ref([])
const showList2 = ref([
  {
    enter: false,
    text: '11111111111111111'
  },
  {
    enter: false,
    text: '22222222222222222'
  },
  {
    enter: false,
    text: '33333333333333333'
  },
  {
    enter: false,
    text: '4444444444444444'
  },
  {
    enter: false,
    text: '555555555555555555555555'
  },
  {
    enter: false,
    text: '6666666666666666666'
  },
  {
    enter: false,
    text: '77777777777777777777'
  },
  {
    enter: false,
    text: '8888888888888888888888'
  },
  {
    enter: false,
    text: '999999999999999999999999'
  },
  {
    enter: false,
    text: '101010101010000'
  },
  {
    enter: false,
    text: '111111111111111111111'
  },
  {
    enter: false,
    text: '12121212121212121212'
  },
])
console.log('showList', showList)
const marginTop = ref(530)
console.log('marginTop', marginTop)

const tempObj = reactive({
  name: 'tempObj'
})
console.log('tempObj', tempObj)
function setBulletLoop() {

}

// 设置弹幕
showList.value = bulletList.map(item => {
  return {
    enter: false,
    text: item
  }
})

let IO = {}
let bulletTimer = null
onMounted(() => {
  console.log('200vw', pxToVw(200))
  // return

  const bulletEl = document.querySelector('#bullet')
  const bulletElHeight = bulletEl.clientHeight
  const contentEl = document.querySelector('#content')
  const contentElHeight = contentEl.clientHeight
  // console.log('contentElHeight', contentElHeight);
  
  marginTop.value = bulletElHeight


  // let currentIndex = 0
  // const listLen = 3
  // const initListLen = bulletList.length
  // function getList() {
  //   if(currentIndex + listLen <= initListLen) {
  //     showList.value = bulletList.slice(currentIndex, currentIndex+listLen)
  //     currentIndex += listLen
  //   } else {
  //     const oldItemLen = initListLen - currentIndex
  //   }
  // }


  function addAnimation(key, isShow) {
    for(let i = 0, len = showList.value.length; i < len; i++) {
      const item = showList.value[i]
      if(item.text === key) {
        item.enter = isShow
        break;
      }
    }
  }
  IO = new IntersectionObserver(
    (entries) => {
      // console.log('entries', entries)
      entries.forEach((item, index) => {
        // console.log(index, item);
        const key = item.target.__vnode.key
        // console.log('key', key);
        addAnimation(key, item.isIntersecting)
      })
    }, {
      root: bulletEl,
      // rootMargin: "-10px",
      // threshold: [0, 0.25, 0.5, 0.75, 1],
      threshold: [0.75]
    })
  for(let i = 0, len = contentEl.children.length; i < len; i++) {
    const item = contentEl.children[i]
    IO.observe(item)
  }

  const minMarginTop = -(contentElHeight)
  function fn() {
    if(marginTop.value >=minMarginTop) {
      // console.log('-');
      marginTop.value -= 2
      if(bulletTimer) clearTimeout(bulletTimer)
      bulletTimer = setTimeout(fn, 30)
    } else {
      // console.log('else');
      marginTop.value = bulletElHeight
      fn()
    }
  }
  window.requestAnimationFrame(fn)
})
onBeforeUnmount(() => {
  // 销毁弹幕 定时器 和 交叉卡监控实例
  if(bulletTimer) {
    clearTimeout(bulletTimer)
    bulletTimer = null
  }
  if(IO && typeof IO.disconnect === 'function') {
    IO.disconnect()
  }
})
</script>
<style lang="less" scoped>

@bulletLength: 5;

.bullet {
  width: 300px;
  height: 200px;
  background: pink;
  overflow: hidden;
}
.content {
  // margin-top: 550px;
  padding-bottom: 20px;
  // background: lightblue;
  // animation: upper 10s infinite;
  width: 300px;
}
.content-less {
  // animation: upper 24s linear infinite;
  animation: upper 200s linear infinite;
  padding-bottom: 200px;
  padding-top: 200px;
}
@keyframes upper {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
.item {
  width: 150px;
  margin-bottom: 40px;
  text-align: left;
  .item-inner {
    transform-origin: left bottom;
  }
  &:nth-of-type(2n) {
    margin-left: 150px;
    text-align: right;
    .item-inner {
      transform-origin: right bottom;
    }
  }
}
// .loop(@i) when(@i <= @bulletLength) {
//   // .item:nth-of-type(@i) {
//     .item-inner {
//       animation: 2.3s linear (@i - 0.5s) 1 bullet;
//     }
//   // }
//   .loop((@i+1));
// }
// .loop(1)
// .item:nth-of-type(1) {
//   .item-inner {
//     animation: 2.3s linear 0.5s infinite bullet;
//   }
// }
// .item:nth-of-type(2) {
//   .item-inner {
//     animation: 2.3s linear 1.5s infinite bullet;
//   }
// }
// .item:nth-of-type(3) {
//   .item-inner {
//     animation: 2.3s linear 2.5s infinite bullet;
//   }
// }
// .item:nth-of-type(4) {
//   .item-inner {
//     animation: 2.3s linear 3.5s infinite bullet;
//   }
// }
// .item:nth-of-type(5) {
//   .item-inner {
//     animation: 2.3s linear 4.5s infinite bullet;
//   }
// }
// .item:nth-of-type(6) {
//   .item-inner {
//     animation: 2.3s linear 5.5s infinite bullet;
//   }
// }
// .item:nth-of-type(7) {
//   .item-inner {
//     animation: 2.3s linear 6.5s infinite bullet;
//   }
// }
// .item:nth-of-type(8) {
//   .item-inner {
//     animation: 2.3s linear 7.5s infinite bullet;
//   }
// }
// .item:nth-of-type(9) {
//   .item-inner {
//     animation: 2.3s linear 8.5s infinite bullet;
//   }
// }
// .item:nth-of-type(10) {
//   .item-inner {
//     animation: 2.3s linear 9.5s infinite bullet;
//   }
// }
// .item:nth-of-type(11) {
//   .item-inner {
//     animation: 2.3s linear 10.5s infinite bullet;
//   }
// }
// .item:nth-of-type(12) {
//   .item-inner {
//     animation: 2.3s linear 11.5s infinite bullet;
//   }
// }

.item-inner {
  font-size: 14px;
  color: #303133;
  line-height: 18px;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2px 4px;
  width: auto;
  max-height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2
}
.bullet-scale {
  animation: 2.3s linear 0s 1 bullet;
}

@keyframes bullet {
  0% {
    transform: scale(1)
  }
  66% {
    opacity: 1;
    transform:scale(1.5, 1.2)
  }
  100% {
    opacity: 1;
    transform:scale(1)
  }
}
</style>