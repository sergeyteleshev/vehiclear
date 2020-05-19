import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import gallery from '../img/gallery.svg';
import camera from '../img/camera.svg';
import SliderComponent from "./widgets/SliderComponent";
import {LoginURL} from "./consts/Links";
import {Link} from "react-router-dom";

export class Main extends Component {
    render() {
        return <div className={"main"}>
            <div className={"main-logo"}>
                <span className={"main-logo__span"}>VEHICLEAR!</span>
            </div>
            <div className={"main-content"}>
                <div className={"main-content__overflow-layout"}>
                    <Container>
                        <SliderComponent/>
                        <div className={"content__slider__buttons"}>
                            <div className={"content__slider__buttons__camera"}>
                                <img src={camera} className={"camera-icon"}/>
                                <label htmlFor="files" className="content__slider__buttons__camera__button">Сфотографировать</label>
                                <input accept="image/jpeg, image/png, image/jpg" capture="user" id="files" style={{visibility:'hidden'}} type="file"/>
                            </div>
                            <div className={"content__slider__buttons__gallery"}>
                                <img src={gallery} className={"gallery-icon"}/>
                                <label htmlFor="files" className="content__slider__buttons__gallery__button">Загрузить из галлереи</label>
                                <input accept={"image/jpeg, image/png, image/jpg"} id="files" style={{visibility:'hidden'}} type="file"/>
                            </div>
                            <Link to={LoginURL}><input type={"button"} className={"content__slider__buttons__login"} value={"Авторизоваться и получить баллы"}/></Link>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    }
}

export default Main;