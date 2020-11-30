import React, { Component } from 'react';
import { ModalBody, ModalHeader, Modal, Button } from 'reactstrap';
import ItemAddImage from './ItemAddImage';

type PropsType = {
    itemData: any,
    shopID: number,
    toggle: () => void;
}

type State = {
    addedToCart: boolean
}

export default class ItemViewSearch extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.toggleAddedToCart = this.toggleAddedToCart.bind(this);
        this.state = {
            addedToCart: false
        }
    }

    addItemToCart = () => {
        fetch(`https://porchswing-server.herokuapp.com/cartauth/`, {
            method: 'POST',
            body: JSON.stringify({
                cartdata: {
                    itemID: this.props.itemData.id,
                    shopUserID: this.props.itemData.userID,
                    quantity: 1
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
            this.toggleAddedToCart();
        })
    };

    toggleAddedToCart = () => {
        this.setState({
            addedToCart: (!this.state.addedToCart)
        })
    }

    render() {
        return (
            <div>
                <ModalHeader className='modalHeader' toggle={this.props.toggle}>
                    {this.props.itemData.itemName}
                </ModalHeader>
                <ModalBody>
                    {
                    this.state.addedToCart === true
                    ?
                    <h3>piece added to bag!</h3>
                    :
                    <div>
                    <img src={this.props.itemData.photo1} />
                    <p>{this.props.itemData.itemDescription}</p>
                    <h4>${this.props.itemData.price}</h4>
                    <button onClick={this.addItemToCart} className='button'>add to bag</button>
                    <button className='button'><a href={`/storefront/${this.props.shopID}`}>visit shop</a></button>
                    </div>
    }
                </ModalBody>
            </div>
        )
    }
};