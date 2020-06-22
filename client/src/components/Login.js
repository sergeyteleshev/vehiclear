import React, {Component} from "react";
import {MainURL, RegisterURL} from "./consts/Links";
import {Link} from "react-router-dom";
import {authorizeUserMutation} from '../queries/queries';
import {graphql} from 'react-apollo'
import {getCookie, setCookie} from "./helpers/helpers";

class Login extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            isLogged: false,
            isResponseMessageShowing: false,
            responseMessage: "",
        };
    }

    async login(login, password)
    {
        if(login.length > 0 && password.length > 0)
        {
            let response = {};

            try {
                response = await this.props.authorizeUserMutation({
                    variables: {
                        login,
                        password: password,
                    }
                });

                const user = response.data.authorizeUser;
                setCookie('user', JSON.stringify(user));

                this.setState({
                    isLogged: true,
                    isResponseMessageShowing: false,
                    responseMessage: "",
                });
            }
            catch (e) {
                this.setState({
                    isLogged: false,
                    isResponseMessageShowing: false,
                    responseMessage: "Не удалось авторизоваться.",
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
        const userStr = getCookie('user');
        if(userStr && JSON.parse(userStr) && JSON.parse(userStr).login.length > 0)
        {
            this.props.history.push(MainURL);
        }

        console.log(this.props);
        const {login, password, isResponseMessageShowing, responseMessage} = this.state;

        const responseMessageDiv = isResponseMessageShowing ? <div className={"login-response-message login-message-error"}>{responseMessage}</div>: "";

        return <div className={"login-page"}>
            <div className={"login-logo"}>
                <span className={"login-logo__span"}>VEHICLEAR!</span>
                <div className={"logo__svg"}/>
            </div>
            <div className={"login-form"}>
                <input name="login" onChange={(e) => this.setState({login: e.target.value})} value={login} type={"text"} placeholder={"Логин"}/>
                <input name="password" onChange={(e) => this.setState({password: e.target.value})} value={password} type={"password"} placeholder={"Пароль"}/>
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