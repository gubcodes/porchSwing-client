import React, { Component } from 'react';
import { Form, FormGroup, Modal, ModalBody, Label, Input, Button } from 'reactstrap';
import { SliderPicker } from 'react-color';

type PropsType = {
    // title: string
}

type State = {
    
}

export default class ShopEdit extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return (
            <div>
                <ModalBody>

                    {/* <SliderPicker /> */}
                </ModalBody>
            </div>
        )
    }
};