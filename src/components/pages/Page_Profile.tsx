import React, { Component } from 'react';
import Inbox from '../rendering/Inbox';
import Outbox from '../rendering/Outbox';
import { Table } from 'reactstrap';

type PropsType = {
    title: string;
    currentUserName: string;
}

type State = {
    inboxData: any[],
    outboxData: any[],
    renderInbox: boolean,
    // renderOutbox: boolean
}

export default class Profile extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.fetchInbox = this.fetchInbox.bind(this);
        this.fetchOutbox = this.fetchOutbox.bind(this);
        this.toggleInboxRender = this.toggleInboxRender.bind(this);
        // this.toggleOutboxRender = this.toggleOutboxRender.bind(this);
        this.state = {
            inboxData: [],
            outboxData: [],
            renderInbox: true,
            // renderOutbox: false
        }
    }

    fetchInbox = () => {
        fetch(`https://porchswing-server.herokuapp.com/chatauth/inbox`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    inboxData: data
                });
                console.log(this.state.inboxData);
            })
    };

    fetchOutbox = () => {
        fetch(`https://porchswing-server.herokuapp.com/chatauth/outbox`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    outboxData: data
                });
                console.log(this.state.outboxData);
            })
    };

    toggleInboxRender = () => {
        this.setState({
            renderInbox: (!this.state.renderInbox),
            // renderOutbox: (!this.state.renderOutbox)
        })
    }

    // toggleOutboxRender = () => {
    //     this.setState({
    //         renderOutbox: (!this.state.renderOutbox),
    //         renderInbox: (!this.state.renderInbox)
    //     })
    // }

    componentDidMount() {
        this.fetchInbox();
        this.fetchOutbox();
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h3>welcome back, {this.props.currentUserName}</h3>
                {
                this.state.renderInbox === true
                ?
                <div className='centerText'>
                    <button className='button' id='buttonHover' type='button' >received</button>
                </div>
                :
                <div className='centerText'>
                    <button className='button' id='buttonHover' type='button' onClick={this.toggleInboxRender}>received</button>
                </div>
                }
                {
                this.state.renderInbox === false
                ?
                <div className='centerText'>
                    <button className='button' id='buttonHover' type='button' >sent</button>
                </div>
                :
                <div className='centerText'>
                    <button className='button' id='buttonHover' type='button' onClick={this.toggleInboxRender}>sent</button>
                </div>
                }
                {
                this.state.renderInbox
                ?
                <div>
                    <Table className='table' size='sm'>
                    <thead>
                        <tr>
                            <th>from</th>
                            <th>subject</th>
                            <th>message</th>
                        </tr>
                    </thead>
                    <tbody>
                {this.state.inboxData.map((potato) =>
                    <Inbox inboxData={potato} from={potato.senderUserName} subject={potato.subject} message={potato.message} read={potato.read} />
                    )}
                    </tbody>
                    </Table>
                </div>
                :
                <div>
                    <Table className='table' size='sm'>
                    <thead>
                        <tr>
                            <th>to</th>
                            <th>subject</th>
                            <th>message</th>
                        </tr>
                    </thead>
                    <tbody>
                {this.state.outboxData.map((potato) =>
                    <Outbox outboxData={potato} to={potato.receiverUserName} subject={potato.subject} message={potato.message} />
                    )}
                    </tbody>
                    </Table>
                </div>
                }
            </div>
        )
    }
};