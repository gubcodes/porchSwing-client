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
import ItemViewSearch from '../modals/ItemViewSearch';

type PropsType = {
    photo: string,
    name: string,
    shop: number,
    // itemData: any
}

type State = {
    // isOpenItemViewSearch: boolean
}

export default class ItemCardsSearch extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
        // this.toggleItemViewSearch = this.toggleItemViewSearch.bind(this);
        this.state = {
            // isOpenItemViewSearch: false
        }
    }

    // toggleItemViewSearch = () => {
    //     this.setState({
    //         isOpenItemViewSearch: (!this.state.isOpenItemViewSearch)
    //     })
    // }

    render() {
        return(
            <Col className='col-4'>
                    <Card className='card overflow-auto'>
                        <CardBody>
                            <CardImg src={this.props.photo} alt='item-img' />
                            <p>{this.props.name}</p>
                            <a href={`/storefront/${this.props.shop}`} className='stretched-link'></a>
                        </CardBody>
                    </Card>
            </Col>
        )
    }
};

//itemName: string,
    //itemDescription: string,
    //shopName: string,
    //shopID: number,
    //toggle: () => void;