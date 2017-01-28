# 七个JavaScript实用技巧

看清javascript强大之处，解决你可能曾经被你认为是障碍的东西

## 1.) 相等

值类型（或字符串）当有相同值是是相等的。引用类型相等需要有相同的引用。（我们假设你没有重载==运算符，或实现你自己的等值运算和GetHashCode方法）我很惊讶为什么JavaScript有两个等值运算符：==和===。最初我的大部分代码都是用的==，所以我并不知道当我运行如下代码的时候JavaScript为我做了什么：

```
var x = 1;

if(x == "1") {
    console.log("YAY! They're equal!");
}
```

这是黑暗魔法吗？整数1是如何和字符串”1”相等的？

在JavaScript中，有相等（==）和严格相等（===）之说。相等运算符将强制转换两边的操作数为相同类型后执行严格相等比较。所以在上面的例子中，字符串”1”会被转换为整数1，这个过程在幕后进行，然后与变量x进行比较。

严格相等不进行类型转换。如果操作数类型不同（如整数和字符串），那么他们不全等（严格相等）。

```
var x = 1;

// 严格平等，类型必须相同
if(x === "1") {
    console.log("Sadly, I'll never write this to the console");
}

if(x === 1) {
    console.log("YES! Strict Equality FTW.")
}
```

你可能正在考虑可能发生强制类型转换而引起的各种恐怖问题——假设你的引用中发生了这种转换，可能导致你非常困难找到问题出在哪里。这并不奇怪，这也是为什么经验丰富的JavaScript开发者总是建议使用严格相等。

## 2.) 点号 vs 括号

```
var doSomething = function(doWhat) {
    switch(doWhat) {
        case "doThisThing":
            // more code...
        break;
        case "doThatThing":
            // more code...
        break;
        case "doThisOtherThing":
            // more code....
        break;
        // additional cases here, etc.
        default:
            // default behavior
        break;
    }
}
```

可以转化为这样

```
var thingsWeCanDo = {
    doThisThing      : function() { /* behavior */ },
    doThatThing      : function() { /* behavior */ },
    doThisOtherThing : function() { /* behavior */ },
    default          : function() { /* behavior */ }
};

var doSomething = function(doWhat) {
    var thingToDo = thingsWeCanDo.hasOwnProperty(doWhat) ? doWhat : "default"
    thingsWeCanDo[thingToDo]();
}
```

## 3.) 函数上下文

### 第一——首先考虑全局情况（Global）

默认情况下，直到某些原因改变了执行上下文，否则this的值都指向全局对象。在浏览器中，那将会是window对象（或在node.js中为global）。

### 第二——方法中的this值
当你有一个对象，其有一个函数成员，父对象调用这方法，this的值将指向父对象。例如：

```
var marty = {
    firstName: "Marty",
    lastName: "McFly",
    timeTravel: function(year) {
        console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
    }
}

marty.timeTravel(1955);
// Marty McFly is time traveling to 1955
```
你可能已经知道你能引用marty对象的timeTravel方法并且创建一个其他对象的新引用。这实际上是JavaScript非常强大的特色——使我们能够在不同的实例上引用行为（调用函数）。

```
var doc = {
    firstName: "Emmett",
    lastName: "Brown",
}

doc.timeTravel = marty.timeTravel;
```

所以——如果我们调用doc.timeTravel(1885)将会发生什么？

```
doc.timeTravel(1885);
// Emmett Brown is time traveling to 1885
```

再次——上演黑暗魔法。嗯，并不是真的。记住，当你调用一个方法的时候，this上下文是被调用函数父的父对象。

当我们保存marty.TimeTravel方法的引用然后调用我们保存的引用时发生了什么？让我们看看：

```
var getBackInTime = marty.timeTravel;
getBackInTime(2014);
// undefined undefined is time traveling to 2014
为什么是“undefined undefined”？！而不是“Matry McFly”？
```

让我们问一个关键的问题：当我们调用我们的getBackInTime函数时父对象/容器对象是什么？当getBackIntTime函数存在于window中时，我们调用它作为一个函数，而不是一个对象的方法。当我们像这样调用一个函数——没有容器对象——this上下文将是全局对象。David Shariff有一个伟大的描述关于这：

> 无论何时调用一个函数，我们必须立刻查看括号的左边。如果在括号的左边存在一个引用，那么被传递个调用函数的this值确定为引用所属的对象，否则是全绝对象。

由于getBackInTime的this上下文是window——没有firstName和lastName属性——这解释了为什么我们看见“undefined undefined”。

因此我们知道直接调用一个函数——没有容器对象——this上下文的结果是全局对象。然而我也说我早就知道我们的getBackInTime函数存在于window上。

### 第三（仅仅是#2的扩展）——异步调用方法中的this值

利用匿名函数来处理

### 第四——构造函数中的this值

当你用构造函数创建对象实例时，函数内部的this值就是新创建的对象。例如：

```
var TimeTraveler = function(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
    // Constructor functions return the
    // newly created object for us unless
    // we specifically return something else
};

var marty = new TimeTraveler("Marty", "McFly");
console.log(marty.firstName + " " + marty.lastName);
// Marty McFly
```

### 第五 Call，Apply和BindCall

