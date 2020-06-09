import React, {Component} from "react";
import {LoginURL} from "./consts/Links";
import {Link} from "react-router-dom";
import {addUserMutation} from "../queries/queries";
import { graphql } from 'react-apollo';

export class Register extends Component {
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
            isError: false,
        };
    }

    async register(login, password, passwordAgain, FIO) {
        if(login.length > 0 && password.length > 0 && passwordAgain.length > 0 && password === passwordAgain)
        {
            const response = await this.props.addUserMutation({
                variables: {
                    login,
                    password,
                    FIO,
                }
            });

            console.log(response);

            if(response.data !== null)
            {
                this.setState({isRegistered: true});
            }
            else
            {
                this.setState({
                    isResponseMessageShowing: false,
                    isError: false,
                    responseMessage: "",
                    isRegistered: true,
                });
            }
        }
        else if(password !== passwordAgain)
        {
            this.setState({
                isResponseMessageShowing: true,
                isError: true,
                responseMessage: "Несовпадают пароли!",
            });
        }
        else
        {
            this.setState({
                isResponseMessageShowing: true,
                isError: true,
                responseMessage: "Заполните все поля!",
            });
        }
    }

    render() {
        const {login, password, passwordAgain, FIO, isResponseMessageShowing,
            responseMessage, isError} = this.state;

        const responseMessageDiv = isError ? <div className={"register-response-message message-error"}>{responseMessage}</div>: "";

        return <div className={"register-page"}>
            <div className={"register-logo"}>
                <span className={"register-logo__span"}>VEHICLEAR!</span>
                <div className={"logo__svg_black"}></div>
            </div>
            <div className={"register-form"}>
                <input value={login} onChange={e => this.setState({login: e.target.value})} type={"text"} placeholder={"login"}/>
                <input value={FIO} onChange={e => this.setState({FIO: e.target.value})} type={"text"} placeholder={"FIO"}/>
                <input value={password} onChange={e => this.setState({password: e.target.value})} type={"password"} placeholder={"password"}/>
                <input value={passwordAgain} onChange={e => this.setState({passwordAgain: e.target.value})} type={"password"} placeholder={"password again"}/>
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