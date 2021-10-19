# vue-router详解

标签（空格分隔）： 未分类

---

## 1 前言
要学习vue-router就要先知道这里的路由是什么？为什么我们不能像原来一样直接用<a></a>标签编写链接哪？vue-router如何使用？常见路由操作有哪些？
## 2 vue-router是什么
这里的路由并不是指我们平时所说的硬件路由器，这里的路由就是SPA（单页应用）的路径管理器。再通俗的说，vue-router就是WebApp的链接路径管理系统。
vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。路由模块的本质 就是建立起url和页面之间的映射关系。
至于我们为啥不能用a标签，这是因为用Vue做的都是单页应用，就相当于只有一个主的index.html页面，所以你写的<a></a>标签是不起作用的，你必须使用vue-router来进行管理。
## 3 vue-router实现原理
SPA(single page application):单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面;vue-router在实现单页面前端路由时，提供了两种方式：Hash模式和History模式；根据mode参数来决定采用哪一种方式。

 - Hash模式：
 vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。 hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说 #是用来指导浏览器动作的，对服务器端完全无用，HTTP请求中也不会不包括#；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据
 - History模式：
 由于hash模式会在url中自带#，如果不想要很丑的 hash，我们可以用路由的 history 模式，只需要在配置路由规则时，加入"mode: 'history'",这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

        //main.js文件中
        const router = new VueRouter({
          mode: 'history',
          routes: [...]
        })
当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，比较好看！
不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。
所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

        export const routes = [ 
          {path: "/", name: "homeLink", component:Home}
          {path: "/register", name: "registerLink", component: Register},
          {path: "/login", name: "loginLink", component: Login},
          {path: "*", redirect: "/"}]
此处就设置如果URL输入错误或者是URL 匹配不到任何静态资源，就自动跳到到Home页面

 - 使用路由模块来实现页面跳转的方式
方式1：直接修改地址栏
方式2：this.$router.push(‘路由地址’)
方式3：<router-link to="路由地址"></router-link>
## 4 vue-router使用方式

    npm i vue-router
    在main.js中引入 import VueRouter from 'vue-router'
    Vue.use(VueRouter)
    // 创建路由对象并配置路由规则
    let router = new VueRouter({routes:[{path:'/home',component:Home}]});
    // 将其路由对象传递给Vue的实例，
    options中加入 router:router
    // app.vue
    <router-view></router-view>
具体实现请看如下代码：

    //main.js文件中引入
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    //主体
    import App from './components/app.vue';
    import Home from './components/home.vue'
    //安装插件
    Vue.use(VueRouter); //挂载属性
    //创建路由对象并配置路由规则
    let router = new VueRouter({
        routes: [
            //一个个对象
            { path: '/home', component: Home }
        ]
    });
    //new Vue 启动
    new Vue({
        el: '#app',
        //让vue知道我们的路由规则
        router: router, //可以简写router
        render: c => c(App),
    })
    //app.vue中
    <template>
        <div>
            <!-- 留坑，非常重要 -->
            <router-view></router-view>
        </div>
    </template>
    <script>
        export default {
            data(){
                return {}
            }
        }
    </script>
## 5 vue-router跳转以及穿参
params传参
$route.params 类型: Object。
一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象

    this.$router.push({ name: 'news', params: { type: 1 }})
此时浏览器url上是看不到任何参数的，像这样http://localhost:9530/news
另外需要注意的是，params传参时如果刷新页面，参数是会丢失的
通过路由的名字的传参的话，必须使用路由对象的属性params。
query传参
route.query*** 类型: Object 一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有route.query.user == 1，如果没有查询参数，则是个空对象。

    const type = 1
    this.$router.push({ path: 'news', query: { type: type  }})
此时浏览器url上是可以看得到参数的，像这样http://localhost:9530/news/?type=1
通过query传的参数在页面刷新时不会丢失。
## 6 路由的嵌套

    const routes = [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children:[
          {path:'/about/phone',name:'phoneNumber',component:Phone},
        ]
      }
    ]











