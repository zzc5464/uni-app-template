<template>
  <view class="content">
    <button type="primary" open-type="getUserInfo" @getuserinfo="getInfo">登陆授权</button>
    <button type="default" open-type="feedback">反馈</button>
    <button type="default" open-type="contact" show-message-card session-from="base">客服</button>
  </view>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  onLoad() {
    const { userInfo } = this.$store.state;
    this.$store.dispatch("getProvider").then(provider => {
      if (provider !== "weixin") {
        uni.reLaunch({
          url: "/pages/index/index"
        });
      }
    });
  },
  methods: {
    getInfo(info) {
      const { userInfo } = info.detail;
      if (userInfo) {
        this.$store.commit("setUserInfo", userInfo);
        this.toIndex()
      }
    },
    toIndex() {
      uni.reLaunch({
        url: "/pages/index/index"
      });
    },
    handlePhone(phone) {
      console.log(phone);
      
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  flex-flow: column nowrap;
  padding-top: 40vh;
  button {
    margin-top: 5vh;
  }
}
</style>
