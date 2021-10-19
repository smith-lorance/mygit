# VueJS中学习使用Vuex详解



标签（空格分隔）： 未分类

---

在单页面组件的开发中 Vue的vuex 都统称为同一状态管理，简单的理解就是你在state中定义了一个数据之后，你可以在所在项目中的任何一个组件里进行获取、进行修改，并且你的修改可以得到全局的响应变更
首先要安装、使用 vuex
首先在 vue 2.0+ 你的vue-cli项目中安装 vuex :

    npm install vuex 

接下来，在 main.js里面引入store，然后再全局注入一下，这样一来就可以在任何一个组件里面使用this.$store了：

    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    export default new Vuex.Store({
      state: {
        showFooter: true,
        changableNum:0
      },
      mutations: {
      },
      actions: {
      },
      modules: {
      }
    })
store文件的index.js里面，

    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    export default new Vuex.Store({
      state: {
        showFooter: true,
        changableNum:0
      },
      mutations: {
      },
      actions: {
      },
    })

现在已经可以用this.$store.state.showFooter或this.$store.state.changebleNum在任何一个组件里面获取showfooter和changebleNum定义的值了，

      created() {
         console.log(this.$store.state.showFooter)
    }


但这不是理想的获取方式；vuex官方API提供了一个getters，和vue计算属性computed一样，来实时监听state值的变化(最新状态)，并把它也仍进Vuex.Store里面

    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    export default new Vuex.Store({
      state: {
        showFooter: true,
        changableNum:0
      },
      getters:{
        isShow(state) {
          return state.showFooter
        },
        getChangedNum(state){
          return state.changableNum
        }
      },
      mutations: {
      },
      actions: {
      },
    })

mutattions用于改变当前的状态，mutattions也是一个对象，这个对象里面可以放改变state的初始值的方法，具体的用法就是给里面的方法传入参数state或额外的参数,然后利用vue的双向数据驱动进行值的改变，同样的定义好之后也把这个mutations扔进Vuex.Store里面

    mport Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    export default new Vuex.Store({
      state: {
        showFooter: true,
        changableNum:0
      },
      getters:{
        isShow(state) {
          return state.showFooter
        },
        getChangedNum(state){
          return state.changableNum
        }
      },
      mutations: {
        show(state) {
          state.showFooter = true;
        },
        hide(state) {  //同上
          state.showFooter = false;
        },
        newNum(state,sum){
          state.changableNum+=sum;
        }
      },
      actions: {
      },
    })

时候你完全可以用 this.$store.commit('show') 或 this.$store.commit('hide') 以及 this.$store.commit('newNum',6) 在别的组件里面进行改变showfooter和changebleNum的值了

    //组件
     mounted() {
        this.$store.commit('newNum', 100)
     }
     // vuex
    export default new Vuex.Store({
      state: {
        showFooter: true,
        changableNum:0
      },
      getters:{
        isShow(state) {
          return state.showFooter
        },
        getChangedNum(state){
          return state.changableNum
        }
      },
      mutations: {
        show(state) {
          state.showFooter = true;
        },
        hide(state) {  //同上
          state.showFooter = false;
        },
        newNum(state,sum){
          console.log(sum)
          state.changableNum+=sum;
        }
      },
      actions: {
      },
    })
    
但这不是理想的改变值的方式；因为在 Vuex 中，mutations里面的方法 都是同步事务，意思就是说：比如这里的一个this.$store.commit('newNum',sum)方法,两个组件里用执行得到的值，每次都是一样的，这样肯定不是理想的需求
好在vuex官方API还提供了一个actions，这个actions也是个对象变量，最大的作用就是里面的Action方法 可以包含任意异步操作，这里面的方法是用来异步触发mutations里面的方法，actions里面自定义的函数接收一个context参数和要变化的形参，context与store实例具有相同的方法和属性，所以它可以执行context.commit(' '),然后也不要忘了把它也扔进Vuex.Store里面：

    export default new Vuex.Store({
      state: {
        showFooter: true,
        changableNum:0
      },
      getters:{
        isShow(state) {
          return state.showFooter
        },
        getChangedNum(state){
          return state.changableNum
        }
      },
      mutations: {
        show(state) {
          state.showFooter = true;
        },
        hide(state) {  //同上
          state.showFooter = false;
        },
        newNum(state,sum){
          state.changableNum+=sum;
        }
      },
      actions: {
        hideFooter(context) { 
          context.commit('hide');
        },
        showFooter(context) { 
          context.commit('show');
        },
        getNewNum(context,num){ 
          context.commit('newNum',num)
        }
      },
    })
而在外部组件里进行全局执行actions里面方法的时候，你只需要用执行

    this.$store.dispatch('hideFooter')
    或this.$store.dispatch('showFooter')
    以及this.$store.dispatch('getNewNum'，6)

