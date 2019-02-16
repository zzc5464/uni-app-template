<template>
	<view>
		<view class='wrapper' :style="{'height':(height)+'px'}">
   <button @tap='shake'>假装摇一摇</button>
  <view class='shake-up-warp' :class="active">
    <view class='up-image'>
      <image src='../../static/mehaotian-shake/shake.png' mode='widthFix'></image>
    </view>
  </view>
  <view class='shake-down-warp ' :class="active">
    <view class='down-image'>
      <image src='../../static/mehaotian-shake/shake.png' mode='widthFix'></image>
    </view>
    <view class='card-wrapper '>
      <view v-if="isLoadding" class='loadding'>正在抽奖中,请稍等...</view>
      <view v-if="cardShow" class='card' :class="cardActive?'active':''">
        <view class='card-head'>
          <image class='head-box' src='../../static/mehaotian-shake/zhongjianhead.png' mode='widthFix'></image>
          <image class='head-image' :src='list.avatar' mode='aspectFill'></image>
        </view>
        <view class='card-content'>
          <view class='content-title'>{{list.name}}</view>
          <view class='content-job'>{{list.mobile}}</view>
        </view>
      </view>
    </view>
  </view>
  <view class='bottom'>
    <image src='../../static/mehaotian-shake/huahua.jpg' mode='widthFix'></image>
  </view>
 <view class='wrapper-bottom' @tap='winnerBtn'>
    <text>{{win_btn}}{{winnersArr.length!== 0 ?"("+winnersArr.length+")":""}}</text>
  </view>
  <!-- <audio style='position: absolute;top:0;left:0;' id="myAudio"></audio> -->
</view>
<view class='winner-wrapper ' :class="winShow?'active':''">
  <view class='card' v-for="(item , index) in winnersArr" :key="index">
    <view class='card-head'>
      <image class='head-box' src='../../static/mehaotian-shake/zhongjianhead.png' mode='widthFix'></image>
      <image class='head-image' :src='item.avatar' mode='aspectFill'></image>

    </view>
    <view class='card-content'>
      <view class='content-title'>{{item.name}}</view>
      <view class='content-job'>{{item.mobile}}</view>
    </view>
  </view>

