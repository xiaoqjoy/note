import React from "react";
import { Link } from 'react-router-dom';

class Page2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                bbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                <div>
                    <Link to="/">
                        <p>go to home</p>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Page2;