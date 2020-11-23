import React, { Component } from 'react';
import { Form, FormGroup, Modal, ModalBody, ModalHeader, Label, Input, Button } from 'reactstrap';

type PropsType = {
    updateToken: (token: string) => void;
    updateShopOwner: (isShopOwner: string) => void;
};

type State = {
    email: string,
    password: string,
    isOpen: boolean
};

export default class Login extends React.Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            email: '',
            password: '',
            isOpen: false
        };
    };

    handleSubmit(e: any) {
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;

        fetch('https://porchswing-server.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: email,
                    password: password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            this.props.updateToken(data.sessionToken);
            this.props.updateShopOwner(data.user.shopOwner); 
        })
    };

    toggleModal = () => {
        this.setState({
            isOpen: (!this.state.isOpen)
        })
    };

    render() {
        return (
            <div>
                <Modal isOpen={!this.state.isOpen}>
                    <FormGroup>
                        <Button id='buttonHover' type='submit' onClick={this.toggleModal}>X</Button>
                    </FormGroup>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor='email'>email</Label>
                                <Input onChange={(e: any) => this.setState({email: e.target.value})} name='email' type='email' value={this.state.email} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>password</Label>
                                <Input onChange={(e: any) => this.setState({password: e.target.value})} name='password' type='password' value={this.state.password} />
                            </FormGroup>
                            <FormGroup>
                                <Button id='buttonHover' type='submit'  onClick={this.toggleModal}>login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
};
