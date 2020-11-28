import React, { Component, FormEvent } from 'react';
import { Form, FormGroup, Modal, ModalBody, ModalHeader, Label, Input, Button } from 'reactstrap';

type PropsType = {
    updateToken: (token: string) => void;
    updateShopOwner: (isShopOwner: string) => void;
    toggle: () => void;
    changeUserName: (userFirstName: string) => void;
}

type State = {
    firstName: string,
    lastName: string,
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string,
    isOpen: boolean,
    shopOwner: boolean
}

export default class Register extends React.Component<PropsType, State> {
    constructor(props: PropsType) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            isOpen: false,
            shopOwner: false
        };
    };

    handleSubmit(event: FormEvent) {
        event.preventDefault();
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let password = this.state.password;
        let shopOwner = this.state.shopOwner;

        //add try + if statements here to validate email + password 

        fetch('https://porchswing-server.herokuapp.com/user/register', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    shopOwner: shopOwner
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
            this.props.changeUserName(data.user.firstName);
            //add function from titlebar that stores username in variable
        })
    };

    // toggleModal() {
    //     this.setState({
    //         isOpen: (!this.state.isOpen)
    //     })
    // };

    render() {
        return (
            <div>
                {/* <Modal isOpen={!this.state.isOpen}> */}
                    <FormGroup>
                        <Button id='buttonHover' type='submit' onClick={this.props.toggle}>X</Button>
                    </FormGroup>
                    {/* <ModalHeader /> */}
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor='first name'>first name</Label>
                                <Input onChange={(e: any) => this.setState({firstName: e.target.value})} name='first name' value={this.state.firstName} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='last name'>last name</Label>
                                <Input onChange={(e: any) => this.setState({lastName: e.target.value})} name='last name' value={this.state.lastName} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='email'>email</Label>
                                <Input onChange={(e: any) => this.setState({email: e.target.value})} name='email' type='email' value={this.state.email} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='confirm email'>confirm email</Label>
                                <Input onChange={(e: any) => this.setState({confirmEmail: e.target.value})} name='confirm email' type='email' value={this.state.confirmEmail} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>password</Label>
                                <Input onChange={(e: any) => this.setState({password: e.target.value})} name='password' type='password' value={this.state.password} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='confirm password'>confirm password</Label>
                                <Input onChange={(e: any) => this.setState({confirmPassword: e.target.value})} name='confirm password' type='password' value={this.state.confirmPassword} />
                            </FormGroup>
                            <FormGroup>
                                <Button id='buttonHover' type='submit'  onClick={this.props.toggle}>sign up</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                {/* </Modal> */}
            </div>
        )
    }
}

// export default Register;

// in app.js: <Landing title='Landing'>
{/* <h1>{this.props.title}</h1> //this will say whatever you pass down as props */ }