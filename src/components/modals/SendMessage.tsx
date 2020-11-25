import React, { Component } from 'react';
import { ModalHeader, Form, FormGroup, Modal, ModalBody, Label, Input, Button } from 'reactstrap';

//TODO: add subject to chat model when dropping tables 

type PropsType = {
    toggle: () => void;
    shop: number;
}

type State = {
    // subject: string,
    body: string
}

export default class SendMessage extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);

        this.state = {
            // subject: '',
            body: ''
        }
    }

    handleSubmit(e: any) {
        e.preventDefault();
        // let subject = this.state.subject;
        let body = this.state.body;
        let receiverUserID = this.props.shop;

        fetch('https://porchswing-server.herokuapp.com/shopauth/', {
            method: 'POST',
            body: JSON.stringify({
                chatdata: {
                    // subject: subject,
                    message: body,
                    receiverUserID: receiverUserID 
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
                <FormGroup>
                    <Button id='buttonHover' type='submit' onClick={this.props.toggle}>X</Button>
                </FormGroup>
                <ModalBody>
                    <Form onsubmit={this.handleSubmit}>
                        {/* <FormGroup>
                        <Label htmlFor='message subject'>subject</Label>
                        <Input onChange={(e: any) => this.setState({subject: e.target.value})} name='message subject' value={this.state.subject} />
                        </FormGroup> */}
                        <FormGroup>
                        <Label htmlFor='message body'>message</Label>
                        <Input type='textarea' onChange={(e: any) => this.setState({body: e.target.value})} name='message body' value={this.state.body} />
                        </FormGroup>
                    </Form>
                </ModalBody>
            </div>
        )
    }
};