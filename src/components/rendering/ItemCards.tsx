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
  import ItemViewBackOffice from '../modals/ItemViewBackOffice';

type PropsType = {
    itemData: any,
    photo: string,
    name: string,
    getItems: () => void;
}

type State = {
    isOpenItemViewBackOffice: boolean
}

export default class ItemCards extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
        this.toggleItemViewBackOffice = this.toggleItemViewBackOffice.bind(this);
        this.toggleAndGetItems = this.toggleAndGetItems.bind(this);
        this.state = {
            isOpenItemViewBackOffice: false
        }
    }

    toggleItemViewBackOffice = () => {
        this.setState({
            isOpenItemViewBackOffice: (!this.state.isOpenItemViewBackOffice)
        })
    }

    toggleAndGetItems() {
        this.props.getItems();
        this.toggleItemViewBackOffice();
    }

    render() {
        return(
            // <div>
            <Col className='col-4'>
                {/* <CardGroup className='card-group m-3'> */}
                    <Card onClick={this.toggleItemViewBackOffice} className='card overflow-auto pointer'>
                        <CardImg src={this.props.photo} alt='item-img' />
                        <CardBody>
                            <CardTitle>
                                <h5>{this.props.name}</h5>
                                {
                                    this.props.itemData.available
                                    ?
                                    <></>
                                    :
                                    <p className='centerText redText'>(not currently available)</p>
                                }
                            </CardTitle>
                        </CardBody>
                        <Modal isOpen={this.state.isOpenItemViewBackOffice} toggle={this.toggleItemViewBackOffice}>
                            <ItemViewBackOffice itemData={this.props.itemData} toggle={this.toggleItemViewBackOffice} getItems={this.props.getItems} toggleAndGetItems={this.toggleAndGetItems} />
                        </Modal>
                    </Card>
                {/* </CardGroup> */}
            </Col>
            // </div>
        )
    }
};