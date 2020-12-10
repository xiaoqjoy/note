import React from "react";

import Page from "./page.js";   //这里引入了一个孙组件

class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            msg: '555555555'
        }
    }

    componentDidMount(){}

    toParent = () => {         //子组件Children传值(msg)给父组件Parent
        console.log(this)
        this.props.msg.getChildrenMsg(this, this.state.msg);
    }

    render(){
        return (
            <div>
                <div onClick={ this.toParent }>1111111111</div>
                -------------------------------------------------------++++++++++++++++
                <Page />
            </div>
            
        )
    }
}


export default Todo;