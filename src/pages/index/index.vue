<template>
	<view class="content">
        <image class="logo" src="../../static/logo.png"></image>
		<Demo text='这是demo组件' />
		<view>
            <button class="mini-btn" type="warn" size="mini" @click="toAbout">动态路由</button>
        </view>
		<navigator url="/pages/about/index?params=1" hover-class="navigator-hover">
			<button type="default">跳转到新页面</button>
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
		},
		methods: {
			toAbout() {
				uni.navigateTo({
					url: '/pages/about/index?params=1'
				});
			},
			async getAPI() {
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

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
