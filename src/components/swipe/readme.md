## swipe item 实现无需额外在头尾添加节点，实现无缝轮播

## 关键
前置知识 index： 1~4, itemWidth: 400
1. 当切换到边界值时，如4 -> 1, wrapper transfromX: -4 * 400 px， item[1] translateX: 4*400px 实现item[1] 紧跟在 item4的效果
2. 当步骤1后，下一步应该是tranformX: - 1*400px ; 为了实现无缝轮播，需要现有个wrapper  translateX:0px的效果。为了实现无缝，将translateX: 0; 作为同步操作；其余正常的切换 放置到requestAnimationFrame 中，作为异步操作，以实现一个next中，实现两步操作且视觉过渡正常

# 思考：
- 为什么 4 -> 1的时候，item1自身需要移动？  
  为了实现首尾衔接的过程

- 无需添加首尾item的实现方案比需要添加首位方案，好处在哪里？