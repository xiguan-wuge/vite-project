import { log } from 'console';
import {nextTick} from 'vue'


export class WMOptions {
  constructor(init?: WMOptions) {
    if (init) {
      Object.assign(this, init);
    }
  }

  textArr: Array<string> = ['test', '自定义水印']; // 需要展示的文字，多行就多个元素【必填】
  font?: string = '16px "微软雅黑"'; // 字体样式
  fillStyle?: string = 'rgba(170,170,170,0.4)'; // 描边样式
  maxWidth?: number = 200; // 文字水平时最大宽度
  minWidth?: number = 120; // 文字水平时最小宽度
  lineHeight?: number = 24; // 文字行高
  deg?: number = -45; // 旋转的角度 0至-90之间
  // marginRight?: number = 120; // 每个水印的右间隔
  // marginBottom?: number = 40; // 每个水印的下间隔
  marginRight?: number = 0; // 每个水印的右间隔
  marginBottom?: number = 0; // 每个水印的下间隔
  left?: number = 20; // 整体背景距左边的距离
  top?: number = 20; // 整体背景距上边的距离
  opacity?: string = '.75'; // 文字透明度
  // position?: 'fixed' | 'absolute' = 'fixed'; // 容器定位方式（值为absolute时，需要指定一个父元素非static定位）
  position?: string = 'absolute'; // 容器定位方式（值为absolute时，需要指定一个父元素非static定位）
}

// 创建canvas标签
export function createCanvas() {
  const c = document.createElement('canvas');
  c.style.display = 'none';
  // document.body.appendChild(c);// 无需添加
  return c;
}

// 绘制文本
export function draw(c: any, settings: WMOptions,) {
  const ctx = c.getContext('2d');
  // 切割超过最大宽度的文本并获取最大宽度
  const textArr = settings.textArr || []; // 水印文本数组
  let wordBreakTextArr: Array<any> = [];
  const maxWidthArr: Array<number> = [];
  // 遍历水印文本数组，判断每个元素的长度
  textArr.forEach((text:string) => {
    const result = breakLinesForCanvas(ctx,text + '',settings.maxWidth!,settings.font!);
    console.log('result',result);
    
    // 合并超出最大宽度的分割数组
    wordBreakTextArr = wordBreakTextArr.concat(result.textArr);
    // 最大宽度
    maxWidthArr.push(result.maxWidth);
  });
  console.log('wordBreakTextArr', wordBreakTextArr);
  console.log('maxWidthArr', maxWidthArr);
  
  
  // 最大宽度排序，最后取最大的最大宽度maxWidthArr[0]
  maxWidthArr.sort((a, b) => {
    return b - a;
  });

  // 根据需要切割结果，动态改变canvas的宽和高
  const maxWidth = Math.max(maxWidthArr[0], defaultSettings.minWidth!);
  const lineHeight = settings.lineHeight!;
  const height = wordBreakTextArr.length * lineHeight;
  const degToPI = (Math.PI * settings.deg!) / 180;
  const absDeg = Math.abs(degToPI);
  // 根据旋转后的矩形计算最小画布的宽高
  const hSinDeg = height * Math.sin(absDeg);
  const hCosDeg = height * Math.cos(absDeg);
  const wSinDeg = maxWidth * Math.sin(absDeg);
  const wCosDeg = maxWidth * Math.cos(absDeg);

  c.width = parseInt(hSinDeg + wCosDeg + settings.marginRight! + '', 10);
  c.height = parseInt(wSinDeg + hCosDeg + settings.marginBottom! + '', 10);

  // 宽高重置后，样式也需重置
  ctx.font = settings.font;
  ctx.fillStyle = settings.fillStyle;
  ctx.textBaseline = 'hanging'; // 默认是alphabetic,需改基准线为贴着线的方式

  // 移动并旋转画布
  ctx.translate(0, wSinDeg);
  ctx.rotate(degToPI);

  // 绘制文本
  wordBreakTextArr.forEach((text, index) => {
    ctx.fillText(text, 0, lineHeight * index);
  });
}

// 根据最大宽度切割文字
function breakLinesForCanvas(context: any,text: string,width: number,font: string) {
  const result = [];
  let maxWidth = 0;

  if (font) {
    context.font = font;
  }
  // 查找切割点
  let breakPoint = findBreakPoint(text, width, context);
  while (breakPoint !== -1) {
    // 切割点前的元素入栈
    result.push(text.substring(0, breakPoint));
    // 切割点后的元素
    text = text.substring(breakPoint);
    maxWidth = width;
    // 查找切割点后的元素是否还有切割点
    breakPoint = findBreakPoint(text, width, context);
  }
  // 如果切割的最后文本还有文本就push
  if (text) {
    result.push(text);
    const lastTextWidth = context.measureText(text).width;
    maxWidth = maxWidth !== 0 ? maxWidth : lastTextWidth;
  }

  return {
    textArr: result,
    maxWidth: maxWidth,
  };
}

