# github工作流部署记录

## 部署后访问路径
[我的静态网页](https://xiguan-wuge.github.io/vite-project/#/)


## 踩坑记录
1. 部署后，页面访问显示 404  

经排查后原因：   
github配置中，选择的分支和main.yml的不一致，  

检查路径：
‘githu-repo/settings/’, 在该页面中查看“Build and deployment”部分中当前启用的branch分支是否和main.yml 中的 分支对应