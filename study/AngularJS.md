```javascript 
Hello {{'World'}}!
```
  
 **ng-app 指令告诉 AngularJS，div 元素是 AngularJS 应用程序 的"所有者"。   
  ng-model 指令把输入域的值绑定到应用程序变量 name。  
  ng-bind 指令把应用程序变量 name 绑定到某个段落的 innerHTML**
  
  ```javascript
  <p>名字 : <input type="text" ng-model="name"></p>   
  <h1>Hello {{name}}</h1>
  ```
  
  **(init:  初始化)**
  
  **AngularJS 指令是以 ng 作为前缀的 HTML 属性,  
  ng-init 指令初始化 AngularJS 应用程序变量**
  
  ```javascript
  <div ng-init="firstName='John'">

     <p>姓名为 <span ng-bind="firstName"></span></p>

  </div>
  
  <div data-ng-init="secondName='neo'">

     <p>姓名为 <span data-ng-bind="secondName"></span></p>

  </div>
  ```
  
 **AngularJS 表达式写在双大括号内：{{ expression }}。  
  AngularJS 表达式把数据绑定到 HTML，这与 ng-bind 指令有异曲同工之妙。   
  AngularJS 将在表达式书写的位置"输出"数据。  
  AngularJS 表达式 很像 JavaScript 表达式：它们可以包含文字、运算符和变量**
  
  ```javascript
  <p>我的第一个表达式： {{ 5 + 5 }}</p>
  
  <div ng-init="quantity=3;cost=5">

     <p>总价： {{ quantity * cost }}</p>

  </div>
  
  <div ng-init="firstName='John';lastName='Doe'">

      <p>姓名： {{ firstName + " " + lastName }}</p>
      <p>姓名： <span ng-bind="firstName + ' ' + lastName"></span></p>

  </div>
  
  <div ng-init="person={firstName:'John',lastName:'Doe'}">

     <p>姓为 {{ person.lastName }}</p>
     <p>姓为 <span ng-bind="person.lastName"></span></p>

  </div>
  
  <div ng-init="points=[1,15,19,2,40]">

     <p>第三个值为 {{ points[2] }}</p>
     <p>第三个值为 <span ng-bind="points[2]"></span></p>

  </div>
  ```

  **类似于 JavaScript 表达式，AngularJS 表达式可以包含字母，操作符，变量。
  与 JavaScript 表达式不同，AngularJS 表达式可以写在 HTML 中。
  与 JavaScript 表达式不同，AngularJS 表达式不支持条件判断，循环及异常。
  与 JavaScript 表达式不同，AngularJS 表达式支持过滤器**
  
  **一个网页可以包含多个运行在不同元素中的 AngularJS 应用程序**
  ```javascript
  <div ng-app="" ng-init="thirdName='John'">
     <p>在输入框中尝试输入：</p>
 	<p>姓名：<input type="text" ng-model="thirdName"></p>
 	<p>你输入的为： {{ thirdName }}</p>
  </div>

  <div ng-init="quantity=4;price=5">
    
    <h2>价格计算器</h2>
    
    数量： <input type="number" ng-model="quantity">
    价格： <input type="number" ng-model="price">
    
    <p><b>总价：</b> {{ quantity * price }}</p>
    
  </div>
  ```
  
  **ng-repeat 指令会重复一个HTML元素**
  ```javascript
  <div ng-app="" ng-init="names=['Jani','Hege','Kai']">
      <p>使用 ng-repeat 来循环数组</p>
      <ul>
        <li ng-repeat="x in names">
          {{ x }}
        </li>
      </ul>
  <div>
  
  <div ng-app="" ng-init="obj=[
    {name:'Jani',country:'Norway'},
    {name:'Hege',country:'Sweden'},
    {name:'Kai',country:'Denmark'}]">
    
    <p>循环对象：</p>
    <ul>
      <li ng-repeat="x	in obj">
        {{ x.name + ', ' + x.country }}
      </li>
    </ul>
  </div>
  ```
