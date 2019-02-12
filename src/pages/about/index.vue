<template>
  <div>
    About
  </div>
</template>
<script>
export default {
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
      console.log(option); //打印出上个页面传递的参数。
  }
}
</script>
