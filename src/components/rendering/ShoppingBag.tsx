import React, { Component } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
// import { Button } from 'reactstrap';
// import { timeStamp } from 'console';

const stripePromise = loadStripe('pk_test_51HqtlNFbOjNmnOEQhozxFoJLw3EZVhYKDtEMQo6Exmx5XgO3zp4cxscik7FHjkM8SdbKyoz78YIlIXr28VVL8hVW00jRKXb2Jm');

type PropsType = {
    bagItemData: any,
    bagItemID: number,
    bagItemCartID: number,
    getShoppingBag: () => void;
}

type State = {
    itemData: any
}

export default class Cart extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.getItem = this.getItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            itemData: {}
        }
    }

    getItem = () => {
        fetch(`https://porchswing-server.herokuapp.com/item/${this.props.bagItemID}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    itemData: data
                });
                console.log(this.state.itemData);
            })
    };

    removeItem = () => {
        fetch(`https://porchswing-server.herokuapp.com/cartauth/${this.props.bagItemCartID}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => {
                console.log(res)
                this.props.getShoppingBag();
            })
    };

    componentDidMount() {
        this.getItem();
        console.log('fired');
        console.log(this.props.bagItemData);
    }

    render() {
        return (
            <tr>
                {
                    this.state.itemData === {}
                    ?
                    <td>you don't have any pieces in your bag</td>
                    :
                    <td><img className='shoppingBagImage' src={this.state.itemData.photo1} /></td>
                }
                {
                    this.state.itemData.length === 0
                    ?
                    <td> </td>
                    :
                    <td>{this.state.itemData.itemName}</td>
                }
                {
                    this.state.itemData.length === 0
                    ?
                    <td> </td>
                    :
                    <td>{this.state.itemData.quantity}</td>
                }
                {
                    this.state.itemData.length === 0
                    ?
                    <td> </td>
                    :
                    <td>{this.state.itemData.price}</td>
                }
                <td><button className='button' onClick={this.removeItem}>x</button></td>
            </tr>
        )
    }
};