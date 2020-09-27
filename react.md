export default class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <img src={pic} style={{width: 193, height: 110}} />
    );
  }
}


{}     //和vue 不同  用的是 单括号


npm config set registry https://registry.npm.taobao.org --global       npm设置淘宝镜像
npm config set disturl https://npm.taobao.org/dist --global


class ShoppingList extends React.Component {              //组件的写法
    render() {
        return (
        <div className="shopping-list">
        </div>
        );
    }
}

export default ShoppingList;    //输出组件


react脚手架安装

npm install -g create-react-app

create-react-app my-app

cd my-app

npm start



HTML 里的 class 在 JSX 里要写成 className，因为 class 在 JS 里是保留关键字
同理某些属性比如 for 要写成 htmlFor

React 在这个 Virtual DOM 上实现了一个 diff 算法，当要重新渲染组件的时候，会通过 diff 寻找到要变更的 DOM 节点，
再把这个修改更新到浏览器实际的 DOM 节点上，所以实际上不是真的渲染整个 DOM 树



注释 在一个组件的子元素位置使用注释要用 {} 包起来

1.constructor()-----super()的基本含义


constructor()——构造方法

       这是ES6对类的默认方法，通过 new 命令生成对象实例时自动调用该方法。并且，该方法是类中必须有的，
如果没有显示定义，则会默认添加空的constructor( )方法。


super() ——继承

    在class方法中，继承是使用 extends 关键字来实现的。子类 必须 在 constructor()调用 super()方法，
	否则新建实例时会报错。

    报错的原因是：子类是没有自己的 this 对象的，它只能继承自父类的 this 对象，然后对其进行加工，
而super()就是将父类中的this对象继承给子类的。没有 super，子类就得不到 this 对象。


-------------------------------------------------------------

React 使用 JSX 来替代常规的 JavaScript

JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。
它是类型安全的，在编译过程中就能发现错误。
使用 JSX 编写模板更加简单快速。


React JSX


const element = <h1>Hello, world!</h1>;


--------------------------------------------



原型链

prototype、__proto__、constructor


对象   构造函数


这说明一个对象所拥有的属性不仅仅是它本身拥有的属性，它还会从其他对象中继承一些属性。
当js在一个对象中找不到需要的属性时，它会到这个对象的父对象上去找，以此类推，这就构成了对象的原型链。



function foo(name){             //f.constructor
    this.name = name
}

foo.prototype.show = function(){				//f.__proto__
    console.log('i am' + this.name)
}

var f1 = new foo('aaa')         //实例化
var f2 = new foo('bbb')

f.show()


// f 对象



每个对象都有一个方法hasOwnProperty()来检查对象本身是否有某个属性，如果有则返回true；如果这个属性在它的原型链上或原型链上都没有，则返回false；



__proto__才是真正连接原型链的东西，而prototype只是构造函数的一个指针属性而已



每一个对象都有属于自己的属性和方法，同时还有自己的原型链__proto__，里面有属性和方法，还具有constructor和__proto__，__proto__还具有constructor和__proto__，逐级下沉


---------------------------------------------





















