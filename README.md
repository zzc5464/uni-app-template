# default-template

## Project Tree
```
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录，详见
├─platforms             存放各平台专用页面的目录，详见
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息
└─pages.json            配置页面路由、导航条、选项卡等页面类信息
    
```

## 基本使用
### 引用外部js
`import utils from '@/common/utils';`
### 引用外部less
样式tips: 
基准750*目标样式/设计稿尺寸
比如设计稿375,盒子大小200
`750*200/375upx`
```html
<style lang="less" scoped>
@import url(~@/common/less/common.less);
.content {
	text-align: center;
	image {
		width: 750*200/375upx;
	}
}
</style>
```
### 页面跳转
- a标签形式
```vue
<navigator url="/pages/about/index?params=1" hover-class="navigator-hover">
  <button type="default">跳转到新页面</button>
</navigator>
```
- 动态路由
```vue
<button class="mini-btn" type="warn" size="mini" @click="toAbout">动态路由</button>
toAbout() {
  uni.navigateTo({
    url: '/pages/about/index?params=1'
  });
},
```
