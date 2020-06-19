import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import gallery from '../img/gallery.svg';
// import camera from '../img/camera.svg';
import SliderComponent from "./widgets/SliderComponent";
import {LoginURL} from "./consts/Links";
import {Link} from "react-router-dom";
import {getCookie} from "./helpers/helpers";
import Navigator from "./Navigator";
import {addCarMutation} from "../queries/queries";
import {graphql} from 'react-apollo'

class Main extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isMapShowing: false,
            latitude: null,
            longitude: null,
        }
    }

    success = position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        if(latitude && longitude)
        {
            this.setState({
                latitude,
                longitude,
            });
        }
        else
        {
            this.setState({
                isMapShowing: true,
            })
        }
    };

    error = () => {
        this.setState({
            isMapShowing: true,
        })
    };

    geoFindMe = () =>
    {
        return navigator.geolocation.getCurrentPosition(this.success, this.error);
    };

    addCar = (event) =>
    {
        this.geoFindMe();
        this.setState({
            photo: event.target.files[0],
        });

        const userStr = getCookie('user');
        const {latitude, longitude, photo} = this.state;
        const location = [latitude, longitude];

        if(userStr && JSON.parse(userStr) && JSON.parse(userStr).login.length > 0 && latitude
            && longitude && photo)
        {
            // this.props.addCarMutation(location, photo, JSON.parse(userStr).login);
            console.log(location, photo, JSON.parse(userStr).login);
        }
    };

    render()
    {
        const userStr = getCookie('user');
        let authorizeButton = <Link to={LoginURL}><input type={"button"} className={"content__slider__buttons__login"} value={"Авторизоваться и получить баллы"}/></Link>
        let locationMessage = <p className={"location-message"}>
            Разрешите приложению получить ваше местоположение, если вы находитесь возле заброшенного автомобиля, чтобы мы знали откуда его забрать.
        </p>;

        if(userStr && JSON.parse(userStr) && JSON.parse(userStr).login.length > 0)
        {
            authorizeButton = null;
        }

        let inputs = <div className={"content__slider__buttons__gallery"}>
            <img src={gallery} className={"gallery-icon"} alt={"gallery-icon"}/>
            <label htmlFor="files" className="content__slider__buttons__gallery__button">Загрузить из галлереи</label>
            <input onChange={this.addCar} accept={"image/jpeg, image/png, image/jpg"} id="files" style={{visibility:'hidden'}} type="file"/>
        </div>;

        if(this.state.isMapShowing)
        {
            inputs = <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A64ee000127dd1f1b3ccb6758f7c95da14edd2be9ab71369dd7911f7ef6fcb2a2&amp;source=constructor"
                width="100%" height="400" frameBorder="0"></iframe>;

            locationMessage = <p className={"location-message"}>Не удалось получить ваше местоположение. Пожалуйста, отметьте на карте расположение машины.</p>
        }

        return <div className={"main"}>
            <Navigator/>
            <div className={"main-logo"}>
                <span className={"main-logo__span"}>VEHICLEAR!</span>
            </div>
            <div className={"main-content"}>
                <div className={"main-content__overflow-layout"}>
                    <Container>
                        <SliderComponent/>
                        <div className={"content__slider__buttons"}>
                            {locationMessage}
                            {/*<div className={"content__slider__buttons__camera"}>*/}
                            {/*    <img src={camera} className={"camera-icon"} alt={"camera icon"}/>*/}
                            {/*    <label htmlFor="files" className="content__slider__buttons__camera__button">Сфотографировать</label>*/}
                            {/*    <input accept="image/jpeg, image/png, image/jpg" capture="user" id="files" style={{visibility:'hidden'}} type="file"/>*/}
                            {/*</div>*/}
                            {inputs}
                            {authorizeButton}
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    }
}

export default graphql(addCarMutation, { name: "addCarMutation" })(Main);