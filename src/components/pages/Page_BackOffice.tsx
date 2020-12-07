import React, { Component, Fragment } from 'react';
import { Modal, Container, Row, ModalHeader, Col } from 'reactstrap';
import ItemAddImage from '../modals/ItemAddImage.js';
import ShopAddImage from '../modals/ShopAddImage.js';
import ShopEdit from '../modals/ShopEdit';
import ItemCards from '../rendering/ItemCards'
import filler_logo from '../../assets/images/filler_logo.png';
import { isExternalModuleNameRelative, isTemplateMiddleOrTemplateTail } from 'typescript';
import box from '../../assets/images/box.png';
import redLine from '../../assets/images/lineFillBlack.png';

type PropsType = {
    title: string,
    updateShopOwner: (isShopOwner: string) => void;
}

type State = {
    isOpenItemAdd: boolean,
    isOpenShopEdit: boolean,
    isOpenShopAddImage: boolean,
    shopData: any[],
    shopLogo: string,
    shopName: string,
    shopDescription: string,
    itemData: any[],
    photo1: any,
    itemName: any,
    openSign: boolean,
}

class BackOffice extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.toggleItemAdd = this.toggleItemAdd.bind(this);
        this.toggleShopEdit = this.toggleShopEdit.bind(this);
        this.toggleShopEdit = this.toggleShopEdit.bind(this);
        this.getShopInfo = this.getShopInfo.bind(this);
        this.state = {
            isOpenItemAdd: false,
            isOpenShopEdit: false,
            isOpenShopAddImage: false,
            shopData: [],
            shopLogo: '',
            shopName: '',
            shopDescription: '',
            itemData: [],
            photo1: null,
            itemName: null,
            openSign: false
        }
    }

    toggleItemAdd = () => {
        this.setState({
            isOpenItemAdd: (!this.state.isOpenItemAdd)
        })
    }
    toggleShopAddImage = () => {
        this.setState({
            isOpenShopAddImage: (!this.state.isOpenShopAddImage)
        })
    }
    toggleShopEdit = () => {
        this.setState({
            isOpenShopEdit: (!this.state.isOpenShopEdit)
        })
        this.getShopInfo();
    }

    getShopInfo = () => {
        fetch('https://porchswing-server.herokuapp.com/shopauth/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                data ?
                    this.setState({
                        shopData: data,
                        shopLogo: data.logo,
                        shopName: data.shopName,
                        shopDescription: data.shopDescription,
                        openSign: data.open
                    }) : console.log('no data returned getShopInfo');
                // this.getItems();
            })
    }

    getItems = () => {
        fetch('https://porchswing-server.herokuapp.com/itemauth/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    itemData: data,
                    photo1: data.photo1,
                    itemName: data.itemName
                });
                console.log(this.state.itemData);
                console.log(this.state.itemName);
            })
    }

    flipTheSign = () => {
        fetch('https://porchswing-server.herokuapp.com/shopauth/flip', {
            method: 'PATCH',
            body: JSON.stringify({
                shopdata: {
                    open: !this.state.openSign
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            console.log('sign flipped client')
            this.setState({
                openSign: !this.state.openSign
            })
        })
    };

    //calling the fetches to get the shop data and items from the DB
    componentDidMount() {
        this.getShopInfo();
        this.getItems();
    }

    render() {
        return (
            <Container className="ml-auto mr-auto">
                {
                    localStorage.getItem('shopOwner') !== 'true'
                        ?
                        //if they don't own a shop:
                        <div className='centerText'>
                            <h2>you haven't set up shop yet!</h2>
                            <img className='boxWidth' src={box}/>
                            <h4>let's get working on your very own storefront.</h4>
                            <button className='button' onClick={this.toggleShopEdit}>start here</button>
                            <Modal isOpen={this.state.isOpenShopEdit}>
                                <ShopEdit toggle={this.toggleShopEdit} updateShopOwner={this.props.updateShopOwner} />
                            </Modal>
                        </div>
                        :
                        //if they do own a shop:
                        <Fragment>
                            <Row>
                                <Col>
                                <br/>
                            <h3 className='centerText'>welcome back!</h3>
                            </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col className='alignRight'>
                            <img className='logoWidth'src={this.state.shopLogo || filler_logo} alt='item-image' />
                            <br />
                            
                            </Col>
                            <Col>
                            <h2>{this.state.shopName}</h2>
                            <br />
                            <h4>{this.state.shopDescription}</h4>
                            <button className='button' onClick={this.toggleShopAddImage}>upload logo</button>
                            </Col>
                            </Row>
                            <Modal isOpen={this.state.isOpenShopAddImage} toggle={this.toggleShopAddImage}>
                                <ShopAddImage toggle={this.toggleShopAddImage} />
                            </Modal>
                            <br />
                            {/* <img src={url || 'http://via.placeholder.com/100x100'} alt='item-image' /> */}
                            {/* <button className='button' onClick={this.toggleItemAdd}>add piece</button> */}
                            <Modal isOpen={this.state.isOpenItemAdd} toggle={this.toggleItemAdd}>
                                <ItemAddImage toggle={this.toggleItemAdd} getItems={this.getItems} />
                            </Modal>
                            <div>
                                {this.state.openSign === true
                                ?
                                <div className='centerText'>
                                    <h2>your shop is open for business!</h2>
                                    <p>the door is propped open, guests are welcome!</p>
                                    {/* make this phrase a random array of positive messages, could also make it show if items have been sold! or numbers of dollars made on the site... later.*/}
                                    <button onClick={this.flipTheSign} className='button'>flip the sign?</button>
                                </div>
                                :
                                <div className='centerText'>
                                <h2>your shop is closed!</h2>
                                <p>the door is locked. your shop will not appear in search results.</p>
                                <button onClick={this.flipTheSign} className='button'>flip the sign?</button>
                            </div>
                                }
                            </div>
                            <div className='centerText'>
                            <img className='linesOffice' src={redLine}/>
                            </div>
                            <br/>
                            <div className='centerText'>
                            
                                {this.state.itemData.length === 0
                                    ?
                                    <div>
                                    <h4>you don't have any pieces yet!</h4>
                                    <button className='button' onClick={this.toggleItemAdd}>add piece</button>
                                    </div>
                                    :
                                    <div>
                                        <h4>your pieces</h4>
                                        <button className='button' onClick={this.toggleItemAdd}>add piece</button>
                                        <br/>
                                        <br/>
                                        {/* map component to render our pieces as cards */}
                                        <Row>
                                        {this.state.itemData.map((potato) =>
                                            <ItemCards photo={potato.photo1} name={potato.itemName} itemData={potato} getItems={this.getItems} />
                                            // <ItemCards itemData={this.state.itemData} />
                                        )}
                                        </Row>
                                    </div>
                                }
                            </div>
                        </Fragment>
                }

            </Container>
        )
    }
}

export default BackOffice;

// in app.js: <BackOffice title='BackOffice'>