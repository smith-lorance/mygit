# 1 Context

标签（空格分隔）： 未分类

---

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。
## 1 何时使用 Context
Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，使用 context, 我们可以避免通过中间元素传递 props：

    import React from 'react'
    // Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
    // 为当前的 theme 创建一个 context（1为默认值）。
    let Context = React.createContext(1)
    export default class Home extends React.Component {
        constructor(props) {
            super();
        }
        render() {
            return (
                // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
                // 无论多深，任何组件都能读取这个值。
                // 在这个例子中，我们将 “hello word” 作为当前的值传递下去。
                <div>
                    <p>这是第一个组件</p>
                    <Context.Provider value="hello word">
                        <Text></Text>
                    </Context.Provider>
                </div>
            )
        }
    }
    class Text extends React.Component{
        render() {
            // 中间的组件再也不必指明往下传递 theme 了。
            return (
                <div>
                    这是第二个组件
                    <Text1></Text1>
                </div>
            )
        }
    }
    class Text1 extends  React.Component{
        // 指定 contextType 读取当前的 theme context。
        // React 会往上找到最近的 theme Provider，然后使用它的值。
        // 在这个例子中，当前的 theme 值为 “hello word”。
        static contextType = Context;
        render() {
            return (
                <div>
                    <p>这是第三个组件</p>
                    <p>{this.context}</p>
                </div>
            )
        }
    }

## 2 使用 Context 之前的考虑
Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。
如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。

## 3 API
### 1 React.createContext

    const MyContext = React.createContext(defaultValue);

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
###2 Context.Provider

    <MyContext.Provider value={/* 某个值 */}>

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
### 3 Class.contextType

    class MyClass extends React.Component {
      componentDidMount() {
        let value = this.context;
        /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
      }
      componentDidUpdate() {
        let value = this.context;
        /* ... */
      }
      componentWillUnmount() {
        let value = this.context;
        /* ... */
      }
      render() {
        let value = this.context;
        /* 基于 MyContext 组件的值进行渲染 */
      }
    }
    MyClass.contextType = MyContext;
挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
如果你正在使用实验性的 public class fields 语法，你可以使用 static 这个类属性来初始化你的 contextType。

    class MyClass extends React.Component {
      static contextType = MyContext;
      render() {
        let value = this.context;
        /* 基于这个值进行渲染工作 */
      }
    }
### 4 Context.Consumer

    <MyContext.Consumer>
      {value => /* 基于 context 值进行渲染*/}
    </MyContext.Consumer>

这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。
这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。
## 5 Context.displayName
context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。
示例，下述组件在 DevTools 中将显示为 MyDisplayName：

    const MyContext = React.createContext(/* some value */);
    MyContext.displayName = 'MyDisplayName';
    <MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
    <MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
## 5 动态 Context
context.js

    import  React from 'react'
    export const context = {
        user:{
            name:"jack"
        },
        student:{
            name:"Alice"
        }
    }
    export const Tree  = React.createContext(
        context.user
    )
str.js

    import React from 'react'
    import StrContext from '../../components/StrContext/strContext'
    export default class Str extends React.Component{
        constructor(props) {
            super();
        }
        render() {
            return(
                <div>
                    <button onClick={this.props.setState}>点击确认</button>
                    <StrContext></StrContext>
                </div>
            )
        }
    }
syrContext.js

    import React from 'react'
    import {Tree} from "../../context/context";
    export default class StrContext  extends  React.Component{
        static contextType = Tree
        render() {
            return (
                <div>
                    {this.context}
                </div>
            )
        }
    }
home.js

    import React from 'react'
    import {Tree, context} from "../../context/context";
    import Str from "../../components/str/str";
    export default class Home extends React.Component {
        constructor(props) {
            super();
            this.state  = {
                i : context.user.name
            }
        }
        getState(){
            this.setState({
                i : context.user.name === this.state.i ? context.student.name:context.user.name
            })
        }
        render() {
            return (
                <div>
                    <Tree.Provider value={this.state.i}>
                        <Str setState={this.getState.bind(this)}></Str>
                    </Tree.Provider>
                </div>
            )
        }
    }
# 2 Refs 转发
Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。对于大多数应用中的组件来说，这通常不是必需的。但其对某些组件，尤其是可重用的组件库是很有用的。最常见的案例如下所述。一般情况是用不到Refs这个东西，因为我们并不直接操作底层DOM元素，而是在render函数里去编写我们的页面结构，由React来组织DOM元素的更新
## 1 为什么用到refs

