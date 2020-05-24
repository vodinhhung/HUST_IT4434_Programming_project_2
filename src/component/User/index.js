import { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    {

    }
)(User);