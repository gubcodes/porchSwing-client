import React, {Component} from 'react';
import { ModalBody, ModalHeader, Modal } from 'reactstrap';

type PropsType = {
    title: string,
}

type State = {

}

export default class ItemViewShop extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
    }

    render() {
        return(
            <h1>{this.props.title}</h1>
        )
    }
}

