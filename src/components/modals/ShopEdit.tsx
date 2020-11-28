import React, { Component } from 'react';
import { Form, FormGroup, Modal, ModalBody, Label, Input, Button } from 'reactstrap';
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
    // handleBoth(e:any) {
    //     e.preventdefault();
    //     handleSubmit();
    //     handleSubmitUpdate();
    // }

    render() {
        return (
            <div>
                <FormGroup>
                        <Button id='buttonHover' type='submit' onClick={this.props.toggle}>X</Button>
                    </FormGroup>
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
                            <Button id='buttonhover' type='submit' onClick={this.props.toggle}>update storefront</Button>
                        </FormGroup>
                    </Form>
                    {/* <SliderPicker /> */}
                </ModalBody>
            </div>
        )
    }
};