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
import ItemViewStoreFront from '../modals/ItemViewStoreFront';

type PropsType = {
    photo: string,
    name: string,
    shop: number,
    itemData: any,
    getShoppingBag: () => void;
    toggleLoginModal: () => void;
}

type State = {
    isOpenItemViewSearch: boolean
}

export default class ItemCardsStoreFront extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
        this.toggleItemViewSearch = this.toggleItemViewSearch.bind(this);
        this.state = {
            isOpenItemViewSearch: false
        }
    }

    toggleItemViewSearch = () => {
        this.setState({
            isOpenItemViewSearch: (!this.state.isOpenItemViewSearch)
        })
    }

    render() {
        return(
            // <div>
            <Col className='col-4'>
                {/* <CardGroup className='card-group m-3'> */}
                <CardGroup>
                    <Card onClick={this.toggleItemViewSearch} className='card overflow-auto pointer'>
                        <CardBody>
                        <CardImg src={this.props.photo} alt='item-img' />
                        <div className='centerText'>
                        <p>{this.props.name}</p>
                        </div>
                            {/* <a href="#" onClick={this.toggleItemViewSearch} className='stretched-link'></a> */}
                        </CardBody>
                        <Modal isOpen={this.state.isOpenItemViewSearch} toggle={this.toggleItemViewSearch}>
                            <ItemViewStoreFront itemData={this.props.itemData} shopID={this.props.shop} toggle={this.toggleItemViewSearch} getShoppingBag={this.props.getShoppingBag} toggleLoginModal={this.props.toggleLoginModal}/>
                        </Modal>
                    </Card>
                </CardGroup>
            </Col>
            // </div>
        )
    }
};

//itemName: string,
    //itemDescription: string,
    //shopName: string,
    //shopID: number,
    //toggle: () => void;