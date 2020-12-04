import React, { Component } from 'react';
import Inbox from '../rendering/Inbox';
import Outbox from '../rendering/Outbox';
import SendMessage from '../modals/SendMessage';
import { Table, Modal, Container, Row, Col } from 'reactstrap';

type PropsType = {
    title: string;
    currentUserName: string;
}

type State = {
    inboxData: any[],
    outboxData: any[],
    renderInbox: boolean,
    isOpenSendMessage: boolean,
    userName: string,
    userID: number,
    receiverFirstName: string,
    receiverID: number
}

export default class Profile extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.fetchInbox = this.fetchInbox.bind(this);
        this.fetchOutbox = this.fetchOutbox.bind(this);
        this.toggleInboxRender = this.toggleInboxRender.bind(this);
        this.getUser = this.getUser.bind(this);
        // this.toggleOutboxRender = this.toggleOutboxRender.bind(this);
        this.state = {
            inboxData: [],
            outboxData: [],
            renderInbox: true,
            isOpenSendMessage: false,
            userName: '',
            userID: 0,
            receiverFirstName: '',
            receiverID: 0
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
                console.log('fetchInbox', this.state.inboxData);
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
                console.log('fetchOutbox', this.state.outboxData);
            })
    };

    getUser = () => {
        console.log('getUser fired')
        fetch(`https://porchswing-server.herokuapp.com/userauth/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    userName: data.firstName,
                    userID: data.id
                });
                console.log(this.state.userName);
            })
    };

    toggleInboxRender = () => {
        this.setState({
            renderInbox: (!this.state.renderInbox),
            // renderOutbox: (!this.state.renderOutbox)
        })
    }

    // toggleSendMessage = () => {
    //     this.setState({
    //         isOpenSendMessage: (!this.state.isOpenSendMessage)
    //     })
    // }

    // setReceiverInfo = (inboxData: any) => {
    //     this.setState({
    //         receiverFirstName: inboxData.firstName,
    //         receiverID: inboxData.id
    //     })
    // }

    componentDidMount() {
        this.fetchInbox();
        this.fetchOutbox();
        this.getUser();
    }

    render() {
        return (
            <Container className="ml-auto mr-auto">
                <div className='centerText'>
                <h3>welcome back, {this.state.userName}!</h3>
                </div>
                <Row>
                    <Col>
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
                </Col>
                <Col>
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
                </Col>
                </Row>
                {
                    this.state.renderInbox
                        ?
                        <div>
                            <Table className='table' size='sm'>
                                <thead>
                                    <tr>
                                        <th className='width20'>from</th>
                                        <th className='width30'>subject</th>
                                        <th>message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.inboxData.slice(0).reverse().map((potato) =>
                                        <Inbox inboxData={potato} from={potato.senderUserName} subject={potato.subject} message={potato.message} read={potato.read} currentUserName={this.state.userName} currentUserID={this.state.userID} fetchInbox={this.fetchInbox} fetchOutbox={this.fetchOutbox} />
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        :
                        <div>
                            <Table className='table' size='sm'>
                                <thead>
                                    <tr>
                                        <th className='width20'>to</th>
                                        <th className='width30'>subject</th>
                                        <th>message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.outboxData.slice(0).reverse().map((potato) =>
                                        <Outbox outboxData={potato} to={potato.receiverUserName} subject={potato.subject} message={potato.message} />
                                    )}
                                </tbody>
                            </Table>
                        </div>
                }
                {/* <Modal isOpen={this.state.isOpenSendMessage}>
                    <SendMessage shopName={this.state.receiverFirstName} shop={this.state.receiverID} toggle={this.toggleSendMessage} senderUserName={this.state.userName} />
                </Modal> */}
            </Container>
        )
    }
};