简单的来说就是处理DOM元素的focus，文本的选择或者媒体的播放等，以及处罚强制动画或者同第三方DOM库集成的时候。


## 2 HTML elements

        export default class StrContext  extends  React.Component{
        static contextType = Tree
        constructor(props) {
            super();
            this.state = {
                myRef: React.createRef()
            }
        }
        componentDidMount(){
           console.log(this.state.myRef.current)
        }
        render() {
            return (
                <div ref={this.state.myRef}>
                    {this.context}
                </div>
            )
        }
    }
## 3 Class Components
str.js

    import React from 'react'
    import StrContext from '../../components/StrContext/strContext'
    export default class Str extends React.Component{
        constructor(props) {
            super();
            this.state = {
                ref : React.createRef()
            }
        }
        componentDidMount() {
            this.state.ref.current.getName()
        }
    render() {
        return(
            <div>
                <button onClick={this.props.setState}>点击确认</button>
                <StrContext ref={this.state.ref}></StrContext>
            </div>
        )
    }
}

strContext.js

    import React from 'react'
    import {Tree} from "../../context/context";
    export default class StrContext  extends  React.Component{
        static contextType = Tree
        constructor(props) {
            super();
            this.state = {
            }
        }
        getName(){
            console.log("测试数据")
        }
        render() {
            return (
                <div>
                    {this.context}
                </div>
            )
        }
    }
# 3 Redux入门教程
## 1 什么是Redux
Redux是一个流行的JavaScript框架，为应用程序提供一个可预测的状态容器。Redux基于简化版本的Flux框架，Flux是Facebook开发的一个框架。在标准的MVC框架中，数据可以在UI组件和存储之间双向流动，而Redux严格限制了数据只能在一个方向上流动。
在Redux中，所有的数据（比如state）被保存在一个被称为store的容器中 → 在一个应用程序中只能有一个。store本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从store访问特定对象的状态。要通过本地或远程组件更改状态，需要分发一个action。分发在这里意味着将可执行信息发送到store。当一个store接收到一个action，它将把这个action代理给相关的reducer。reducer是一个纯函数，它可以查看之前的状态，执行一个action并且返回一个新的状态。
## 2 配置Redux
配置Redux开发环境的最快方法是使用create-react-app工具。在开始之前，确保已经安装并更新了nodejs，npm和yarn。

    yarn add redux

## 3 Action
Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

    
    actions.js
    // 创建一个任务
    export const ADD = "ADD_NUMBER";
    // 创建一个action
    export const ADD_NUMBER = {
        type:ADD,
        sun:0
    }
Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。除了 type 字段外，action 对象的结构完全由你自己决定。我们应该尽量减少在 action 中传递的数据。
## 4 Action 创建函数
Action 创建函数 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。
在 Redux 中的 action 创建函数只是简单的返回一个 action:

    actions.js
    // 创建一个任务
    export const ADD = "ADD_NUMBER";
    // 创建一个action
    export function addNum(sun) {
        return {
            type:ADD,
            sun
        }
    }
## 5 Reducer
Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。
### 1 设计 State 结构

在 Redux 应用中，所有的 state 都被保存在一个单一对象中。

    stores.js
    export const stateData = {
    sunObj:{
        sun:0
    }
}
### 2 Action 处理
确定了 state 对象的结构，就可以开始开发 reducer。reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

    (previousState, action) => newState
之所以将这样的函数称之为reducer，是因为这种函数与被传入 Array.prototype.reduce(reducer, ?initialValue) 里的回调函数属于相同的类型。保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：
修改传入参数；
执行有副作用的操作，如 API 请求和路由跳转；
调用非纯函数，如 Date.now() 或 Math.random()。
我们将以指定 state 的初始状态作为开始。Redux 首次执行时，state 为 undefined，此时我们可借机设置并返回应用的初始 state。

    index.js
    import {ADD} from "./actions";
    import {stateData} from "./stores";
    function updateSun(state = stateData.sunObj, action) {
        switch (action.type) {
            case ADD:
                return  state.sun + action.sun
            default:
                return state
        }
    }


注意:

 1. 不要修改 state。
 2. 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。
 3. 每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。
 ### 3 处理多个 action