</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			audioCtx: null, // 音频实例
			active: false, // 是否开启摇一摇
			isLoadding: false, // 是否显示loading提示
			cardShow: false, // 是否显示中奖卡片
			cardActive: false, // 显示卡片 进行动画
			win_btn: '还没有人中奖', // 底部bar 提示文字
			winShow: false, //  是否打开中奖曾
			isOpenWinPage: true,
			winnersArr: [], // 中奖者保存数组
			height: 0, // 显示区域高度
			list: {}, // 当前中奖者数据
			// 所有参与摇一摇抽奖的 数组信息
			drawArrId: [
				{
					id: 1,
					avatar: '../../static/mehaotian-shake/header.png',
					name: '张三1',
					mobile: '13717814851'
				},
				{
					id: 2,
					avatar: '../../static/mehaotian-shake/header.png',
					name: '张三2',
					mobile: '13717814852'
				},
				{
					id: 3,
					avatar: '../../static/mehaotian-shake/header.png',
					name: '张三3',
					mobile: '13717814853'
				},
				{
					id: 4,
					avatar: '../../static/mehaotian-shake/header.png',
					name: '张三4',
					mobile: '13717814854'
				}
			],
			// 一些全局变量
			global: {
				lastTime: 0, //此变量用来记录上次摇动的时间
				intervalTime: 500, // 两次摇一摇的间隔事件
				lastX: 0,
				lastY: 0,
				lastZ: 0, //此组变量分别记录对应x、y、z三轴的数值和上次的数值
				shakeSpeed: 150 //设置阈值
			}
		};
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// 设置显示区域高度
		this.height = uni.getSystemInfoSync().windowHeight;
		// 声明音频实例
		this.audioCtx = uni.createInnerAudioContext();
		
		/**
		 * 如果有真实接口数据，请在接口数据请求完毕之后，注册加速度事件
		 */
		
		// 监听摇一摇事件
		uni.onAccelerometerChange(this.starshake);
	},
	methods: {
		/**
		 * 手动模拟摇一摇 ， 在真实项目中无用，仅在模拟器测试使用
		 */
		shake() {
			// 监听到摇一摇 初始化音频数据，并开始播放
			this.audioCtx.src =
				'https://lg-fe2b58o2-1255788064.cos.ap-shanghai.myqcloud.com/shark.mp3';
			this.audioCtx.play();

			// 初始化显示 ，开始进行摇一摇
			this.active = 'open';
			this.cardShow = false;
			this.cardActive = false;
			this.isOpenWinPage = false;

			// 一秒后关闭摇一摇界面开始抽奖
			setTimeout(() => {
				uni.hideLoading();
				this.active = 'back';
				this.cardShow = true;
				this.$nextTick(() => {
					this.getLuckDraw();
				});
			}, 1000);
		},
		/**
		 * 监听摇一摇具体业务
		 * acceleration [object] 返回加速度相关信息
		 */
		starshake(acceleration) {
			let nowTime = new Date().getTime(); //记录当前时间
			let self = this;
			//如果这次摇的时间距离上次摇的时间有一定间隔 才执行
			if (nowTime - this.global.lastTime > 100) {
				let diffTime = nowTime - this.global.lastTime; //记录时间段
				this.global.lastTime = nowTime; // 记录本次摇动时间，为下次计算摇动时间做准备
				let x = acceleration.x; // 获取x轴数值，x轴为垂直于北轴，向东为正
				let y = acceleration.y; // 获取y轴数值，y轴向正北为正
				let z = acceleration.z; // 获取z轴数值，z轴垂直于地面，向上为正

				// 速度计算
				let speed =
					(Math.abs(
						x + y + z - self.global.lastX - self.global.lastY - self.global.lastZ
					) /
						diffTime) *
					10000;
				console.log(speed, this.global.shakeSpeed);
				//如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
				if (speed > this.global.shakeSpeed) {
					uni.stopAccelerometer();
					this.audioCtx.src =
						'https://lg-fe2b58o2-1255788064.cos.ap-shanghai.myqcloud.com/shark.mp3';
					this.audioCtx.play();
					// 初始化样式
					this.active = 'open';
					this.cardShow = false;
					this.cardActive = false;
					this.isOpenWinPage = false;
					this.winShow = false;
					this.win_btn = '中奖名单';
					// 关闭摇一摇 ，并开始抽奖
					setTimeout(() => {
						uni.hideLoading();
						this.active = 'back';
						this.cardShow = true;
						this.getLuckDraw();
					}, 1000);
				}
				//赋值，为下一次计算做准备
				this.global.lastX = x;
				this.global.lastY = y;
				this.global.lastZ = z;
			}
		},
		// 抽奖逻辑
		getLuckDraw() {
			let arr = this.drawArrId;
			// 抽取获奖者数据
			let draw = arr[Math.floor(Math.random() * arr.length + 1) - 1];

			if (!draw) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '不能继续，因为没有成员可以抽奖了'
				});
				this.isOpenWinPage = true;
				this.win_btn = '已经完成抽奖，中奖人数';
				// uni.startAccelerometer();
				return;
			}

			// 抽奖成功，显示等待提示
			this.isLoadding = true;
			// 将中奖者追加到 中奖者名单数组
			this.winnersArr.unshift({
				id: draw.id,
				avatar: draw.avatar,
				name: draw.name,
				mobile: draw.mobile
			});

			// 将原抽奖者中减去中奖者
			this.drawArrId.splice(this.drawArrId.indexOf(draw), 1);
			// 渲染中奖者
			this.list = draw;
			// 打开中奖者卡片限制
			this.cardShow = true;
			// 显示中奖者结果
			this.$nextTick(() => {
				setTimeout(() => {
					this.audioCtx.src =
						'https://lg-fe2b58o2-1255788064.cos.ap-shanghai.myqcloud.com/finish.mp3';
					this.audioCtx.play();
					// 关闭等待提示
					this.isLoadding = false;
					// 显示中奖者卡片
					this.cardActive = true;
					this.isOpenWinPage = true;
					this.$nextTick(() => {
						if (this.winnersArr.length > 0) {
							this.win_btn = '中奖名单';
						}
						uni.startAccelerometer();
					});
				}, 1000);
			});
		},
		/**
		 * 打开中奖名单
		 */
		winnerBtn() {
			let text = this.win_btn;
			if (text === '还没有人中奖') {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '请开始你的表演'
				});
				return;
			}

			if (text === '中奖名单' || text === '已经完成抽奖，中奖人数') {
				if (!this.isOpenWinPage) {
					return;
				}

				if (this.winnersArr.length === 0) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '还没有人中奖呢'
					});
					return;
				}

				this.winShow = true;
				this.win_btn = '收起';
			} else {
				this.winShow = false;
				this.win_btn = '中奖名单';
			}
		}
	}
};
</script>

