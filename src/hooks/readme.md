# vue3 自定义hooks

## vue3 为什么要自定义hooks
为了让composition api 更好用，更丰满！

## compoition api 的优点
- 摆脱无脑this的强耦合
- 功能逻辑集中

## 自定义hook

### 目标：高内聚、低耦合
- 以函数形式抽离一些可复用的功能逻辑，以便随时可以引入和调用，以便实现高内聚低耦合的目标

### 规范：
- 将可复用的功能抽离为外部的js\ts文件；
- 函数名/文件名以use开头，形如useXXX；
- 引用时将响应式变量或者方法显示解构暴露出来，如：const {nameRef, fn} = useXXX()


### 实例
- useAdd
- useSub

## vue3 自定义hook和vue2 mixin 的 区别
vue2 中， mixin 是 将部分逻辑抽离成可重用的重要工具，但有以下不足：
- mixin容易发生命名冲突；
- mixin 可重用性有限，不能向mixin传递参数，降低其灵活性

但vue3 自定义hook 却可以很好的弥补 mixin 的不足：
- mixin 难以追溯属性与方法，hook可以；
- mixin 无法接受参数来改变内部逻辑，hook可以
- mixin 重名变量会被覆盖，hook可以在引入的时候对变量进行重命名


tips:注意mixin的合并规则：声明周期、data数据、computed、watch、methods