，Redux 提供了 combineReducers() 来注册多个Reducer

         index.js
        import {ADD} from "./actions";
        import {stateData} from "./stores";
        import {createStore,combineReducers} from "redux";
        function updateSun(state = stateData.sunObj, action) {
            switch (action.type) {
                case ADD:
                    return  state.sun + action.sun
                default:
                    return state
            }
        }
        let reducers = combineReducers({updateSun})

## 6 Store
Store 就是把它们联系到一起的对象。Store 有以下职责：

 - 维持应用的 state；
 - 提供 getState() 方法获取 state；
 - 提供 dispatch(action) 方法更新 state；
 - 通过 subscribe(listener) 注册监听器;
 - 通过 subscribe(listener) 返回的函数注销监听器
再次强调一下 Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。
将创建好的reducer传入到createStore中

        =import {ADD} from "./actions";
        import {stateData} from "./stores";
        import {createStore,combineReducers} from "redux";
        function updateSun(state = stateData.sunObj, action) {
            switch (action.type) {
                case ADD:
                    return  state.sun + action.sun
                default:
                    return state
            }
        }
        let reducers = combineReducers({updateSun})
        export const store = createStore(reducers)
createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。

        let store = createStore(todoApp, window.STATE_FROM_SERVER)
## 7 发起 Actions

    import {ADD} from "./actions";
    import {stateData} from "./stores";
    import {createStore,combineReducers} from "redux";
    import {addNum} from "./actions";
    function updateSun(state = stateData.sunObj, action) {
        switch (action.type) {
            case ADD:
                return {
                    sun: state.sun + action.sun
                }
            default:
                return state
        }
    }
    let reducers = combineReducers({updateSun})
    export const store = createStore(reducers)
    // 打印初始状态
    console.log(store.getState())
    // 每次 state 更新时，打印日志
    // 注意 subscribe() 返回一个函数用来注销监听器
    let unsubscribe = store.subscribe( e => {
        console.log(store.getState())
    })
    // 发起一系列 action
    setInterval(() => {
        store.dispatch(addNum(1))
    },2000)
    // 停止监听 state 更新
    unsubscribe()
### 1 在组件中使用

    my.js
    import  React from 'react'
    import {store} from "../../redux";
    import {addNum} from "../../redux/actions";
    class  My  extends  React.Component{
        constructor() {
            super();
            this.add = this.add.bind(this)
        }
        add(){
            store.dispatch(addNum(1))
        }
        render() {
            return (
                <div>
                    <p>wide发大发过芽给发芽时</p>
                    <button onClick={this.add}>点击确认</button>
                </div>
            )
        }
    }
    export default My
    uswr.js
    import React from 'react'
    import {store} from "../../redux";
    class User extends React.Component {
        constructor() {
            super();
            this.state = {
                text : 0
            }
        }
        componentDidMount(){
            this.setState({
                text: store.getState().updateSun.sun
            })
        }
        render() {
            return (
                <div>{this.state.text}</div>
            )
        }
    }
    export default User


# 4 Fragments
React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。
## 1 动机
一种常见模式是组件返回一个子元素列表。以此 React 代码片段为例：

    class Table extends React.Component {
      render() {
        return (
          <table>
            <tr>
              <Columns />
            </tr>
          </table>
        );
      }
    }
<Columns /> 需要返回多个 <td> 元素以使渲染的 HTML 有效。如果在 <Columns /> 的 render() 中使用了父 div，则生成的 HTML 将无效。
## 2 用法

    父组件
     <table>
          <tbody>
            <tr>
              <TableStr></TableStr>
            </tr>
          </tbody>
        </table>
    子组件
    class TableStr extends React.Component {
      render() {
        return (
          <React.Fragment>
            <th>语文</th>
            <th>数学</th>
            <th>化学</th>
          </React.Fragment>
        );
      }
    }
## 3 短语法
你可以使用一种新的，且更简短的语法来声明 Fragments。它看起来像空标签：

    class TableStr extends React.Component {
      render() {
        return (
          <>
            <th>语文</th>
            <th>数学</th>
            <th>化学</th>
          </>
        );
      }
    }
## 4 带 key 的 Fragments

    
    class TableStr extends React.Component {
        constructor(props) {
            super();
            this.state = {
                arr: ["语文", '数学', '英语', '化学', '地理', '生物', '历史', '政治']
            }
        }
        render() {
            return (
                this.state.arr.map((item, index) => {
                    return <React.Fragment key={index}>
                        <th>
                            {item}
                        </th>
                    </React.Fragment>
                })
            )
        }
    }
