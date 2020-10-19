import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Todo from "./components/todo";
import Test from "./components/test";

import store from './store';



function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const user = {
  firstName: "Harper",
  lastName: "Perez",
};

const element = (
  <div>
    <h1>Hello!111111111</h1>
    <h2>Good to see you here.</h2>
  </div>
);

const aElement = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);

function Welcome(props) {
  //组件名称必须以大写字母开头
  return <h1>Hello, {props.name}</h1>;
}

function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img
      className="Avatar"
      title={props.user.name}
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function UserInfo(props) {
  //提取组件
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      {/*<div className="UserInfo">
                <Avatar user={props.author} />
                <div className="UserInfo-name">{props.author.name}</div>
            </div>*/}
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    name: "Hello Kitty",
    avatarUrl: "http://placekitten.com/g/64/64",
  },
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function handleClick(e) {
  e.preventDefault();
  console.log("click");

  /*const Person = {
      'name': 'little bear',
      'age': 18,
      'sayHello': function () {          //对象的括号是不能封闭作用域的。所以此时的this还是指向全局对象。
          console.log(this);
          console.log('我叫' + this.name + '我今年' + this.age + '岁!')
          return function(){
              console.log(this);
              //console.log('我叫' + this.name + '我今年' + this.age + '岁!')
          }

      }
  }
  //Person.sayHello();
  Person.sayHello()();*/

  /*function Person () {
      this.name = 'little bear';
      this.age = 18;
      let self = this;
      setInterval(function sayHello () {
          console.log('我叫' + self.name + '我今年' + self.age + '岁!')
      }, 1000)
  }
  let p = new Person()*/

  function Person() {
    this.name = "little bear";
    this.age = 18;
    console.log("我叫" + this.name + "我今年" + this.age + "岁");
    /*setInterval(() => {
        console.log('我叫' + this.name + '我今年' + this.age + '岁')
    },1000)*/
  }
  let p = new Person();
  return p;
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? "ON" : "OFF"}
        </button>
        <p>22222222222222222222222</p>
      </div>
    );
  }
}

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
        <ul>
          <li>33333</li>
        </ul>
      </div>
    );
  }
}

let pic = {
  url:
    "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg",
};

class UserComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "6666666",
    };
  }
  getUser() {
    console.log("neo");
  }
  renderData() {
    return <span>iiiiiiiiiiiiiiiiiiiiii</span>;
  }
  render() {
    return (
      <div className="user">
        neo
        <img src={pic.url} title="香蕉" alt="user" />
        <input type="button" value="点击" onClick={this.getUser} />
        <button onClick={() => console.log("button")}>1111click</button>
        <p>{this.state.value}</p>
        <p>{this.renderData()}</p>
      </div>
    );
  }
}




class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          childrenMsg: '',
          testMsg: '',
          info: 'iiiiiiiiiiiiiiii',

          inputValue: '',
          list: [],
          showMsg: false
      }

      this.state = store.getState;
  }

  getChildrenMsg = (result, msg) => {
    this.setState({
      childrenMsg: msg
    })
  }


  //父组件在调用子组件时，通过ref属性，拿到整个子组件<Test ref='test'>
  getTest = () => {
    console.log(this.refs['test'])
    this.setState({
      testMsg: this.refs['test'].state.msg   
    })
  }



  // 动态监听输入变化inputValue值
  handleInput(e) {
    // let inputValue = e.target.value; // 获取input值
    // this.setState({
    //   inputValue // 键值对相同时 可简写
    // });
    console.log(e)
    console.log(store)
    const action = {
      type: 'change_input_value',
      value: e.target.value
    }
    store.dispatch(action); // 解析action
  }


  //App组件类
  render() {
    return (
      <div className="App">
        <UserComponent></UserComponent>
        <img src={pic.url} alt="" style={{ width: 193, height: 110 }} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <span>2222222222222222222222</span>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Hello, {formatName(user)}!</h1>
        {element} {aElement}
        <Clock />
        <Toggle />
        <ShoppingList></ShoppingList>
        <a href="" className="click" onClick={handleClick}>
          click222222333333
        </a>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
        <Comment
          date={comment.date}
          text={comment.text}
          author={comment.author}
        />
        <Todo msg={ this }/>
        { this.state.childrenMsg }

        <Test ref="test" info={ this.state.info }/>
        <button onClick={ this.getTest }>btn</button>
        { this.state.testMsg }


        <input type="text" value={this.state.inputValue} onChange={this.handleInput}/>



      </div>
    );
  }
}

export default App;

/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {/!* TODO *!/}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/!* status *!/}</div>
                    <ol>{/!* TODO *!/}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
*/
