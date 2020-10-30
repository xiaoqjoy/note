import React from "react";
import { Link } from 'react-router-dom';


class home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                <h3>tttttttttttttttttttttttttttttttt</h3>
                <div>
                    <Link to="/page1">
                        <p>go to page1</p>
                    </Link>
                    <Link to="/page2">
                        <p>go to page2</p>
                    </Link>
                </div>
            </div>
        )
    }
}

export default home;