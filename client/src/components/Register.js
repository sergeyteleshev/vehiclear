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
            incorrectData: false,
            FIO: "",
        };
    }

    register(login, password)
    {
        const bcrypt = require('bcryptjs');

        if(login.length > 0 && password.length > 0)
        {
            this.props.addUserMutation({
                variables: {
                    login: this.state.login,
                    password: bcrypt.hash(this.state.password, 10),
                }
            });
        }
    }

    render() {
        const {login, password, passwordAgain, FIO} = this.state;

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
                    <input onClick={() => this.register(login, password)} type={"submit"} value={"Зарегистрироваться"}/>
                    <Link to={LoginURL}>Есть аккаунт?</Link>
                </div>
            </div>
            <div className={"register-tips"}>
                Мы поможем вам освободить парковочное место
            </div>
        </div>
    }
}

export default graphql(addUserMutation, { name: "addUserMutation" })(Register);