import React, { Component } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51HqtlNFbOjNmnOEQhozxFoJLw3EZVhYKDtEMQo6Exmx5XgO3zp4cxscik7FHjkM8SdbKyoz78YIlIXr28VVL8hVW00jRKXb2Jm');

type State = {

}

type PropsType = {
    title: string
}

export default class ShoppingCart extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
    }



    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <Elements stripe={stripePromise}>
                    <CardElement />
                </Elements>
            </div>
        )
    }
};