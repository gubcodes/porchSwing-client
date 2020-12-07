import React, { Component, Fragment } from 'react';
import { Modal, CardGroup, Container, Row, Col,  } from 'reactstrap';
import ItemCardsStoreFront from '../rendering/ItemCardsStoreFront';
import SendMessage from '../modals/SendMessage';
import transparent_logo from '../../assets/images/transparent_logo.png';
import LineRed from '../../assets/images/lineFillBlack.png';

type PropsType = {
    title: string,
    senderUserName: string,
    getShoppingBag: () => void;
    toggleLoginModal: () => void;
}

type State = {
    shopData: any,
    itemData: any[],
    logo: string,
    shopName: string,
    shopDescription: string,
    isOpenSendMessage: boolean,
    shop: number,
    userName: string
}

class StoreFront extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.searchShops = this.searchShops.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.toggleSendMessage = this.toggleSendMessage.bind(this);
        this.getUser = this.getUser.bind(this);
        this.state = {
            shopData: {},
            itemData: [],
            logo: '',
            shopName: '',
            shopDescription: '',
            isOpenSendMessage: false,
            shop: 0,
            userName: ''
        }
    }

    toggleSendMessage = () => {
        this.setState({
            isOpenSendMessage: (!this.state.isOpenSendMessage)
        })
    }

    componentDidMount() {
        this.searchShops();
        this.searchItems();
        this.getUser();
    }

    searchShops = () => {
        let id = window.location.pathname.replace('/storefront/', '');
        fetch(`https://porchswing-server.herokuapp.com/shop/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    shopData: data,
                    logo: data.logo,
                    shopName: data.shopName,
                    shopDescription: data.shopDescription,
                    shop: data.userID
                });
                console.log(this.state.shopData);
            })
    };

    searchItems = () => {
        let id = window.location.pathname.replace('/storefront/', '');
        fetch(`https://porchswing-server.herokuapp.com/item/all/${id}`, {
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

    getUser = () => {
        console.log('getUser fired')
        fetch(`https://porchswing-server.herokuapp.com/userauth/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    userName: data.firstName
                });
                console.log(this.state.userName);
            })
    };

    render() {
        return (
            <div>
                {/* <h1>{this.props.title}</h1> */}
                <div>
                    <br/>
                    <Container className="ml-auto mr-auto">
                            {this.state.shopData.shopName === null
                                ?
                                <></>
                                :
                                <Fragment>
                                <Row>
                                    <Col>
                                    {/* <img src={this.state.shopLogo || filler_logo} alt='item-image' /> */}
                                    <img className='logoWidth' src={this.state.logo} />
                                    </Col>
                                    <Col>
                                    <h1>{this.state.shopName}</h1>
                                    <h4>{this.state.shopDescription}</h4>
                                    {
                                        localStorage.token 
                                        ?
                                        <button className='button' onClick={this.toggleSendMessage}>contact this shop</button>
                                        :
                                        <button className='button' onClick={this.props.toggleLoginModal}>contact this shop</button>
                                    }
                                    </Col>
                                    </Row>
                                    <Modal isOpen={this.state.isOpenSendMessage}>
                                        <SendMessage shopName={this.state.shopName} shop={this.state.shop} toggle={this.toggleSendMessage} senderUserName={this.state.userName} />
                                    </Modal>
                                    
                                    <Row>
                                        <Col>
                                        <br />
                                        <img className='lines alignLeft' src={LineRed} />
                                        <br/>
                                    <h2 className='centerText'>pieces currently available from {this.state.shopName}</h2>
                                    </Col>
                                    </Row>
                                    {/* map component to render our pieces as cards, unlimited */}
                                    <Container className="ml-auto mr-auto">
                                    <Row className="ml-auto mr-auto">
                                    {/* <CardGroup className='card-group m-9 itemCardStyles'> */}
                                        {this.state.itemData.map((potato) =>
                                            <ItemCardsStoreFront photo={potato.photo1} name={potato.itemName} shop={potato.userID} itemData={potato} getShoppingBag={this.props.getShoppingBag} toggleLoginModal={this.props.toggleLoginModal} />
                                        )}
                                    {/* </CardGroup> */}
                                </Row>
                                    </Container>
                                </Fragment>
                            }
                </Container>
                </div>
                </div>
        )
    }
}

export default StoreFront;

// in app.js: <StoreFront title='StoreFront'>