<style>
/* pages/shake/sha ke.wxss */

.wrapper {
	width: 100%;
	height: 100vh;
	position: relative;
	box-sizing: border-box;
}

.shake-up-warp,
.shake-down-warp {
	position: relative;
	width: 100%;
	height: 50%;
	background: #2e3132;
}

.shake-up-warp {
	height: 40%;
}

.shake-down-warp {
	display: flex;
	flex-direction: column;
	height: 60%;
}

.up-image,
.down-image {
	position: absolute;
	left: 0;
	right: 0;
	margin: auto;
	width: 300upx;
	height: 150upx;
	overflow: hidden;
}

.up-image {
	bottom: 0;
}

.down-image {
	top: 0;
}

.up-image image,
.down-image image {
	position: absolute;
	left: 0;
	width: 100%;
	height: 100%;
}

.up-image image {
	top: 0;
}

.down-image image {
	bottom: 0;
}

/* 开启动画  */

.shake-up-warp.open {
	animation: openUp 0.3s;
	transform: translateY(-40%);
}

.shake-up-warp.open::after {
	position: absolute;
	bottom: -1px;
	content: '';
	width: 100%;
	height: 15upx;
	background: #474a53;
	box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.5) inset,
		0 -1px 0 0 rgba(0, 0, 0, 0.1) inset, 0 -1px 1px rgba(0, 0, 0, 1),
		0 2px 5px rgba(0, 0, 0, 0.5);
}

@keyframes openUp {
	from {
		transform: translateY(0%);
	}

	to {
		transform: translateY(-40%);
	}
}

.shake-down-warp.open {
	animation: openDown 0.3s;
	transform: translateY(40%);
}

.shake-down-warp.open::after {
	position: absolute;
	top: -1px;
	content: '';
	width: 100%;
	height: 15upx;
	background: #474a53;
	box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.5) inset,
		0 1px 0 0 rgba(0, 0, 0, 0.1) inset, 0 1px 1px 0 rgba(0, 0, 0, 1),
		0 -2px 5px rgba(0, 0, 0, 0.5);
}

@keyframes openDown {
	from {
		transform: translateY(0%);
	}

	to {
		transform: translateY(40%);
	}
}

/*关闭动画  */

.shake-up-warp.back {
	animation: backUp 0.3s;
	transform: translateY(0%);
}

.shake-up-warp.back::after {
	position: absolute;
	bottom: 0;
	content: '';
	width: 100%;
	height: 0;
	animation: backUpAfter 0.3s;
}

@keyframes backUp {
	from {
		transform: translateY(-40%);
	}

	to {
		transform: translateY(0%);
	}
}

/* 伪类操作  */

