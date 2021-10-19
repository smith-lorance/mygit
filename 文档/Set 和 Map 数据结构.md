# Promise 对象

标签（空格分隔）： es6

---

## 1 Promise 的含义
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 2 基本用法
ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。

    const promise = new Promise(function(resolve, reject) {
      // ... some code
      if (/* 异步操作成功 */){
        resolve(value);
      } else {
        reject(error);
      }
    });
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

    promise.then(function(value) {
      // success
    }, function(error) {
      // failure
    });

then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。这两个函数都是可选的，不一定要提供。它们都接受Promise对象传出的值作为参数。

      function timeout(ms) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve('done'), ms );
            });
        }
        timeout(1000).then((value) => {
            console.log(value);
        });
上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（ms参数）以后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数。
Promise 新建后就会立即执行。

    let promise = new Promise(function(resolve, reject) {
      console.log('Promise');
      resolve();
    });
    promise.then(function() {
      console.log('resolved.');
    })
    console.log('Hi!');
    // Promise
    // Hi!
    // resolved
上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

    const getJSON = function(url) {
      const promise = new Promise(function(resolve, reject){
        const handler = function() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
      });
      return promise;
    };
    getJSON("/posts.json").then(function(json) {
      console.log('Contents: ' + json);
    }, function(error) {
      console.error('出错了', error);
    });

上面代码中，getJSON是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。
如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

    const p1 = new Promise(function (resolve, reject) {
      // ...
    });
    const p2 = new Promise(function (resolve, reject) {
      // ...
      resolve(p1);
    })
上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。
注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。

    const p1 = new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('fail')), 3000)
    })
    const p2 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve(p1), 1000)
    })
    p2
      .then(result => console.log(result))
      .catch(error => console.log(error))
    // Error: fail
上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数
注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。

    new Promise((resolve, reject) => {
      resolve(1);
      console.log(2);
    }).then(r => {
      console.log(r);
    });
    // 2
    // 1
一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。

    new Promise((resolve, reject) => {
      return resolve(1);
      // 后面的语句不会执行
      console.log(2);
    })

## 3 Promise.prototype.then()
Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。

    getJSON("/posts.json").then(function(json) {
      return json.post;
    })
## 4 Promise.prototype.catch() § ⇧
Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

    getJSON('/posts.json').then(function(posts) {
      // ...
    }).catch(function(error) {
      // 处理 getJSON 和 前一个回调函数运行时发生的错误
      console.log('发生错误！', error);
    });

上面代码中，getJSON()方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then()方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获
## 5 Promise.prototype.finally()
finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

    promise
    .then(result => {···})
    .catch(error => {···})
    .finally(() => {···});
上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
## 6 Promise.all() 
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

    const p = Promise.all([p1, p2, p3]);

上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

    // 生成一个Promise对象的数组
    const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
      return getJSON('/post/' + id + ".json");
    });
    Promise.all(promises).then(function (posts) {
      // ...
    }).catch(function(reason){
      // ...
    });
上面代码中，promises是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。
## 7 Promise.race() 
Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

    const p = Promise.race([p1, p2, p3]);
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。
# Class 的基本语法
## 1 类的由来
JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    Point.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ')';
    };
    var p = new Point(1, 2);
ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。

基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的class改写，就是下面这样。

    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }
上面代码定义了一个“类”，可以看到里面有一个constructor()方法，这就是构造方法，而this关键字则代表实例对象。这种新的 Class 写法，本质上与本章开头的 ES5 的构造函数Point是一致的。
Point类除了构造方法，还定义了一个toString()方法。注意，定义toString()方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法与方法之间不需要逗号分隔，加了会报错。
ES6 的类，完全可以看作构造函数的另一种写法。

    class Point {
      // ...
    }
    typeof Point // "function"
    Point === Point.prototype.constructor // true
上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。

    class Bar {
      doStuff() {
        console.log('stuff');
      }
    }
    const b = new Bar();
    b.doStuff() // "stuff"
构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。

      class Point {
      constructor() {
        // ...
      }
      toString() {
        // ...
      }
      toValue() {
        // ...
      }
    }
    // 等同于
    Point.prototype = {
      constructor() {},
      toString() {},
      toValue() {},
    };
上面代码中，constructor()、toString()、toValue()这三个方法，其实都是定义在Point.prototype上面。
因此，在类的实例上面调用方法，其实就是调用原型上的方法。

    class B {}
    const b = new B();
    b.constructor === B.prototype.constructor // true
上面代码中，b是B类的实例，它的constructor()方法就是B类原型的constructor()方法。
由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign()方法可以很方便地一次向类添加多个方法。

    class Point {
      constructor(){
        // ...
      }
    }
    Object.assign(Point.prototype, {
      toString(){},
      toValue(){}
    });
prototype对象的constructor()属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

    Point.prototype.constructor === Point // true
另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。。这一点与 ES5 的行为不一致。
## 2 constructor 方法
constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。

    class Point {
    }
    // 等同于
    class Point {
      constructor() {}
    }
constructor()方法默认返回实例对象（即this）
类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

    class Foo {
      constructor() {
        return Object.create(null);
      }
    }
    Foo()
## 3 类的实例 
生成类的实例的写法，与 ES5 完全一样，也是使用new命令。如果忘记加上new，像函数那样调用Class，将会报错。

    class Point {
      // ...
    }
    // 报错
    var point = Point(2, 3);
    // 正确
    var point = new Point(2, 3);
## 4 取值函数（getter）和存值函数（setter
与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

      class MyClass {
      constructor() {
        // ...
      }
      get prop() {
        return 'getter';
      }
      set prop(value) {
        console.log('setter: '+value);
      }
    }
    let inst = new MyClass();
    inst.prop = 123;
    // setter: 123
    inst.prop
    // 'getter'


## 5 属性表达式 
类的属性名，可以采用表达式。

    let methodName = 'getArea';
    class Square {
      constructor(length) {
        // ...
      }
      [methodName]() {
        // ...
      }
    }
##6 6 Class 表达式
与函数一样，类也可以使用表达式的形式定义。

    const MyClass = class Me {
      getClassName() {
        return Me.name;
      }
    };
上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。

        const MyClass = class Me {
            getClassName() {
                console.log(Me.name)
                return Me.name;
            }
        };
        let inst = new MyClass();
        inst.getClassName()
如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。

    const MyClass = class { /* ... */ };
采用 Class 表达式，可以写出立即执行的 Class。

    let person = new class {
      constructor(name) {
        this.name = name;
      }
      sayName() {
        console.log(this.name);
      }
    }('张三');
    person.sayName(); // "张三"