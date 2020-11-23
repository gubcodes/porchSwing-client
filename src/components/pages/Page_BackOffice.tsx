import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import ItemAddImage from '../modals/ItemAddImage.js';
import ShopAddImage from '../modals/ShopAddImage.js';
import ShopEdit from '../modals/ShopEdit';
import filler_logo from '../../assets/images/filler_logo.png';

type PropsType = {
    title: string
    updateShopOwner: (isShopOwner: string) => void;
}

type State = {
    isOpenItemAdd: boolean,
    isOpenShopEdit: boolean,
    isOpenShopAddImage: boolean
}

class BackOffice extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.toggleItemAdd = this.toggleItemAdd.bind(this);
        this.toggleShopEdit = this.toggleShopEdit.bind(this);
        this.toggleShopEdit = this.toggleShopEdit.bind(this);
        this.state = {
            isOpenItemAdd: false,
            isOpenShopEdit: false,
            isOpenShopAddImage: false
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
    }

    const GetShopData = () => {
        fetch('https://porchswing-server.herokuapp.com/shop/:id', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token //may not be necessary - or it may be necessary, might need to add a protected route in the controller to get shop by user ID (without it being in the url)
            })
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {
                localStorage.getItem('shopOwner') !== 'true' 
                ? 
                //if they don't own a shop:
                <div>
                <h2>you haven't set up shop yet!</h2>
                <h4>let's get working on your very own storefront.</h4>
                <button onClick={this.toggleShopEdit}>start here</button>
                <Modal isOpen={this.state.isOpenShopEdit}>
                    <ShopEdit toggle={this.toggleShopEdit} updateShopOwner={this.props.updateShopOwner} />
                </Modal>
                </div>
                : 
                //if they do own a shop:
                <div>
                <h3>oh hey shop owner!</h3>
                <img src={filler_logo} />
                <br/>
                <button onClick={this.toggleShopAddImage}>upload logo</button>
                <Modal isOpen={this.state.isOpenShopAddImage}>
                    <ShopAddImage toggle={this.toggleShopAddImage} />
                </Modal>
                <br/>
                {/* <img src={url || 'http://via.placeholder.com/100x100'} alt='item-image' /> */}
                <button onClick={this.toggleItemAdd}>add piece</button>
                <Modal isOpen={this.state.isOpenItemAdd}>
                    <ItemAddImage toggle={this.toggleItemAdd} />
                </Modal>
                </div>
                }
            </div>
        )
    }
}

export default BackOffice;

// in app.js: <BackOffice title='BackOffice'>