// 寻找切换断点
function findBreakPoint(text: string, width: number, context: any) {
  let min = 0;
  let max = text.length - 1;
  while (min <= max) {
    // 二分字符串中点
    const middle = Math.floor((min + max) / 2);
    // measureText()方法是基于当前字型来计算字符串宽度的
    const middleWidth = context.measureText(text.substring(0, middle)).width;
    const oneCharWiderThanMiddleWidth = context.measureText(
      text.substring(0, middle + 1)
    ).width;
    // 判断当前文本切割是否超了的临界点
    if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
      return middle;
    }
    // 如果没超继续遍历查找
    if (middleWidth < width) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }
  return -1;
}

let observerTemp:any = null // 标识当前监听器
function disablePatchWaterMask(el: HTMLElement) {
  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
  };
  /* MutationObserver 是一个可以监听DOM结构变化的接口。 */
  const MutationObserver =
    window.MutationObserver;
  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList: any, observer: any) {
    console.log('mutationsList', mutationsList);
    for (let mutation of mutationsList) {
      let type = mutation.type;
      switch (type) {
        case 'childList':
          if (mutation.removedNodes.length > 0) {
            // 删除节点，直接从删除的节点数组中添加回来
            mutation.target.append(mutation.removedNodes[0]);
          }
          break;
        case 'attributes':
          // 为什么是这样处理，我们看一下下面两幅图
          mutation.target.setAttribute('style', mutation.target.oldValue);
          break;
        default:
          break;
      }
    }
  };
  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback);
  // 以上述配置开始观察目标节点

  observer.observe(el, config);
  observerTemp = observer;
}

let defaultSettings = new WMOptions();

const waterMask = function (element: HTMLElement, binding: any) {
  console.log('waterMask', binding.value);
  
  // 合并默认值和传参配置
  defaultSettings = Object.assign({}, defaultSettings, binding.value || {});
  console.log('defaultSettings', defaultSettings);
  
  // 重置最小宽度
  defaultSettings.minWidth = Math.min(
    defaultSettings.maxWidth!,
    defaultSettings.minWidth!
  ); 
  const textArr = defaultSettings.textArr;
  if (!Array.isArray(textArr)) {
    throw Error('水印文本必须放在数组中！');
  }
  const c = createCanvas(); // 动态创建隐藏的canvas
  draw(c, defaultSettings); // 绘制文本
  convertCanvasToImage(c, element); // 转化图像
};

// 将绘制好的canvas转成图片
function convertCanvasToImage(canvas: any, el: HTMLElement) {
  // 判断是否为空渲染器
  if (!el) {
    console.error('请绑定渲染容器');
  } else {
    const { parentElement } = el;
    console.log('el', el, parentElement);
    const {width, height} = el.getBoundingClientRect()
    console.log('w', el.clientWidth, el.clientHeight)


    // 创建 waterMark 父元素
    const waterMark = document.createElement("div");
    el.setAttribute("style", "position: relative;");
    // el.classList.add('water-mask')
    const imgData = canvas.toDataURL('image/png');
    console.log('imgData', imgData);
    
    console.log('defaultSettings', defaultSettings);
    const cssTest = `
    width: ${el.clientWidth}px;
    height: ${el.clientHeight}px;
    position: ${defaultSettings.position}; 
    left:0; 
    top:0; 
    right:0; 
    bottom:0; 
    pointer-events:none;opacity:${defaultSettings.opacity};
    background-image: url('${imgData}');
    background-repeat: repeat;
    background-position: ${defaultSettings.left}px ${defaultSettings.top}px;
    `
    waterMark.style.cssText = cssTest

    // 将对应图片的父容器作为定位元素
    parentElement.setAttribute("style", "position: relative;");
    // 将图片元素移动到 waterMark 中
    parentElement.appendChild(waterMark);
  }
}


const WaterMask = {
  // el为当前元素
  // bind是当前绑定的属性，注意地，由于是vue3实现，这个值是一个ref类型
  beforeMount(el: HTMLElement, binding: any) {
    // 实现水印的核心方法
    // waterMask(el, binding, );
  },
  mounted(el: HTMLElement, binding: any) {
    waterMask(el, binding);

    nextTick(() => {
      // 禁止修改水印
      // disablePatchWaterMask(el);
    });
  },
  beforeUnmount() {
    // 清除监听DOM节点的监听器
    if (observerTemp) {
      observerTemp.disconnect();
      observerTemp = null;
    }
  },
};
export default WaterMask;
