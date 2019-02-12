<template>
  <view class="content">
    <button :loading="login" type="primary" open-type="getUserInfo" @getuserinfo="getInfo">登陆授权</button>
    <button type="default" open-type="feedback">反馈</button>
  </view>
</template>
<script>
export default {
  data() {
    return {
      login: false
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
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  height: 100%;
  flex-flow: column nowrap;
}
</style>