这样就可以全局改变改变showfooter或changebleNum的值了，

    页面a
    <template>
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <button @click="setStore(true)">你为什么没有女朋友</button>
        <button  @click="setStore(false)">我为什么有女朋友</button>
      </div>
    </template>
    <script>
    // @ is an alias to /src
    export default {
      name: 'Home',
      methods:{
        setStore(type){
          type ? this.$store.dispatch('hideFooter') : this.$store.dispatch('showFooter')
        }
      },
      created() {
      },
      mounted() {
      }
    }
    </script>
    // 页面b
    <template>
      <div class="about">
        <p>{{isShow ? '因为我帅' : '因为你丑'}}</p>
      </div>
    </template>
    <script>
    
      export  default  {
        computed:{
          isShow(){
            return this.$store.getters.isShow;
          }
        },
      }
    
    </script>
modules 模块化 以及 组件中引入 mapGetters、mapActions 和 mapStates的使用
因为在大多数的项目中，我们对于全局状态的管理并不仅仅一种情况的需求，有时有多方面的需求，比如写一个商城项目，你所用到的全局state可能是关于购物车这一块儿的也有可能是关于商品价格这一块儿的；像这样的情况我们就要考虑使用vuex中的 modules 模块化了，

    //index.js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import obj from "./obj";
    Vue.use(Vuex)
    export default new Vuex.Store({
      modules: {
        obj
      }
    })
    // obj.js
    export default {
    namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state: {
        showFooter: true,
        changableNum: 0
    },
    getters: {
        isShow(state) {
            return state.showFooter
        },
        getChangedNum(state) {
            return state.changableNum
        }
    },
    mutations: {
        show(state) {
            state.showFooter = true;
        },
        hide(state) {  //同上
            state.showFooter = false;
        },
        newNum(state, sum) {
            state.changableNum += sum;
        }
    },
    actions: {
        hideFooter(context) {
            context.commit('hide');
        },
        showFooter(context) {
            context.commit('show');
        },
        getNewNum(context, num) {
            context.commit('newNum', num)
        }
    }
}
相应的js，其中的 namespaced:true 表示当你需要在别的文件里面使用( mapGetters、mapActions 接下来会说 )时，里面的方法需要注明来自哪一个模块的方法:

这样一改就有了至少一个模块的state管理文件了,现在你要运行当前的代码话，项目会报错！因为我们把上面的代码模块化分开了，引用的地方还没有改。接下来是 mapState,mapGetters,mapActions的使用，首先 在需要用的 组件里面先导入 import {mapState,mapGetters,mapActions} from 'vuex'

    // about.vue
    <template>
      <div class="about">
        <p>{{isShow ? '因为我帅' : '因为你丑'}}</p>
      </div>
    </template>
    <script>
      import {mapState} from 'vuex'; //先要引入
      export  default  {
        computed:{
          ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
            isShow:state=>state.obj.showFooter //注意这些与上面的区别就是state.obj,
            //里面定义的obj是指obj.js里state的showFooter
          }),
          //你也可以用下面的mapGetters来获取isShow的值，貌似下面的更简洁
          /*...mapGetters('obj',{ //obj指的是modules文件夹下的footerStatus.js模块
               isShow:'isShow' //第一个isShow是我自定义的只要对应template里就行，
                               //第二个isShow是对应的obj.js里的getters里的isShow
            })*/
        },
      }
    </script>
    // home.vue
    <template>
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <button @click="setStore(true)">你为什么没有女朋友</button>
        <button  @click="setStore(false)">我为什么有女朋友</button>
      </div>
    </template>
    <script>
    // @ is an alias to /src
    export default {
      name: 'Home',
      components: {
      },
      methods:{
        setStore(type){
          type ? this.$store.dispatch('obj/hideFooter') : this.$store.dispatch('obj/showFooter')
        }
      },
      created() {
      },
      mounted() {
      }
    }
    </script>

目代码应该就不会报错了，好,最后咱们再来看一下mapActions的用法，实际上上面的this.$store.dispatch('footerStatus/showFooter')已经算是一种执行相应模块的action里的方法了，但有时会牵扯的事件的触发及传值，那就会有下面的mapActions用法了

    home.vue
    <template>
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <button  @click="add()">累加</button>
      </div>
    </template>
    <script>
    // @ is an alias to /src
    import {mapActions} from 'vuex'
    export default {
      name: 'Home',
      components: {
      },
      methods:{
        ...mapActions('obj',[ //obj是指modules文件夹下的obj.js
          'getNewNum'  //obj.js文件中的actions里的方法，在上面的@click中执行并传入实参
        ]),
        add(){
          this.getNewNum(1)
        }
      },
      created() {
      },
      mounted() {
      }
    }
    </script>
    about
    <template>
      <div class="about">
        {{arrList}}
      </div>
    </template>
    <script>
      import { mapGetters} from 'vuex'; //先要引入
      export  default  {
        computed:{
          ...mapGetters('obj',{ //用mapGetters来获取obj.js里面的getters
            arrList:'getChangedNum'
          })
        },
      }
    </script>

