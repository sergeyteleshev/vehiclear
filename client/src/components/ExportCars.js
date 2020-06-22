import React, {Component} from "react";
import Navigator from "./Navigator";
import {getCsvReportMutation} from "../queries/queries";
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
            errorMessage: '',
            error: false,
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

        if(moment(dateFrom).isValid() && moment(dateTo).isValid())
        {
            let newDateFrom = moment(dateFrom).format("MM/DD/YYYY");
            let newDateTo = moment(dateTo).format("MM/DD/YYYY");

            let response = {};

            try
            {
                response = await this.props.getCsvReportMutation({
                    variables: {
                        dateFrom: newDateFrom,
                        dateTo: newDateTo,
                    }
                });

                const csvDownloadUrl = response.data.getCsvReport.url;

                if(csvDownloadUrl && csvDownloadUrl.length)
                {
                    let link = document.createElement("a");
                    link.href = csvDownloadUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        else
        {
            this.setState({
                errorMessage: 'Заполните все поля!',
                error: true,
            })
        }
    };

    render()
    {
        const now = moment().format('YYYY-MM-DD');
        return <div className={"export-cars"}>
            <Navigator/>
            <div className={"container"}>
                <h2>Эскопрт данных о заброшенных машинах за определённый период</h2>
                <div className={"export-cars_inputs"}>
                    <input max={now} value={this.state.dateFrom} onChange={e => {this.dateHandleChange('dateFrom', e.target.value)}} type={"date"}/>
                    <input max={now} value={this.state.dateTo} onChange={e => {this.dateHandleChange('dateTo', e.target.value)}} type={"date"}/>
                    <input onClick={() => this.downloadCsv()} type={"submit"} value={"Загрузить"}/>
                </div>
            </div>
            <div className={"export-cars-error"}>
                <div className={"container"}>
                    {this.state.error ? this.state.errorMessage : null}
                </div>
            </div>
        </div>;
    }
}

export default graphql(getCsvReportMutation, { name: "getCsvReportMutation" })(ExportCars);