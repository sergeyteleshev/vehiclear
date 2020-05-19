import React, {Component} from "react";
import {RegisterURL} from "./consts/Links";
import {Link} from "react-router-dom";

export class Login extends Component {
    render() {
        return <div className={"login-page"}>
            <div className={"login-logo"}>
                <span className={"login-logo__span"}>VEHICLEAR!</span>
                <div className={"logo__svg"}></div>
            </div>
            <div className={"login-form"}>
                <input type={"text"} placeholder={"login"}/>
                <input type={"password"} placeholder={"password"}/>
                <div className={"login-action"}>
                    <input type={"submit"} value={"Войти"}/>
                    <Link to={RegisterURL}>Ещё нет аккаунта?</Link>
                </div>
            </div>
            <div className={"login-tips"}>
                Мы поможем вам освободить ваше парковочное место
            </div>
        </div>
    }
}

export default Login;