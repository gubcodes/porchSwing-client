import React, { Component } from 'react';
import { ModalHeader, Form, FormGroup, Modal, ModalBody, Label, Input, Button } from 'reactstrap';

type PropsType = {
    toggle: () => void;
    receiverUserID: number;
    receiverFirstName: string;
    senderUserName: string;
    senderUserID: number;
    messageID: number;
    subject: string;
    message: string;
    fetchInbox: () => void;
    fetchOutbox: () => void;
    sentTime: string;
}

type State = {
    subjectData: string,
    body: string
}

export default class SendMessageFromInbox extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateRead = this.updateRead.bind(this);
        this.state = {
            subjectData: `re: ${this.props.subject}`,
            body: `\n----------\nresponding to ${this.props.receiverFirstName}'s message:\n${this.props.message}`
        }
    }
    
    handleSubmit(e: any) {
        e.preventDefault();
        console.log('receiver: ', this.props.receiverFirstName);
        console.log('sender: ', this.props.senderUserName);
        let subjectData = this.state.subjectData;
        let body = this.state.body;
        let receiverUserID = this.props.receiverUserID; //to user id
        let senderUserName = this.props.senderUserName; //from user name
        let receiverUserName = this.props.receiverFirstName; //to user name (or shop name)

        fetch('https://porchswing-server.herokuapp.com/chatauth/', {
            method: 'POST',
            body: JSON.stringify({
                chatdata: {
                    subject: subjectData,
                    message: body,
                    receiverUserID: receiverUserID,
                    read: false,
                    senderUserName: senderUserName,
                    receiverUserName: receiverUserName
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data);
            //TODO: add outbox rerender here
            {this.props.fetchOutbox()} //working
        })
    };

    updateRead = () => {
        console.log('updateRead fired')
        fetch(`https://porchswing-server.herokuapp.com/chatauth/${this.props.messageID}`, {
            method: 'PATCH',
            body: JSON.stringify({}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            console.log('message marked as read:true')
            this.props.fetchInbox();
        });
    }

    componentDidMount() {
        this.updateRead();
    }
    // sent = {`${new Date(Date.parse(this.props.sentTime).toDateString()}`}
    render() {
        return (
            <div>
                <ModalHeader toggle={this.props.toggle}>
                    {/* add toggle button and ternary to show the message THEN show the response form */}
                    <h4>from: {this.props.receiverFirstName}</h4>
                {/* <FormGroup>
                    <Button id='buttonHover' type='submit' onClick={this.props.toggle}>X</Button>
                </FormGroup> */}
                </ModalHeader>
                <ModalBody>
                {/* <h4>from: {this.props.receiverFirstName}</h4> */}
                    <h5>subject: {this.props.subject}</h5>
                    <p>{this.props.message.substring(0, this.props.message.indexOf(`----------`))}</p>
            <span>sent: {new Date(Date.parse(this.props.sentTime)).toDateString()}</span>
                    <hr/>
                    <Form onSubmit={this.handleSubmit}>
                        <h5>responding to: {this.props.receiverFirstName}</h5>
                        <FormGroup>
                        <Label htmlFor='message subject'>subject</Label>
                        <Input onChange={(e: any) => this.setState({subjectData: e.target.value})} name='message subject' value={this.state.subjectData} />
                        </FormGroup>
                        <FormGroup>
                        <Label htmlFor='message body'>message</Label>
                        <Input onChange={(e: any) => this.setState({body: e.target.value})} name='message body' type='textarea' value={this.state.body} />
                        </FormGroup>
                        <FormGroup>
                        <div className='centerText'>
                            <button className='button' id='buttonHover' type='submit' onClick={this.props.toggle}>send message</button>
                        </div>
                    </FormGroup>
                    </Form>
                </ModalBody>
            </div>
        )
    }
};