import React, {Component} from "react";
import {RegisterURL} from "./consts/Links";
import {Link} from "react-router-dom";
import {authorizeUserMutation} from '../queries/queries';
import {graphql} from 'react-apollo'

const bcrypt = require('bcryptjs');

class Login extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            incorrectData: false,
            isLogged: false,
            isResponseMessageShowing: false,
            responseMessage: "",
        };
    }

    async login(login, password)
    {
        console.log(login, password);
        const hashPassword = await bcrypt.hash(password, 10);

        if(login.length > 0 && password.length > 0)
        {
            const response = await this.props.authorizeUserMutation({
                variables: {
                    login,
                    password: hashPassword,
                }
            });

            console.log(response);

            if(response.data !== null)
            {
                this.setState({isLogged: true});
            }
            else
            {
                this.setState({
                    isResponseMessageShowing: false,
                    responseMessage: "",
                });
            }
        }
        else
        {
            this.setState({
                isResponseMessageShowing: true,
                responseMessage: "Заполните все поля!",
            });
        }
    }

    render() {
        const {login, password, isResponseMessageShowing, responseMessage} = this.state;
        console.log(this.props);

        const responseMessageDiv = isResponseMessageShowing ? <div className={"login-response-message login-message-error"}>{responseMessage}</div>: "";

        return <div className={"login-page"}>
            <div className={"login-logo"}>
                <span className={"login-logo__span"}>VEHICLEAR!</span>
                <div className={"logo__svg"}></div>
            </div>
            <div className={"login-form"}>
                <input name="login" onChange={(e) => this.setState({login: e.target.value})} value={login} type={"text"} placeholder={"login"}/>
                <input name="password" onChange={(e) => this.setState({password: e.target.value})} value={password} type={"password"} placeholder={"password"}/>
                <div className={"login-action"}>
                    <input onClick={() => this.login(login, password)} type={"submit"} value={"Войти"}/>
                    <Link to={RegisterURL}>Ещё нет аккаунта?</Link>
                </div>
                {responseMessageDiv}
            </div>
            <div className={"login-tips"}>
                Мы поможем вам освободить парковочное место
            </div>
        </div>
    }
}

export default graphql(authorizeUserMutation, { name: "authorizeUserMutation" })(Login);