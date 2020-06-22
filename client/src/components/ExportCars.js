import React, {Component} from "react";
import Navigator from "./Navigator";
import {getCarsCsvMutation} from "../queries/queries";
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

    async downloadCsv()
    {
        const {dateFrom, dateTo} = this.state;
        console.log(this.props);
        console.log(dateFrom, dateTo);

        let newDateFrom = moment(dateFrom).format("MM/DD/YYYY");
        let newDateTo = moment(dateTo).format("MM/DD/YYYY");

        let response = {};

        try
        {
            response = await this.props.getCarsCsvMutation(newDateFrom, newDateTo)({
                variables: {
                    dateFrom: newDateFrom,
                    dateTo: newDateTo,
                }
            });

            console.log(response);

            // let link = document.createElement("a");
            // console.log(this.props.downloadCarsCsvQuery.Report.url);
            // window.open(this.props.downloadCarsCsvQuery.Report.url, null);
            // link.href = this.props.downloadCarsCsvQuery.Report.url;
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);

            this.setState({

            });
        }
        catch (e) {
            console.error(e);
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

export default graphql(getCarsCsvMutation, { name: "getCarsCsvMutation" })(ExportCars);