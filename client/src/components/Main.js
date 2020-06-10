import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import gallery from '../img/gallery.svg';
// import camera from '../img/camera.svg';
import SliderComponent from "./widgets/SliderComponent";
import {LoginURL} from "./consts/Links";
import {Link} from "react-router-dom";

export class Main extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isMapShowing: false,
            latitude: null,
            longitude: null,
        }
    }

    success(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }

    error() {
        this.setState({
            isMapShowing: true,
        })
    }

    getFindMe()
    {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    }

    addCar(event)
    {
        this.getFindMe();
        this.setState({
            photo: event.target.files[0],
        });

        console.log(this.state);
    }

    render()
    {
        return <div className={"main"}>
            <div className={"main-logo"}>
                <span className={"main-logo__span"}>VEHICLEAR!</span>
            </div>
            <div className={"main-content"}>
                <div className={"main-content__overflow-layout"}>
                    <Container>
                        <SliderComponent/>
                        <div className={"content__slider__buttons"}>
                            <p>Разрешите приложению получить ваше местоположение, если вы находитесь возле заброшенного автомобиля, чтобы мы знали откуда его забрать</p>
                            {/*<div className={"content__slider__buttons__camera"}>*/}
                            {/*    <img src={camera} className={"camera-icon"} alt={"camera icon"}/>*/}
                            {/*    <label htmlFor="files" className="content__slider__buttons__camera__button">Сфотографировать</label>*/}
                            {/*    <input accept="image/jpeg, image/png, image/jpg" capture="user" id="files" style={{visibility:'hidden'}} type="file"/>*/}
                            {/*</div>*/}
                            <div className={"content__slider__buttons__gallery"}>
                                <img src={gallery} className={"gallery-icon"} alt={"gallery-icon"}/>
                                <label htmlFor="files" className="content__slider__buttons__gallery__button">Загрузить из галлереи</label>
                                <input onChange={this.addCar} accept={"image/jpeg, image/png, image/jpg"} id="files" style={{visibility:'hidden'}} type="file"/>
                            </div>
                            <Link to={LoginURL}><input type={"button"} className={"content__slider__buttons__login"} value={"Авторизоваться и получить баллы"}/></Link>
                            <button onClick={() => this.geoFindMe()}>TEST</button>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    }
}

export default Main;