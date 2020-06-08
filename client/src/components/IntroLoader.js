import React, {Component, Fragment} from "react";
import {gql} from 'apollo-boost';
import {Query} from 'react-apollo';
import Container from "react-bootstrap/Container";

export class IntroLoader extends Component {
    render() {
        return <div className={"introLoader"}>
            <Container>
                <div className={"logo"}>
                    <span className={"logo__span"}>VEHICLEAR!</span>
                    <div className={"logo__svg"}></div>
                </div>
                <div className={"tips"}>
                    Мы поможем освободить ваше парковочное место
                </div>
            </Container>
        </div>
    }
}

export default IntroLoader;