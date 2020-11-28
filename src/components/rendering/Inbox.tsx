import React, { Component } from 'react';
import { Table } from 'reactstrap';

type PropsType = {
    inboxData: any,
    from: string,
    subject: string,
    message: string,
    read: boolean
}

type State = {

}

export default class Inbox extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return (
            <tr style={!this.props.read ? {fontWeight: 'bold'} : {fontWeight: 'normal'} }>
                <td>{this.props.from}</td>
                <td>{this.props.subject}</td>
                <td>{this.props.message}</td>
            </tr>
        )
    }
};