import React, { Component } from "react";

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg: '000000000000000000'
        }
    }

    render(){
        const { msg } = this.state;
        return (
        <div>{ msg }------{ this.props.info }</div>
        )
    }
}

export default Test;