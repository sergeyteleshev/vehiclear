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
            location: null,
        };
    }

    componentWillMount() {
        this.geoFindMe();
    }

    success(e)
    {
        const latitude = e.coords.latitude;
        const longitude = e.coords.longitude;
        if(latitude && longitude)
        {
            this.setState({
                location: `${latitude} ${longitude}`,
            });
        }
        else
        {
            this.setState({
                isMapShowing: true,
            })
        }
    };

    error()
    {
        this.setState({
            isMapShowing: true,
        })
    };

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    base64toFile(dataurl, filename)
    {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type:mime});
    }

    geoFindMe()
    {
        return navigator.geolocation.getCurrentPosition((e) => this.success(e), (e) =>this.error(e));
    };

    addCar = async (event) =>
    {
        const {location} = this.state;
        const photoIn = event.target.files[0];
        const userStr = getCookie('user');
        let userCreated = '';
        this.setState({
            photo: photoIn,
        });

        const photoIn64 = await this.toBase64(photoIn);

        if(userStr && JSON.parse(userStr) && JSON.parse(userStr).login.length > 0
            && photoIn && location)
        {
            userCreated = JSON.parse(userStr).login;

            let response = {};

            try
            {
                console.log(location, userCreated, photoIn);
                response = await this.props.addCarMutation({
                    variables: {
                        location,
                        photoIn: photoIn64,
                        userCreated,
                    }
                });

                console.log(response.data);
            }
            catch (e) {
                console.error(e);
            }
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
            <input onChange={(e) => this.addCar(e)} accept={"image/jpeg, image/png, image/jpg"} id="files" style={{visibility:'hidden'}} type="file"/>
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
                            <img id={"test"} src={""}/>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    }
}

export default graphql(addCarMutation, { name: "addCarMutation" })(Main);