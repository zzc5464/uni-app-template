<template>

	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<Demo text='这是demo组件' />
		<view>
			<button class="mini-btn" type="warn" size="mini" @click="toAbout">动态路由</button>
		</view>
		<navigator url="/pages/master/list?params=1" hover-class="navigator-hover">
			<button type="default">跳转到新页面</button>
		</navigator>
		<navigator url="/pages/about/index?params=1" open-type="switchTab" hover-class="navigator-hover">
			<button type="default">切换到about</button>
		</navigator>
		<button class="mini-btn" type="warn" size="mini" @click="getAPI">请求数据</button>
	</view>
</template>

<script>
import utils from '@/common/utils';
import Demo from '@/components/Demo.vue';
import {TEST} from '@/api';
	export default {
		data() {
			return {
				title: '默认模板'
			}
		},
		onLoad() {
			if(!this.$store.state.userInfo) {
				this.$store.dispatch('getProvider').then(res => {
					this.$store.dispatch('getUserInfo').then(_ => {
					})
				})
				return
			}
			console.log(this.$store.state);

			
		},
		methods: {
			toAbout() {
				uni.switchTab({
					url: '/pages/about/index?params=1'
				});
			},
			async getAPI() {
				console.log(this.$store.state);
				
				const data = await TEST({
					id: 1
				})
				console.log('请求数据',data);
				
			}
		},
		components: {
			Demo
		}
	}
</script>
<style lang="scss" scoped>
// @import url(~@/common/less/common.less);
// scss 转换函数
@function C($n) { 
  @return 750/375*$n; 
}

.content {
	text-align: center;
	image {
		width: C(200upx);
	}
}
</style>
