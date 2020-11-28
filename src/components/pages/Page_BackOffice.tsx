import React, { Component } from 'react';
import { Modal, Container, Row, ModalHeader } from 'reactstrap';
import ItemAddImage from '../modals/ItemAddImage.js';
import ShopAddImage from '../modals/ShopAddImage.js';
import ShopEdit from '../modals/ShopEdit';
import ItemCards from '../rendering/ItemCards'
import filler_logo from '../../assets/images/filler_logo.png';
import { isExternalModuleNameRelative, isTemplateMiddleOrTemplateTail } from 'typescript';

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
    itemName: any
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
            itemName: null
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
                shopDescription: data.shopDescription
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

    //calling the fetches to get the shop data and items from the DB
    componentDidMount() {
        this.getShopInfo();
        this.getItems();
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {
                localStorage.getItem('shopOwner') !== 'true' 
                ? 
                //if they don't own a shop:
                <div className='centerText'>
                <h2>you haven't set up shop yet!</h2>
                <h4>let's get working on your very own storefront.</h4>
                <button onClick={this.toggleShopEdit}>start here</button>
                <Modal isOpen={this.state.isOpenShopEdit}>
                    <ShopEdit toggle={this.toggleShopEdit} updateShopOwner={this.props.updateShopOwner} />
                </Modal>
                </div>
                : 
                //if they do own a shop:
                <div className='centerText'>
                <h3>oh hey shop owner!</h3>
                {/* <img src={filler_logo} /> */}
                <img src={this.state.shopLogo || filler_logo} alt='item-image' />
                {/* <img src={this.state.shopLogo} alt='item-image' /> */}
                <br/>
                <button className='button' onClick={this.toggleShopAddImage}>upload logo</button>
                <br/>
                <h2>{this.state.shopName}</h2>
                <br/>
                <h4>{this.state.shopDescription}</h4>
                <Modal isOpen={this.state.isOpenShopAddImage} toggle={this.toggleShopAddImage}>
                    <ShopAddImage toggle={this.toggleShopAddImage} />
                </Modal>
                <br/>
                {/* <img src={url || 'http://via.placeholder.com/100x100'} alt='item-image' /> */}
                <button className='button' onClick={this.toggleItemAdd}>add piece</button>
                <Modal isOpen={this.state.isOpenItemAdd} toggle={this.toggleItemAdd}>
                    <ItemAddImage toggle={this.toggleItemAdd} />
                </Modal>
                <div>
                    {this.state.itemData.length === 0 
                    ?
                    <h4>you don't have any pieces yet!</h4>
                    :
                    <div>
                    <h3>your pieces</h3>
                    {/* map component to render our pieces as cards */}
                    {this.state.itemData.map((potato) => 
                    <ItemCards photo={potato.photo1} name={potato.itemName}/>
                    // <ItemCards itemData={this.state.itemData} />
                    )}
                    </div>
                }
                </div>
                </div>
                }
                
            </div>
        )
    }
}

export default BackOffice;

// in app.js: <BackOffice title='BackOffice'>