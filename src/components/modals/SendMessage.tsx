import React, { Component } from 'react';
import { ModalHeader, Form, FormGroup, Modal, ModalBody, Label, Input, Button } from 'reactstrap';

type PropsType = {
    toggle: () => void;
    shop: number;
    shopName: string;
    senderUserName: string
}

type State = {
    subjectData: string,
    body: string
}

export default class SendMessage extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            subjectData: '',
            body: ''
        }
    }

    handleSubmit(e: any) {
        e.preventDefault();
        console.log(this.props.shop);
        console.log(this.props.senderUserName);
        let subjectData = this.state.subjectData;
        let body = this.state.body + '\n----------';
        let receiverUserID = this.props.shop;
        let senderUserName = this.props.senderUserName;
        let receiverUserName = this.props.shopName;

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
        })
    };

    render() {
        return (
            <div>
                <ModalHeader className='modalHeader' toggle={this.props.toggle}>
                <h4 className='modalHeaderText'>to: {this.props.shopName}</h4>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
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