你可能开始疑惑，上面的例子中，没有语言级别的特性允许我们在运行时指定调用函数的this值吗？你是对的。存在于函数原型上的call和apply方法允许我们调用函数并传递this值。

你可能开始疑惑，上面的例子中，没有语言级别的特性允许我们在运行时指定调用函数的this值吗？你是对的。存在于函数原型上的call和apply方法允许我们调用函数并传递this值。

call方法的第一个参数是this，后面是被调用函数的参数序列：
```
someFn.call(this, arg1, arg2, arg3);
```
apply的第一个参数也是this，后面是其余参数组成的数组：
```
someFn.apply(this, [arg1, arg2, arg3]);
```
我们的doc和marty实例他们自己能时间旅行，但einstein（爱因斯坦）需要他们的帮助才能完成时间旅行。所以让我们给我们的doc实例添加一个方法，以至于doc能帮助einstein完成时间旅行。
```
doc.timeTravelFor = function(instance, year) {
    this.timeTravel.call(instance, year);
    // 如果你使用apply使用下面的语法
    // this.timeTravel.apply(instance, [year]);
};
```
现在它可以传送Einstein 了：
```
var einstein = {
    firstName: "Einstein", 
    lastName: "(the dog)"
};

doc.timeTravelFor(einstein, 1985);
// Einstein (the dog) is time traveling to 1985
```
我知道这个例子有些牵强，但它足以让你看到应用函数到其他对象的强大之处。

这种方法还有我们没有发现的另一种用处。让我们给我们的marty实例添加一个goHome方法，作为this.timeTravel(1985)的快捷方式。

```
marty.goHome = function() {
    this.timeTravel(1985);
}
```

然而，我们知道如果我们订阅marty.goHome作为按钮的点击事件处理程序，this的值将是按钮——并且不幸的是按钮没有timeTravel方法。我们能用上面的方法解决——用个一匿名函数作为事件处理程序，并在其内部调用上述方法——但我们有另一个选择——bind函数：

```
flux.addEventListener("click", marty.goHome.bind(marty));
```

bind函数实际上会返回一个新函数，新函数的this值根据你提供的参数设置。如果你需要支持低版本浏览器（例如：ie9以下版本），你可能需要bind函数的shim（或者，如果你使用jQuery你可以用$.proxy代替，underscore和lodash都提供_.bind方法）。

> 记住重要一点，如果你直接使用原型上的bind方法，它将创建一个实例方法，这将绕过原型方法的优点。这不是错误，做到心里清楚就行了。我写了关于这个问题得更多信息在这里。
 

## 4.) 函数表达式vs函数声明

函数声明不需要var关键字。事实上，如AngusCroll所说：“把他们想象成变量声明的兄弟有助于理解”。例如：


```
function timeTravel(year) {
    console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
} 上面例子里的函数名字timeTravel不仅在它声明的在作用域可见，同时在函数本身内部也是可见的（这对递归函数调用非常有用）。函数声明，本质上说其实就是命名函数。换句话说，上面函数的名称属性是timeTravel。
```

函数表达式定义一个函数并指派给一个变量。典型应用如下：

```
var someFn = function() {
    console.log("I like to express myself...");
}; 也可以对函数表达式命名——然而，不像函数声明，命名函数表达式的名字仅在它自身函数体内可访问：

var someFn = function iHazName() {
    console.log("I like to express myself...");
    if(needsMoreExpressing) {
        iHazName(); // 函数的名字在这里可以访问
    }
};

// 你可以在这里调用someFn()，但不能调用iHazName()
someFn();
```

## 5.) 命名vs匿名函数

基于我们刚才的讨论，你可能一进猜到“匿名”函数其实就是一个没有名字的函数。大多数JavaScript开发者能迅速识别瞎买年第一个参数为匿名函数：

```
someElement.addEventListener("click", function(e) {
    // I'm anonymous!
});
```
然而，同样的我们的marty.timeTravvel方法也是一个匿名函数：
```
var marty = {
    firstName: "Marty",
    lastName: "McFly",
    timeTravel: function(year) {
        console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
    }
}
```
因为函数声明必须有一个唯一的名字，只有函数表达式可以没有名字。

## 6.) 立即执行函数表达式

```
(function(){return 'Hello World!'})();
(function(){return 'Hello World!'}());
```

## 7.) ‘typeof’操作符和’Object.prototype.toString’

```
typeof {foo: 'bar'};
// object
typeof ['foo', 'bar'];
// object
typeof "foobar"
// string
typeof /foo|bar/;
// object
```

还好——至少我们可以将字符串和对象，数组，正则表达式区分开，对吗？幸运的是，我们可以得到更准确的类型信息，我们有其他不同的方法。我们将使用Object.prototype.toString方法，并且应用我们前面提到的call方法：

```
Object.prototype.toString.call({foo: 'bar'});
// [object Object]
Object.prototype.toString.call(['foo', 'bar']);
//[object Array]
Object.prototype.toString.call('foobar');
//[object String]
Object.prototype.toString.call(/foo|bar/);
//[Object RegExp]
```

为什么我们要使用Object.prototype上的toString方法？因为第三方库或你自己的代码可能重写实例的toString方法。通过Object.prototype，我们可以强制实现实例原来的toString行为。

