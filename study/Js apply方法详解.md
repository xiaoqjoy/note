apply:方法能劫持另外一个对象的方法，继承另外一个对象的属性

```javascript
/*定义一个人类*/   
function Person(name,age) {   
    this.name=name; 
    this.age=age;   
}   
 /*定义一个学生类*/   
function Student(name,age,grade) {   
    Person.apply(this,arguments); 
    this.grade=grade;   
}   
//创建一个学生类   
var student=new Student("qian",21,"一年级");   
//测试   
alert("name:"+student.name+"\n"+"age:"+student.age+"\n"+"grade:"+student.grade);   
//大家可以看到测试结果name:qian age:21 grade:一年级   
//学生类里面我没有给name和age属性赋值啊,为什么又存在这两个属性的值呢,这个就是apply的神奇之处. 
```

call方法
```javascript
function add(a,b)  
{  
    alert(a+b);  
}  
function sub(a,b)  
{  
    alert(a-b);  
}  
  
add.call(sub,3,1); 

```
//用 add 来替换 sub，add.call(sub,3,1) == add(3,1)
###注意：js 中的函数其实是对象，函数名是对 Function 对象的引用

call方法
```javascript

function Animal(){    
    this.name = "Animal";    
    this.showName = function(){    
        alert(this.name);    
    }    
}    
  
function Cat(){    
    this.name = "Cat"; 
    //this.showName = function(){     把animal.showName的方法放到cat上面执行
       // alert(this.name);    
    //}  
}    
   
var animal = new Animal();    
var cat = new Cat();    
    
//通过call或apply方法，将原本属于Animal对象的showName()方法交给对象cat来使用了。    
//输入结果为"Cat"    
animal.showName.call(cat,",");       //   Cat

// 错误： animal.call(cat)   这里的animal是一个对象，放到cat里面的只能是函数对象的引用，
//不能是实例化的animal对象，所以animal.showName函数对象的引用才可以

//animal.showName.apply(cat,[]);  
```

理解：  call 的意思是把 animal 的方法放到cat上执行，原来cat是没有showName() 方法，
现在是把animal 的showName()方法放到 cat上来执行，所以this.name 应该是 Cat


call方法实现继承

```javascript
function Animal(name){      
    this.name = name;         //   这里  this 就等于对象  animal  
    this.showName = function(){      
        alert(this.name);      
    }      
}      
    
function Cat(name){    
    Animal.call(this, name);    //相当于直接调用了animal里面的所有的属性和方法，这里函数名animal也是一个对象
    
                                //这里的一定要用this，不能像animal直接用函数名，这里的this指向  Cat{}  这个对象，
                                //如果用Cat则指向整个函数了 function Cat(name) ，所以一定要用this，否则call两边都是实例化的对象
    
    //this.name = name;      
    //this.showName = function(){      
       // alert(this.name);      
   // }  
    
}      
    
var cat = new Cat("Black Cat");     
cat.showName();     // Black Cat

```
理解： Animal.call(this) 的意思就是使用 Animal对象代替this对象，
那么 Cat中不就有Animal的所有属性和方法了吗，Cat对象就能够直接调用Animal的方法以及属性了.
















