import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setUserData} from "../../store/user";

import UserService from '../../services/user-service';
import ValidationService from '../../services/validation-service';

import AuthInput from '../../components/AuthInput';
import AuthPasswordInput from '../../components/AuthPasswordInput';
import AuthButton from '../../components/AuthButton';

import {FormContainer, AuthForm} from "../../components/StyledComponents";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            pass: '',
            name: '',
            passwordVisible: false,
            loginError: '',
            passError: '',
            nameError: ''
        };
        this.errors = {
            pass: 'password is empty',
            login: 'e-mail is empty',
            name: 'name is empty',
            loginNotVal: 'email not valid',
            passNotVal: 'password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase letter'
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
            nameError: '',
            loginError: '',
            passError: ''
        })
    }

    validateName() {
        if (!this.state.name.length) {
            this.setState({nameError: this.errors.name});
            return false;
        }
        return true;
    }

    validateEmail() {
        if (!this.state.login.length) {
            this.setState({loginError: this.errors.login});
            return false;
        } else {
            if (!ValidationService.validEmail(this.state.login)) {
                this.setState({loginError: this.errors.loginNotVal});
                return false;
            }
            return true;
        }
    }

    validatePass() {
        if (!this.state.pass.length) {
            this.setState({passError: this.errors.pass});
            return false;
        } else {
            if (!ValidationService.validPass(this.state.pass)) {
                this.setState({passError: this.errors.passNotVal});
                return false;
            }
            return true;
        }
    }

    validateForm() {
        this.resetErrors();
        const validName = this.validateName();
        const validLogin = this.validateEmail();
        const validPass = this.validatePass();
        return validLogin && validPass && validName;
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
            UserService.register(this.state.login, this.state.pass, this.state.name)
                .then(response => this.setUSer(response))
                .catch(err => this.setState({loginError: err}));
        }
    }



    render() {
        return (
            <FormContainer>
                <AuthForm
                    className='auth-form login-form'
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.sendForm();
                    }}
                >
                    <AuthInput
                        value={this.state.name}
                        setValue={(value) => this.setValue('name', value)}
                        id="name"
                        type="text"
                        error={this.state.nameError}
                    />
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
                        value="Sign Up"
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
)(RegisterForm);