# 2 mixins
当我们的项目越来越大，我们会发现组件之间可能存在很多相似的功能，你在一遍又一遍的复制粘贴相同的代码段（data，method，watch、mounted等），如果我们在每个组件中去重复定义这些属性和方法会使得项目出现代码冗余并提高了维护难度，针对这种情况官方提供了Mixins特性
## 1 什么是Mixins？
mixins（混入），官方的描述是一种分发 Vue 组件中可复用功能的非常灵活的方式，mixins是一个js对象，它可以包含我们组件中script项中的任意功能选项，如data、components、methods 、created、computed等等。我们只要将共用的功能以对象的方式传入 mixins选项中，当组件使用 mixins对象时所有mixins对象的选项都将被混入该组件本身的选项中来，这样就可以提高代码的重用性，使你的代码保持干净和易于维护。
## 2 什么时候使用Mixins
当我们存在多个组件中的数据或者功能很相近时，我们就可以利用mixins将公共部分提取出来，通过 mixins封装的函数，组件调用他们是不会改变函数作用域外部的。
## 3 如何创建Mixins
在src目录下创建一个mixins文件夹，文件夹下新建一个myMixins.js文件。前面我们说了mixins是一个js对象，所以应该以对象的形式来定义myMixins，在对象中我们可以和vue组件一样来定义我们的data、components、methods 、created、computed等属性，并通过export导出该对象
## 4 如何使用Mixins

    <script>
      import {myMixins} from '../Mixins/myMixins'
      export  default  {
        mixins:[myMixins],
      }
    </script>
## 5 Mixins的特点
方法和参数在各组件中不共享，虽然组件调用了mixins并将其属性合并到自身组件中来了，但是其属性只会被当前组件所识别并不会被共享，也就是其他组件无法从当前组件中获取到mixins中的数据和方法。
①首先我们在混合对象myMixins.js中定义一个age字段和getAge方法

    export const myMixins = {
      components:{},
      data() {
        return {
          age: 18,
        }
      },
      mounted() {
        this.getAge()
      },
      methods: {
        getAge() {
          console.log(this.age)
        }
      }
    }

 组件1中对num进行+1操作
 

    import { myMixins } from "@/mixins/myMixins.js";
    export default {
      mixins: [myMixins],
      data() {
        return {}
      },
      created() {
        this.age++
      },
    }
组件2不进行操作

    export default {
      mixins: [myMixins],
      data() {
        return {}
      },
    }
我们分别切换到两个页面，查看控制台输出。会发现组件1改变了age里面的值，组件2中age值还是混合对象的初始值，并没有随着组件1的增加而改变,引入mixins后组件会对其进行合并，将mixins中的数据和方法拓展到当前组件中来，在合并的过程中会出现冲突
## 6 Mixins合并冲突
值为对象(components、methods 、computed、data)的选项，混入组件时选项会被合并，键冲突时优先组件，组件中的键会覆盖混入对象的
在混入对象增加age属性、getAge1方法和getAge2方法

    // myMixins.js
    export const myMixins = {
      components:{},
      data() {
        return {
          age: 18,
        }
      },
      methods: {
        getAge1() {
          console.log("age1 from mixins =", this.age )
        },
        getAge2() {
          console.log("age2 from mixins =", this.age )
        },
      }
    }
在引入了myMixins文件的组件中，增加age属性、getAge1方法和getAge3方法

    // template.vue
    import { myMixins } from "@/mixins/myMixins.js";
    export default {
      mixins: [myMixins],
      data() {
        return {
          age: 20,
        }
      },
      mounted() {
        this.getAge1();
        this.getAge2();
        this.getAge3();
      },
      methods: {
        getAge1() {
          console.log('age1 from template =', this.age)
        },
        getAge3() {
          console.log('age3 from template =', this.age)
        },
      }
    }
会发现，组件中的age覆盖了混合对象的age，组件的getAge1方法覆盖了混合对象的getAge1方法
值为函数(created、mounted)的选项，混入组件时选项会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用

    // myMixins.js
    export const myMixins = {
      components:{},
      data() {
        return {}
      },
      created() {
        console.log('xxx from mixins')
      }
    }
    // 混入文件
    import { myMixins } from "@/mixins/myMixins.js";
    export default {
      mixins: [myMixins],
      data() {
        return {}
      },
      created() {
        console.log('xxx from template')
      }
    }
## 7 与vuex的区别
vuex：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。

Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。

## 8 与公共组件的区别
组件：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是相对独立的。

Mixins：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。
