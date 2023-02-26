# 虚拟列表的实现

## 核心思路
- 一次性请求所有数据，页面主要渲染视图区数据
- 试图区计算可显示的数据条数
- 从所有数据中，截取对应的数据，在视图上渲染展示。
- 触发条件 scrollEl.scrollTop变化，触发重新计算start end, list = data.slice(start, end)