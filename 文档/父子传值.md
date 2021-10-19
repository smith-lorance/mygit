# 1 node安装

标签（空格分隔）： 未分类

---

 - 1 从https://nodejs.org/en/下载安装包  然后点击next， 注意node安装的时候默认是添加在环境变量中的
 ![此处输入图片的描述][1]


 - 安装完成后按win+r输入cmd进入终端 输入node -v 如果出现版本号则说明安装成功
 - 输入npm -v 如果出现版本号则说明安装成功
 - 如果出现不是内部命令的提示则需要将node的安装目录添加的本季的环境变量中， 具体操作步骤如下
 a 右键“我的电脑”-属性-高级系统设置-高级-环境变量
 b 然后将node的安装路添加到path中即可
 - 配置一个镜像站，为了提升速度 输入命令npm install -g cnpm -registry=https://registry.npm.taobao.org
 配置镜像站  这样就可以用cnom代替npm了
 - 测试NPM安装vue.js 命令：npm install vue -g 这里的-g是指安装到全局目录去
 - 测试NPM安装vue-cli  命令：npm install vue-cli -g  然后输入 vue-cli -V 如果出现不是内部命令则需要将vue添加到环境变量下   如果出现版本号则说明安装成功
# 2 用vue-cli创建一个工程
 
 - 可以使用下列任一命令安装这个新 vue-cli 的包

         npm install -g @vue/cli
         
 - 用这个命令来检查其版本是否正确 (3.x)：

        vue -V

 - vue create my-project 这里注意⚠️自己切换到自己到目录下，新建项目，vue create 项目名

 - .会让你选择默认（default）还是手动（Manually）
按键盘上下键可以选择默认（default）还是手动（Manually），如果选择default，一路回车执行下去就行了这里一般选择手动

 - 选择配置，看个人项目需求
TypeScript 支持使用 TypeScript 书写源码
Progressive Web App (PWA) Support PWA 支持。
Router 支持 vue-router 。
Vuex 支持 vuex 。
CSS Pre-processors 支持 CSS 预处理器。
Linter / Formatter 支持代码风格检查和格式化。
Unit Testing 支持单元测试。
E2E Testing 支持 E2E 测试。
回车，询问我是否保存这次选的配置，我选的yes

 - 然后css的预处理，我选择的是stylus
 - 配置文件存放地方 第一个是独立文件夹位置，第二个是在package.json文件里 一般选择后者
 - 装好后，启动

        cd my-project // 进入到项目根目录
        npm run serve // 启动项目
# 3 Vue组建的通讯方式
## 1 props/$emit

父组件A通过props的方式向子组件B传递，B to A 通过在 B 组件中 $emit, A 组件中 v-on 的方式实现

### 1父组件向子组件传值

  在子组件Users.vue中如何获取父组件App.vue中的数据users:["Henry","Bucky","Emily"]
  

    //App.vue父组件
    <template>
      <div id="app">
        <users v-bind:users="users"></users>//前者自定义名称便于子组件调用，后者要传递数据名
      </div>
    </template>
    <script>
    import Users from "./components/Users"
    export default {
      name: 'App',
      data(){
        return{
          users:["Henry","Bucky","Emily"]
        }
      },
      components:{
        "users":Users
      }
    }
子组建

    //users子组件
    <template>
      <div class="hello">
        <ul>
          <li v-for="user in users">{{user}}</li>//遍历传递过来的值，然后呈现到页面
        </ul>
      </div>
    </template>
    <script>
    export default {
      name: 'HelloWorld',
      props:{
        users:{           //这个就是父组件中子标签自定义名字
          type:Array,
          default:[],
          required:true
        }
      }
    }
    </script>
总结：父组件通过props向下传递数据给子组件。注：组件中的数据共有三种形式：data、props、computed
### 2 子组件向父组件传值（通过事件形式）
当我们点击“Vue.js Demo”后，子组件向父组件传递值，文字由原来的“传递的是一个值”变成“子向父组件传值”，实现子组件向父组件值的传递。

    // 子组件
    <template>
      <header>
        <h1 @click="changeTitle">{{title}}</h1>//绑定一个点击事件
      </header>
    </template>
    <script>
    export default {
      name: 'app-header',
      data() {
        return {
          title:"Vue.js Demo"
        }
      },
      methods:{
        changeTitle() {
          this.$emit("titleChanged","子向父组件传值");//自定义事件  传递值“子向父组件传值”
        }
      }
    }
    </script>
父组件

    // 父组件
    <template>
      <div id="app">
        <app-header v-on:titleChanged="updateTitle" ></app-header>//与子组件titleChanged自定义事件保持一致
       // updateTitle($event)接受传递过来的文字
        <h2>{{title}}</h2>
      </div>
    </template>
    <script>
    import Header from "./components/Header"
    export default {
      name: 'App',
      data(){
        return{
          title:"传递的是一个值"
        }
      },
      methods:{
        updateTitle(e){   //声明这个函数
          this.title = e;
        }
      },
      components:{
       "app-header":Header,
      }
    }
    </script>
# 4 vue-cli组件的注册
##1  新建一个子组件页面（Son.vue）

    <template>
      <div>
        <!-- 在此处写页面-->
      </div>
    </template>
    <script>
      export  default {
        name: "Son",
        data() {
          return {
            <!-- 页面数据-->
          }
        }
      }
    </script>
