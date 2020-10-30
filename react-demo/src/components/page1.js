import React from "react";
import Page3 from "./page3"
import { Link } from 'react-router-dom';

class Page1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    goRouter = () => {
        console.log(this.props.match)
        this.props.history.push('/page')
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                <Page3 name="kkk">我是吴海伟</Page3>
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                <h1 onClick={ this.goRouter }>page1 go to page</h1>
                <div>
                    <Link to="/">
                        <p>go to home</p>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Page1;