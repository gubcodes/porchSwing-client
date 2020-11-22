import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import ItemAddImage from '../modals/ItemAddImage.js';
import ShopEdit from '../modals/ShopEdit';

type PropsType = {
    title: string
}

type State = {
    isOpenItemAdd: boolean,
    isOpenShopEdit: boolean
}

class BackOffice extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.toggleItemAdd = this.toggleItemAdd.bind(this);
        this.toggleShopEdit = this.toggleShopEdit.bind(this);
        this.state = {
            isOpenItemAdd: false,
            isOpenShopEdit: false
        }
    }

    toggleItemAdd = () => {
        this.setState({
            isOpenItemAdd: (!this.state.isOpenItemAdd)
        })
    }
    toggleShopEdit = () => {
        this.setState({
            isOpenShopEdit: (!this.state.isOpenShopEdit)
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {
                localStorage.getItem('shopOwner') === 'false' 
                ? 
                //if they don't own a shop:
                <div>
                <h2>you haven't set up shop yet!</h2>
                <h4>let's get working on your very own storefront.</h4>
                <button onClick={this.toggleShopEdit}>start here</button>
                <Modal isOpen={this.state.isOpenShopEdit}>
                    <ShopEdit />
                </Modal>
                </div>
                : 
                //if they do own a shop:
                <div>
                <h3>oh hey shop owner!</h3>
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