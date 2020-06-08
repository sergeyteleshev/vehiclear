import React, {Component, useState} from "react";
import {RegisterURL} from "./consts/Links";
import {Link} from "react-router-dom";
import {addUserMutation } from '../queries/queries';
import { graphql } from 'react-apollo'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            incorrectData: false,
        };
    }

    render() {
        const {login, password} = this.state;

        return <div className={"login-page"}>
            <div className={"login-logo"}>
                <span className={"login-logo__span"}>VEHICLEAR!</span>
                <div className={"logo__svg"}></div>
            </div>
            <div className={"login-form"}>
                <input name="login" onChange={(e) => this.setState({login: e.target.value})} value={login} type={"text"} placeholder={"login"}/>
                <input name="password" onChange={(e) => this.setState({password: e.target.value})} value={password} type={"password"} placeholder={"password"}/>
                <div className={"login-action"}>
                    <input onClick={this.tryLogin} type={"submit"} value={"Войти"}/>
                    <Link to={RegisterURL}>Ещё нет аккаунта?</Link>
                </div>
            </div>
            <div className={"login-tips"}>
                Мы поможем вам освободить парковочное место
            </div>
        </div>
    }
}

export default graphql(addUserMutation, { name: "addUserMutation" })(Login);