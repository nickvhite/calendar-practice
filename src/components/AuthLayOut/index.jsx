import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {Header, HeaderLink} from "../StyledComponents";

class AuthLayOut extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="general-layout">
                <Header className='auth-header'>
                    <HeaderLink to="/auth/login">Sign In</HeaderLink>
                    <HeaderLink to="/auth/register">Sign Up</HeaderLink>
                </Header>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthLayOut);