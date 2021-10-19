<template>
  <div id="app">
    <div id="nav">
     <!--  <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'SystemApp',
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
    watch: {
   /*  "$route.path": {
      handler(val) {
        console.log(val)
    },
          immediate: true
    } */
    }
};
</script>

<style lang="less">
.el-table th,.el-table td{
  text-align: center !important;
  vertical-align: middle !important;
}
@import './css/commons.css';
@import './css/normalize.css';
@import './css/reset.css';
body,html,#app{
  height: 100%;
  background-color: #fff;
}
::-webkit-scrollbar {
  display: none; 
}
.ly-page{
  margin-top: 20px;
  text-align: center;
}
</style>
