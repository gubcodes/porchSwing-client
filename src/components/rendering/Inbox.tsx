import React, { Component } from 'react';
import { Table, Modal } from 'reactstrap';
import SendMessageFromInbox from '../modals/SendMessageFromInbox';

type PropsType = {
    inboxData: any,
    from: string,
    subject: string,
    message: string,
    read: boolean,
    currentUserName: string,
    currentUserID: number,
    fetchInbox: () => void;
    fetchOutbox: () => void;
}

type State = {
    isOpenSendMessage: boolean
}

export default class Inbox extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.state = {
            isOpenSendMessage: false
        }
    }

    toggleSendMessage = () => {
        this.setState({
            isOpenSendMessage: (!this.state.isOpenSendMessage)
        })
    }

    render() {
        return (
            // <a href='#'>
            <tr style={!this.props.read ? {fontWeight: 'bold'} : {fontWeight: 'normal'} }
            onClick={this.toggleSendMessage}>
                <td>{this.props.from}</td>
                {/* <td>{this.props.subject}</td> */}
                {
                    this.props.subject.length > 20
                    ?
                    <td>{this.props.subject.slice(0,20)}. . .</td>
                    :
                    <td>{this.props.subject}</td>
                }
                {
                    this.props.message.length > 30
                    ?
                    <td><a className='messageLink' href='#'>{this.props.message.substring(0, this.props.message.indexOf(`----------`)).slice(0,40)}. . .</a></td>
                    // <td><a className='messageLink' href='#'>{this.props.message.slice(0,40)}...</a></td>
                    :
                    <td><a className='messageLink' href='#'>{this.props.message}</a></td>
                }
                {/* <td><a className='messageLink' href='#'>{this.props.message}</a></td> */}
                <Modal isOpen={this.state.isOpenSendMessage}>
                    <SendMessageFromInbox receiverFirstName={this.props.from} receiverUserID={this.props.inboxData.senderUserID} toggle={this.toggleSendMessage} senderUserName={this.props.currentUserName} senderUserID={this.props.currentUserID} messageID={this.props.inboxData.id} subject={this.props.subject} message={this.props.message} fetchInbox={this.props.fetchInbox} fetchOutbox={this.props.fetchOutbox} sentTime={this.props.inboxData.createdAt} />
                </Modal>
                {/* TODO: pass down those props coming in up above AND these ones from the table to this sendmessagefrominbox */}
            </tr>
            // </a>
        )
    }
};