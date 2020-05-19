import React, {Component} from "react";
import {LoginURL, RegisterURL} from "./consts/Links";
import {Link} from "react-router-dom";

export class Register extends Component {
    render() {
        return <div className={"register-page"}>
            <div className={"register-logo"}>
                <span className={"register-logo__span"}>VEHICLEAR!</span>
                <div className={"logo__svg"}></div>
            </div>
            <div className={"register-form"}>
                <input type={"text"} placeholder={"register"}/>
                <input type={"password"} placeholder={"password"}/>
                <input type={"password"} placeholder={"password again"}/>
                <div className={"register-action"}>
                    <input type={"submit"} value={"Зарегистрироваться"}/>
                    <Link to={LoginURL}>Есть аккаунт?</Link>
                </div>
            </div>
            <div className={"register-tips"}>
                Мы поможем вам освободить ваше парковочное место
            </div>
        </div>
    }
}

export default Register;