@keyframes backUpAfter {
	0% {
		height: 15upx;
		background: #474a53;
		box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.5) inset,
			0 -1px 0 0 rgba(0, 0, 0, 0.1) inset, 0 -1px 1px rgba(0, 0, 0, 1),
			0 2px 5px rgba(0, 0, 0, 0.5);
	}

	90% {
		height: 15upx;
		background: #474a53;
		box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.5) inset,
			0 -1px 0 0 rgba(0, 0, 0, 0.1) inset, 0 -1px 1px rgba(0, 0, 0, 1),
			0 2px 5px rgba(0, 0, 0, 0.5);
	}

	100% {
		height: 0;
	}
}

.shake-down-warp.back {
	animation: backDown 0.3s;
	transform: translateY(0%);
}

.shake-down-warp.back::after {
	position: absolute;
	top: 0;
	content: '';
	width: 100%;
	height: 0upx;
	animation: backDownAfter 0.3s;
}

@keyframes backDown {
	from {
		transform: translateY(40%);
	}

	to {
		transform: translateY(0%);
	}
}

/* 伪类操作  */

@keyframes backDownAfter {
	0% {
		height: 15upx;
		background: #474a53;
		box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.5) inset,
			0 1px 0 0 rgba(0, 0, 0, 0.1) inset, 0 1px 1px 0 rgba(0, 0, 0, 1),
			0 -2px 5px rgba(0, 0, 0, 0.5);
	}

	90% {
		height: 15upx;
		background: #474a53;
		box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.5) inset,
			0 1px 0 0 rgba(0, 0, 0, 0.1) inset, 0 1px 1px 0 rgba(0, 0, 0, 1),
			0 -2px 5px rgba(0, 0, 0, 0.5);
	}

	100% {
		height: 0;
	}
}

button {
	position: absolute;
	top: 0;
	z-index: 999;
}

.bottom {
	display: flex;
	margin-top: -15%;
	align-items: center;
	position: absolute;
	z-index: -1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: #282e2c;
}

.bottom image {
	width: 100%;
}

.card-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	text-align: center;
	color: #fff;
	font-size: 28upx;
	padding: 50upx;
	padding-top: 150upx;
	overflow: hidden;
}

.loadding {
	margin-top: 80upx;
}

.card {
	display: flex;
	align-items: center;
	width: 100%;
	border-radius: 10upx;
	box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.1) inset, 0 0 2px 1px rgba(0, 0, 0, 0.2);
	margin-top: 100upx;
	background: #373b3a;
	padding: 15upx;
	box-sizing: border-box;
	transition: transform 0.3s;
	transform: translateY(-400%);
	opacity: 0;
}

.card.active {
	opacity: 1;
	transform: translateY(0);
}

.card-head {
	position: relative;
	flex-shrink: 0;
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
	/* overflow: hidden; */
	background: #e2e2e2;
}

.card-head .head-box {
	position: absolute;
	top: -21upx;
	left: -22upx;
	width: 150upx;
}

.head-image {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.card-content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100upx;
	box-sizing: border-box;
	text-align: left;
	padding: 5upx 0;
	padding-left: 40upx;
	overflow: hidden;
}

.content-title {
	font-size: 40upx;
	color: #999;
	line-height: 1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.content-job {
	font-size: 32upx;
	color: #999;
	line-height: 1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.jiang {
	flex-shrink: 0;
	width: 100upx;
	height: 100upx;
}

.wrapper-bottom {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	background: #111;
	/* padding-left: 30upx; */
	text-align: center;
	color: #fff;
	font-size: 30upx;
	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	z-index: 1000;
}

/*中奖名单  */

.winner-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 999;
	background: rgba(0, 0, 0, 0.7);
	box-sizing: border-box;
	padding: 0 30upx;
	transition: all 0.3s;
	opacity: 0;
	transform: translateY(100%);
	overflow-y: scroll;
	padding-bottom: 100upx;
}

.winner-wrapper .card {
	margin: 30upx 0;
	opacity: 1;
	transform: translateY(0);
	background: #f5f5f5;
	color: #333;
}
.winner-wrapper .content-title {
	color: #222;
}

.winner-wrapper .content-job {
	color: #666;
}

.winner-wrapper.active {
	opacity: 1;
	transform: translateY(0);
}
</style>
