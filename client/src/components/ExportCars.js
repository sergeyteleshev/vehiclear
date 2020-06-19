import React, {Component} from "react";
import Navigator from "./Navigator";
import {downloadCarsCsvQuery} from "../queries/queries";
import {graphql} from 'react-apollo'

const moment = require('moment'); // require

class ExportCars extends Component {
    constructor(props) {
        super(props);
        const now = moment().format('YYYY-MM-DD');

        this.state = {
            dateFrom: '',
            dateTo: now,
            csvUrl: '',
        };
    }

    dateHandleChange(key, value)
    {
        this.setState({
            [key]: value,
        });
    }

    downloadCsv = () =>
    {
        const {dateFrom, dateTo} = this.state;
        let link = document.createElement("a");

        if(this.props.downloadCarsCsvQuery.Report)
        {
            window.open(this.props.downloadCarsCsvQuery.Report.url, null);
            link.href = this.props.downloadCarsCsvQuery.Report.url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    render()
    {
        const now = moment().format('YYYY-MM-DD');
        return <div className={"export-cars"}>
            <Navigator/>
            <div className={"container"}>
                <h1>Эскопрт данных о заброшенных машинах за определённый период</h1>
                <input max={now} value={this.state.dateFrom} onChange={e => {this.dateHandleChange('dateFrom', e.target.value)}} type={"date"}/>
                <input max={now} value={this.state.dateTo} onChange={e => {this.dateHandleChange('dateTo', e.target.value)}} type={"date"}/>
                <input onClick={() => this.downloadCsv()} type={"submit"} value={"Загрузить"}/>
            </div>
        </div>;
    }
}

export default graphql(downloadCarsCsvQuery, { name: "downloadCarsCsvQuery" })(ExportCars);