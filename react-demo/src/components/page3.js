import React from "react";

class Page3 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                {this.props.name}{this.props.children}
                33333333333333333333333333333333333333
            </div>
        )
    }
}

export default Page3;