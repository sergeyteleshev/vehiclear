import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Graph from "./Graph";

export class SliderComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            graphWidth: 0,
            graphHeight: 0,
        };
    }

    handleResize = () => this.setState({
        graphWidth: document.getElementsByClassName("main-content__slider__slide")[0].getBoundingClientRect().width - 40,
        graphHeight: document.getElementsByClassName("slick-list")[0].getBoundingClientRect().height - 40,
    });

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        return <div onChange={this.handleResize} className={"main-content__slider"}>
            <Slider {...settings}>
                <div className={"main-content__slider__slide"}>
                    <h3 className={"main-content__slider__h3"}>
                        Делаем мир лучше
                    </h3>
                    <div className={"main-content__slider__div"}>
                        <p>Мы  компания, занимающаяся увозкой и переработкой старых автомобилей.</p>
                        <p>Делаем какую-то херню с 2007 года и вы должны в это нам поверить. Данных, конечно, мы не предоставим.</p>
                    </div>
                </div>
                <div className={"main-content__slider__slide"}>
                    <h3 className={"main-content__slider__h3"}>
                        Количество заброшенных машин
                    </h3>
                    <div className={"main-content__slider__div"}>
                        <Graph width={this.state.graphWidth} height={this.state.graphHeight}/>
                    </div>
                </div>
            </Slider>
            {/*<div className={"content__slider__buttons__navigator"}>*/}
            {/*    <div className={"content__slider__buttons__navigator__container"}>*/}
            {/*        <div className={"content__slider__buttons__navigator_span_selected"}/>*/}
            {/*        <div className={"content__slider__buttons__navigator_span"}/>*/}
            {/*        <div className={"content__slider__buttons__navigator_span"}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    }
}

export default SliderComponent;