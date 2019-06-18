import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setUserData} from "../../store/user";

import UserService from '../../services/user-service';

import AuthInput from '../../components/AuthInput';
import AuthPasswordInput from '../../components/AuthPasswordInput';
import AuthButton from '../../components/AuthButton';

import {FormContainer, AuthForm} from "../../components/StyledComponents";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            pass: '',
            passwordVisible: false,
            loginError: '',
            passError: ''
        };
        this.errors = {
            pass: 'password is empty',
            login: 'e-mail is empty'
        }
    }

    togglePassVisibility() {
        this.setState({passwordVisible: !this.state.passwordVisible});
    }

    setValue(key, value) {
        this.setState({[key]: value});
    }

    resetErrors() {
        this.setState({
            loginError: '',
            passError: ''
        })
    }

    validateEmail() {
        if (!this.state.login.length) {
            this.setState({loginError: this.errors.login});
            return false;
        }
        return true;
    }

    validatePass() {
        if (!this.state.pass.length) {
            this.setState({passError: this.errors.pass});
            return false;
        }
        return true;
    }

    validateForm() {
        this.resetErrors();
        const validLogin = this.validateEmail();
        const validPass = this.validatePass();
        return validLogin && validPass;
    }

    async setUSer(data) {
        const {_id, name, login} = data;
        const userData = {
            _id,
            name,
            login,
            loggedIn: true
        };
        await UserService.updateUserData(userData);
        await this.props.setUserData(userData);
    }

    sendForm() {
        if (this.validateForm()) {
            UserService.login(this.state.login, this.state.pass)
                .then(resp => this.setUSer(resp))
                .catch(err => this.setState({loginError: err}));
        }
    }



    render() {
        return (
            <FormContainer>
                <AuthForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.sendForm();
                    }}
                >
                    <AuthInput
                        value={this.state.login}
                        setValue={(value) => this.setValue('login', value)}
                        id="e-mail"
                        type="text"
                        error={this.state.loginError}
                    />
                    <AuthPasswordInput
                        value={this.state.pass}
                        setValue={(value) => this.setValue('pass', value)}
                        id="password"
                        visible={this.state.passwordVisible}
                        togglePass={() => this.togglePassVisibility()}
                        error={this.state.passError}
                    />
                    <AuthButton
                        value="Sign In"
                        send={()=>this.sendForm()}
                    />
                </AuthForm>
            </FormContainer>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    ({
        setUserData
    })
)(LoginForm);