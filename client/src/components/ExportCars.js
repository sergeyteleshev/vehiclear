import React, {Component} from "react";
import Navigator from "./Navigator";

const moment = require('moment'); // require

class ExportCars extends Component {
    constructor(props) {
        super(props);
        const now = moment().format('YYYY-MM-DD');

        this.state = {
            dateFrom: '',
            dateTo: now,
        };
    }

    dateHandleChange(key, value)
    {
        this.setState({
            [key]: value,
        });
    }

    render()
    {
        const now = moment().format('YYYY-MM-DD');
        return <div className={"export-cars"}>
            <Navigator/>
            <div className={"container"}>
                <h1>Эскопрт данных о заброшенных машинах за определённый период</h1>
                <input max={now} value={this.state.dateFrom} onChange={e => {this.dateHandleChange('dateFrom', e.target.value)}} type={"date"}/>
                <input max={now} value={this.state.dateTo} onChange={e => {this.dateHandleChange('dateTo', e.target.value)}} type={"date"}/>
                <input type={"submit"} value={"Загрузить"}/>
            </div>
        </div>;
    }
}

export default ExportCars;