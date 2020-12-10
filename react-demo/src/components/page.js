import React from "react";
import PropTypes from 'prop-types';    //react的类型检查PropTypes自React v15.5起已弃用，请使用prop-types


class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                { this.context.test }
            </div>
        )
    }
}


Page.contextTypes = {
    test: PropTypes.string
};

export default Page;