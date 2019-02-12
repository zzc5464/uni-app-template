<template>
  <view class="father">

    <view class="son" v-if="text" @click="onClick()">{{text}}</view>
  </view>
</template>

<script>
    export default {
        props: {
            text: { //标签类型default、primary、success、warning、danger、royal
                type: String,
                default: 'demo 组件'
            }
        },
        methods: {
            onClick() {
                this.$emit('click')
            }
        }
    }
</script>
<style lang="less" scoped>
  .father {
    background-color: #ccc;
    .son {
      font-size: 750*16/375upx;

    }
  }
</style>

