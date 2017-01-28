# 一些Javascript最佳实践
## 原生
### 1.使用 === 代替 ==
### 2.Eval=邪恶
### 3.省略未必省事
### 4.使用JSLint
### 5.将脚本放在页面的底部
### 6.避免在For语句内声明变量
### 7.构建字符串的最优方法
```
var arr = ['item 1', 'item 2', 'item 3', ...];  
var list = '<ul><li>' + arr.join('</li><li>') + '</li></ul>';
```
### 8.减少全局变量
### 9.给代码添加注释
### 10.拥抱渐进增强 [预防禁用JS]
### 11.不要给”setInterval”或”setTimeout”传递字符串参数
### 12.不要使用”with”语句
### 13.使用{}代替 new Ojbect()
### 14.使用[]代替 new Array()
### 15.定义多个变量时，省略var关键字，用逗号代替
### 17.谨记，不要省略分号
### 18.”For in”语句
当遍历对象的属性时，你可能会发现还会检索方法函数。为了解决这个问题，总在你的代码里包裹在一个if语句来过滤信息。
```
for(key in object) {  
   if(object.hasOwnProperty(key) {  
      ...then do something...  
   }  
} 
```
### 19.使用Firebug的”timer”功能优化你的代码
在寻找一个快速、简单的方法来确定操作需要多长时间吗？使用Firebug的“timer”功能来记录结果。
```
function TimeTracker(){  
 console.time("MyTimer");  
 for(x=5000; x > 0; x--){}  
 console.timeEnd("MyTimer");  
} 
```
### 20.阅读，阅读，反复阅读
虽然我是一个巨大的web开发博客的粉丝(像这样!)，午餐之余或上床睡觉之前，实在没有什么比一本书更合适了，坚持放一本web开发方面书在你的床头柜。下面是一些我最喜爱的JavaScript书籍。

- Object-Oriented JavaScript（JavaScript面向对象编程指南 pdf）
- JavaScript：The Good Parts（JavaScript语言精粹 修订版 pdf）
- Learning jQuery 1.3（jQuery基础教程 第4版 pdf）
- Learning JavaScript（JavaScript学习指南 pdf）
读了他们……多次。我仍将继续!
### 21.自执行函数
和调用一个函数类似，它很简单的使一个函数在页面加载或父函数被调用时自动运行。简单的将你的函数用圆括号包裹起来，然后添加一个额外的设置，这本质上就是调用函数。

```
(function doSomething() {  
   return {  
      name: 'jeff',  
      lastName: 'way'  
   };  
})();  
```
### 22.原生代码永远比库快
JavaScript库，例如jQuery和Mootools等可以节省大量的编码时间，特别是AJAX操作。已经说过，总是记住，库永远不可能比原生JavaScript代码更快(假设你的代码正确)。

jQuery的“each”方法是伟大的循环，但使用原生”for”语句总是更快。
### 23.道格拉斯的 JSON.Parse
尽管JavaScript 2（ES5)已经内置了JSON 解析器。但在撰写本文时，我们仍然需要自己实现（兼容性）。道格拉斯（Douglas Crockford），JSON之父，已经创建了一个你可以直接使用的解析器。这里可以下载（链接已坏，可以在这里查看相关信息http://www.json.org/）。

只需简单导入脚本，您将获得一个新的全局JSON对象，然后可以用来解析您的json文件。
```
var response = JSON.parse(xhr.responseText);  
  
var container = document.getElementById('container');  
for(var i = 0, len = response.length; i < len; i++) {  
  container.innerHTML += '<li>' + response[i].name + ' : ' + response[i].email + '</li>';  
}  
```
### 24.移除”language”属性

## Jquery

### 缓存变量
### 避免全局变量
### 使用匈牙利命名法
### 使用 Var 链（单 Var 模式）
### 请使用’On’
### 精简javascript
### 链式操作
### 选择短路求值
### 选择捷径
精简代码的其中一种方式是利用编码捷径。
```
// 糟糕

if(collection.length > 0){..}

// 建议

if(collection.length){..}
```
### 繁重的操作中分离元素
如果你打算对DOM元素做大量操作（连续设置多个属性或css样式），建议首先分离元素然后在添加。
```
// 糟糕

var 
    $container = $("#container"),
    $containerLi = $("#container li"),
    $element = null;

$element = $containerLi.first(); 
//... 许多复杂的操作

// better

var 
    $container = $("#container"),
    $containerLi = $container.find("li"),
    $element = null;

$element = $containerLi.first().detach(); 
//... 许多复杂的操作

$container.append($element);
```
### 熟记技巧
你可能对使用jQuery中的方法缺少经验,一定要查看的文档，可能会有一个更好或更快的方法来使用它。
```
// 糟糕

$('#id').data(key,value);

// 建议 (高效)

$.data('#id',key,value);
```
### 使用子查询缓存的父元素

### 避免通用选择符
将通用选择符放到后代选择符中，性能非常糟糕。
```
// 糟糕

$('.container > *'); 

// 建议

$('.container').children();
```
### 避免隐式通用选择符
通用选择符有时是隐式的，不容易发现。
```
// 糟糕

$('.someclass :radio'); 

// 建议

$('.someclass input:radio');
```
### 优化选择符
例如，Id选择符应该是唯一的，所以没有必要添加额外的选择符。
```
// 糟糕

$('div#myid'); 
$('div#footer a.myLink');

// 建议
$('#myid');
$('#footer .myLink');
```
### 避免多个ID选择符


### 坚持最新版本
新版本通常更好：更轻量级，更高效。显然，你需要考虑你要支持的代码的兼容性。例如，2.0版本不支持ie 6/7/8。

### 摒弃弃用方法
关注每个新版本的废弃方法是非常重要的并尽量避免使用这些方法。
```
// 糟糕 - live 已经废弃

$('#stuff').live('click', function() {
  console.log('hooray');
});

// 建议
$('#stuff').on('click', function() {
  console.log('hooray');
});

// 注：此处可能不当，应为live能实现实时绑定，delegate或许更合适
```
### 利用CDN
谷歌的CND能保证选择离用户最近的缓存并迅速响应。（使用谷歌CND请自行搜索地址，此处地址以不能使用，推荐jquery官网提供的CDN）。

### 必要时组合jQuery和javascript原生代码
