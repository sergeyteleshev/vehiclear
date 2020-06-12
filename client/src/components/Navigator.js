import React, {Component} from "react";
import {Link} from "react-router-dom";
import {ExportCarsURL, LoginURL, MainURL, RegisterURL} from "./consts/Links";
import {deleteCookie, getCookie} from "./helpers/helpers";

const initialState = {
    login: '',
};

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    logout = () =>
    {
        const userStr = getCookie('user');
        if(userStr && JSON.parse(userStr).login.length > 0)
        {
            deleteCookie('user');
            this.setState({...initialState});
            this.forceUpdate();
        }
    };

    componentDidMount() {
        const userStr = getCookie('user');
        if(userStr && userStr.length)
        {
            const {login} = JSON.parse(userStr);
            if(login)
                this.setState({login});
        }
    }

    render()
    {
        const greeting = <div className={"greeting"}>Привет, {this.state.login}!</div>;
        const logout = <span className={"logout"} onClick={this.logout}>Выйти</span>;
        const register = <Link to={RegisterURL}>Регистрация</Link>;
        const login = <Link to={LoginURL}>Войти</Link>;
        const userStr = getCookie('user');

        return <nav className={"navigator"}>
            <div className={"container"}>
                <div className={"left-nav"}>
                    <Link to={MainURL}>Главная</Link>
                    <Link to={ExportCarsURL}>Экспорт в csv</Link>
                </div>
                <div className={"right-nav"}>
                    {this.state.login.length ? greeting : null}
                    {(userStr && JSON.parse(userStr).login.length) ? logout : login}
                    {(userStr && JSON.parse(userStr).login.length) ? null : register}
                </div>
            </div>
        </nav>;
    }
}

export default Navigator;