import React, { Component } from 'react';
import { Form, FormGroup, Modal, ModalBody, Label, Input, Button, ModalHeader } from 'reactstrap';
import { SliderPicker } from 'react-color';

type PropsType = {
    toggle: () => void;
    updateShopOwner: (isShopOwner: string) => void;
}

type State = {
    shopName: string,
    payName: string,
    shopDescription: string,
    logo: string,
    color1: string,
    color2: string,
    color3: string,
    open: boolean
}

export default class ShopEdit extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        // this.handleBoth = this.handleBoth.bind(this);
        this.state = {
            shopName: '',
            payName: '',
            shopDescription: '',
            logo: '',
            color1: '',
            color2: '',
            color3: '',
            open: false
        }
    }

    handleSubmit(e: any) {
        e.preventDefault();
        let shopName = this.state.shopName;
        let payName = this.state.payName;
        let shopDescription = this.state.shopDescription;
        let logo = this.state.logo;
        let color1 = this.state.color1;
        let color2 = this.state.color2;
        let color3 = this.state.color3;
        let open = this.state.open;

        fetch('https://porchswing-server.herokuapp.com/shopauth/', {
            method: 'POST',
            body: JSON.stringify({
                shopdata: {
                    shopName: shopName,
                    payName: payName,
                    shopDescription: shopDescription,
                    logo: logo,
                    color1: color1,
                    color2: color2,
                    color3: color3,
                    open: open
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
            this.handleSubmitUpdate();
            this.newShopMessage();
        })
    };

    handleSubmitUpdate() {
        // e.preventdefault();
        //updating user to be a shop owner
        fetch('https://porchswing-server.herokuapp.com/userauth/edit', {
            method: 'PATCH',
            body: JSON.stringify({
                user: {
                    shopOwner: true
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
            console.log('edit shop owner')
            //update shop owner status in local storage:
            this.props.updateShopOwner('true');
        });
    };
    // //wrapping both fetches together for onSubmit:
    // send shopowner message:
    newShopMessage = () => {
        let subjectData = `you're a shop owner!`;
        let body = `congrats! you're well on your way to start selling your pieces. if you have any questions or comments, just respond and let us know we can help. get selling!\n----------`;
        let senderUserName = 'porchSwing'; //from user name
        let receiverUserName = this.state.shopName; //to user name (or shop name)

        fetch('https://porchswing-server.herokuapp.com/chatauth/admin', {
            method: 'POST',
            body: JSON.stringify({
                chatdata: {
                    subject: subjectData,
                    message: body,
                    // receiverUserID: receiverUserID, //taken from req
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
        })
    };

    render() {
        return (
            <div>
                {/* <FormGroup>
                        <Button id='buttonHover' type='submit' onClick={this.props.toggle}>X</Button>
                    </FormGroup> */}
                    <ModalHeader className='modalHeader' toggle={this.props.toggle}>
                    <h4 className='modalHeaderText'>setting up shop</h4>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        {/* shop name */}
                        <FormGroup>
                            <Label htmlFor='shop name'>shop name</Label>
                            <Input onChange={(e: any) => this.setState({shopName: e.target.value})} name='shop name' value={this.state.shopName} />
                        </FormGroup>
                        {/* shop description */}
                        <FormGroup>
                        <Label htmlFor='shop description'>shop description</Label>
                            <Input onChange={(e: any) => this.setState({shopDescription: e.target.value})} name='shop description' type='textarea' value={this.state.shopDescription} />
                        </FormGroup>
                        <FormGroup>
                            <div className='centerText'>
                            <button id='buttonhover' className='button centerText' type='submit' onClick={this.props.toggle}>update storefront</button>
                            </div>
                        </FormGroup>
                    </Form>
                    {/* <SliderPicker /> */}
                </ModalBody>
            </div>
        )
    }
};