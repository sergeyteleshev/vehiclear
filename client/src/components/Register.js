import React, {Component} from "react";
import {LoginURL, MainURL} from "./consts/Links";
import {Link} from "react-router-dom";
import {addUserMutation} from "../queries/queries";
import { graphql } from 'react-apollo';
import {getCookie, setCookie} from "./helpers/helpers";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            passwordAgain: "",
            isRegistered: false,
            FIO: "",
            isResponseMessageShowing: false,
            responseMessage: "",
        };
    }

    async register(login, password, passwordAgain, FIO) {
        if(login.length > 0 && password.length > 0 && passwordAgain.length > 0 && FIO.length > 0 && password === passwordAgain)
        {
            try {
                const response = await this.props.addUserMutation({
                    variables: {
                        login,
                        password,
                        FIO,
                    }
                });

                if(response.login !== null)
                {
                    const user = response.data.addUser;
                    setCookie('user', JSON.stringify(user));

                    this.setState({
                        isRegistered: true,
                        isResponseMessageShowing: true,
                        responseMessage: "",
                    });
                }

            }
            catch (e) {
                console.error(e);
                this.setState({
                    isResponseMessageShowing: true,
                    responseMessage: "Такой юзер уже зарегистрирован",
                });
            }
        }
        else if(password !== passwordAgain)
        {
            this.setState({
                isResponseMessageShowing: true,
                responseMessage: "Несовпадают пароли!",
            });
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

        const {login, password, passwordAgain, FIO, isResponseMessageShowing,
            responseMessage} = this.state;

        const responseMessageDiv = isResponseMessageShowing ? <div className={"register-response-message message-error"}>{responseMessage}</div>: "";

        return <div className={"register-page"}>
            <div className={"register-logo"}>
                <span className={"register-logo__span"}>VEHICLEAR!</span>
                <div className={"logo__svg_black"}/>
            </div>
            <div className={"register-form"}>
                <input value={login} onChange={e => this.setState({login: e.target.value})} type={"text"} placeholder={"Логин"}/>
                <input value={FIO} onChange={e => this.setState({FIO: e.target.value})} type={"text"} placeholder={"ФИО"}/>
                <input value={password} onChange={e => this.setState({password: e.target.value})} type={"password"} placeholder={"Пароль"}/>
                <input value={passwordAgain} onChange={e => this.setState({passwordAgain: e.target.value})} type={"password"} placeholder={"Повторите пароль"}/>
                <div className={"register-action"}>
                    <input onClick={() => this.register(login, password, passwordAgain, FIO)} type={"submit"} value={"Зарегистрироваться"}/>
                    <Link to={LoginURL}>Есть аккаунт?</Link>
                </div>
            </div>
            {isResponseMessageShowing ? responseMessageDiv : ""}
            <div className={"register-tips"}>
                Мы поможем вам освободить парковочное место
            </div>
        </div>
    }
}

export default graphql(addUserMutation, { name: "addUserMutation" })(Register);