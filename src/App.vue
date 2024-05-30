<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 导出的是当前组建的配置项
// 里面可以提供data（特殊） method computed watch生命周期八个钩子函数
export default {
  name: 'App'
}
</script>
