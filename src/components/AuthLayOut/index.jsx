import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class AuthLayOut extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="general-layout">
                <div className='auth-header'>
                    <Link to="/auth/login">Sign In</Link>
                    <Link to="/auth/register">Sign Up</Link>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthLayOut);