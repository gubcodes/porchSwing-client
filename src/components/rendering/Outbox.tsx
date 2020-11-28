import React, { Component } from 'react';
import { Table } from 'reactstrap';

type PropsType = {
    outboxData: any,
    to: string,
    subject: string,
    message: string
}

type State = {

}

export default class Outbox extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.to}</td>
                <td>{this.props.subject}</td>
                <td>{this.props.message}</td>
            </tr>
        )
    }
};