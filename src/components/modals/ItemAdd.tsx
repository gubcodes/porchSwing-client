import React, { Component } from 'react';
import { Form, FormGroup, Modal, ModalBody, ModalHeader, Label, Input, Button } from 'reactstrap';
import Firebase from '../firebase/firebasetest';

type PropsType = {
    // title: string
}

type State = {
    isOpen: boolean,
    // userID: number,
    itemName: string,
    itemDescription: string,
    price: number,
    quantity: number,
    photo1: string,
    photo2: string,
    photo3: string,
    available: boolean
}

export default class ItemAdd extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleAvailable = this.toggleAvailable.bind(this);
        this.state = {
            isOpen: false,
            // userID: 0,
            itemName: '',
            itemDescription: '',
            price: 0.00,
            quantity: 1,
            photo1: '',
            photo2: '',
            photo3: '',
            available: false
        }
    }

    handleSubmit(e: any) {
        e.preventDefault();
        let itemName = this.state.itemName;
        let itemDescription = this.state.itemDescription;
        let price = this.state.price;
        let quantity = this.state.quantity;
        let photo1 = this.state.photo1;
        let photo2 = this.state.photo2;
        let photo3 = this.state.photo3;
        let available = this.state.available;

        fetch('https://porchswing-server.herokuapp.com/itemauth/', {
            method: 'POST',
            body: JSON.stringify({
                itemdata: {
                    itemName: itemName,
                    itemDescription: itemDescription,
                    price: price,
                    quantity: quantity,
                    photo1: photo1,
                    photo2: photo2,
                    photo3: photo3,
                    available: available
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
        })
    };

    toggleModal = () => {
        this.setState({
            isOpen: (!this.state.isOpen)
        })
    };

    toggleAvailable = () => {
        this.setState({
            available: (!this.state.available)
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={!this.state.isOpen}>
                    <FormGroup>
                        <Button id='buttonHover' type='submit' onClick={this.toggleModal}>X</Button>
                    </FormGroup>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            {/* piece name */}
                            <FormGroup>
                                <Label htmlFor='item name'>piece name</Label>
                                <Input onChange={(e: any) => this.setState({ itemName: e.target.value })} name='item name' value={this.state.itemName} />
                            </FormGroup>
                            {/* piece description */}
                            <FormGroup>
                                <Label htmlFor='item description'>piece description</Label>
                                <Input onChange={(e: any) => this.setState({ itemDescription: e.target.value })} name='item description' value={this.state.itemDescription} />
                            </FormGroup>
                            {/* quantity available */}
                            <FormGroup>
                                <Label htmlFor='quantity'>quantity available?</Label>
                                <Input onChange={(e: any) => this.setState({ quantity: e.target.value })} name='quantity' value={this.state.quantity} />
                            </FormGroup>
                            {/* available now? */}
                            <FormGroup check>
                                <Label check>
                                    <Input type='checkbox' />{!this.toggleAvailable}
                                    available now?
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button id='buttonHover' type='submit' onClick={this.toggleModal}>add piece</Button>
                                {/* make button also open ItemAddImage */}
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
};