## 2 在父组件中引入子组件

    <template>
      <!-- 使用子组件 -->
      <Son> </Son>
    </template>
    <script>
      <!-- 引入组件 -->
     import Son from "@/pages/test/Son";
     export default {
       //组件注册
       components: {Son},
       data() {
         return {
         }
       }
     }
    </script>
## 3 全剧注册

    import Son from "./pages/test/Son";
    Vue.component(Son)
# 5 Vue - 生命周期详解
Vue实例有一个完整的生命周期，也就是说从开始创建、初始化数据、编译模板、挂在DOM、渲染-更新-渲染、卸载等一系列过程，我们成为Vue 实例的生命周期，钩子就是在某个阶段给你一个做某些处理的机会。

 - beforeCreate( 创建前 )

在实例初始化之后，数据观测和事件配置之前被调用，此时组件的选项对象还未创建，el 和 data 并未初始化，因此无法访问methods， data， computed等上的方法和数据。

 - created ( 创建后 ）

实例已经创建完成之后被调用，在这一步，实例已完成以下配置：数据观测、属性和方法的运算，watch/event事件回调，完成了data 数据的初始化，el没有。 然而，挂在阶段还没有开始, $el属性目前不可见，这是一个常用的生命周期，因为你可以调用methods中的方法，改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上，，获取computed中的计算属性等等，通常我们可以在这里对实例进行预处理，也有一些童鞋喜欢在这里发ajax请求，值得注意的是，这个周期中是没有什么方法来对实例化过程进行拦截的，因此假如有某些数据必须获取才允许进入页面的话，并不适合在这个方法发请求，建议在组件路由钩子beforeRouteEnter中完成

 - beforeMount

挂在开始之前被调用，相关的render函数首次被调用（虚拟DOM），实例已完成以下的配置： 编译模板，把data里面的数据和模板生成html，完成了el和data 初始化，注意此时还没有挂在html到页面上。

 - mounted

挂在完成，也就是模板中的HTML渲染到HTML页面中，此时一般可以做一些ajax操作，mounted只会执行一次。

 - beforeUpdate

在数据更新之前被调用，发生在虚拟DOM重新渲染和打补丁之前，可以在该钩子中进一步地更改状态，不会触发附加地重渲染过程

 - updated（更新后）

在由于数据更改导致地虚拟DOM重新渲染和打补丁只会调用，调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作，然后在大多是情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环，该钩子在服务器端渲染期间不被调用

 - beforeDestroy（销毁前）

在实例销毁之前调用，实例仍然完全可用，

这一步还可以用this来获取实例，
一般在这一步做一些重置的操作，比如清除掉组件中的定时器 和 监听的dom事件

 - destroyed（销毁后）

在实例销毁之后调用，调用后，所以的事件监听器会被移出，所有的子实例也会被销毁，该钩子在服务器端渲染期间不被调用

# 6 computed
是一个计算属性,类似于过滤器,对绑定到view的数据进行处理

      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        getName: function () {
          return this.firstName + ' ' + this.lastName
        }
      }

# 7 watch
watch是一个观察的动作

          data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      },
      watch: {
         firstName: function (val) {
         this.fullName = val + ' ' + this.lastName
      },
      lastName: function (val) {
         this.fullName = this.firstName + ' ' + val
       }
    }
## 7.1 监听简单数据类型

    data(){
      return{
        'first':2
      }
    },
    watch:{
      first(){
        console.log(this.first)
      }
    },
## 7.2 监听复杂数据类型

    data(){
      return{
        'first':{
          second:0
        }
      }
    },
    watch:{
      first:{
        handler(oldVal,newVal){
          console.log(oldVal)
          console.log(newVal)
        },
        deep:true
      }
    },
    
监听对象下某个属性--代码如下：

    
        data () {
          return {
            obj:{
              name:'夜空中最亮的星星',
              age:18
            }
          }
        },
        watch:{
          'obj.name':{
            deep:true,
            handler:function(newV,oldV){
              console.log('watch中：',newV)
            }
          }
        }
computed和watch的区别

 - computed特性

1.是计算值，
2.应用：就是简化tempalte里面{{}}计算和处理props或$emit的传值
3.具有缓存性，页面重新渲染值不变化,计算属性会立即返回之前的计算结果，而不必再次执行函数

 - watch特性

1.是观察的动作，
2.应用：监听props，$emit或本组件的值执行异步操作
3.无缓存性，页面重新渲染时值不变化也会执行

# 8 过滤器的定义和使用

全局定义和局部定义两种方式

    // 全局注册
    Vue.filter('toRMB', function (value) {
      return `￥${value}`
    })
    new Vue({
      el: '#app',
      data: {
        money: 826.26,
      },
      // 局部注册
      filters: {
        toFixed: function(money) {
          return money.toFixed(1)
        },
      },
    )}
使用

在双花括号中使用管道符(pipeline) |隔开，或者v-bind 表达式(v2.1.0以上支持)

    <h2>过滤器的使用-添加前缀</h2>
    <p>{{352.11 | toRMB}}</p>
    <p>{{657 | toRMB}}</p>
    <p>{{657.22 | toFixed }}</p>
    <p>{{money | toFixed }}</p>

还可以链式使用，注意先后的顺序，如下面的先添加￥符号再进行小数位变换将会出错，因此要注意先后顺序

    <p>{{ money | toFixed | toRMB }}</p>
