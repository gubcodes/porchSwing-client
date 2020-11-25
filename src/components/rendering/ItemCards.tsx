import React, {Component} from 'react';
import {
    Col,
    Card,
    CardBody,
    CardImg,
    CardGroup,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
    Form, FormGroup, Modal, ModalHeader, ModalBody, CardDeck
  } from "reactstrap";

type PropsType = {
    // itemData: any,
    photo: string,
    name: string
}

type State = {

}

export default class ItemCards extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
    }

    render() {
        return(
            <div>
            {/* <Col className='col-12'> */}
                <CardGroup className='card-group m-3'>
                    <Card className='card overflow-auto itemCardStyles'>
                        <CardImg src={this.props.photo} alt='item-img' />
                        <CardBody>
                            <CardTitle>
                                <p>{this.props.name}</p>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </CardGroup>
            {/* </Col> */}
            </div>
        )
    }
};