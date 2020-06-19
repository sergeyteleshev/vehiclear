import React, { PureComponent } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import Area from "recharts/es6/cartesian/Area";
import AreaChart from "recharts/es6/chart/AreaChart";

const data = [
    {
        name: 'Декабрь', pv: 2400, amt: 2400,
    },
    {
        name: 'Январь', pv: 1398, amt: 2210,
    },
    {
        name: 'Февраль', pv: 9800, amt: 2290,
    },
    {
        name: 'Март', pv: 3908, amt: 2000,
    },
    {
        name: 'Апрель', pv: 4800, amt: 2181,
    },
    {
        name: 'Май', pv: 3800, amt: 2500,
    },
    {
        name: 'Июнь', pv: 4300, amt: 2100,
    },
];

export default class Graph extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    render() {
        return (
            <AreaChart width={this.props.width} height={this.props.height} data={data}
                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        );
    }
}