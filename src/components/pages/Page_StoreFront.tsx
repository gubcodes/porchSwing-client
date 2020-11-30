import React, {Component} from 'react';
import { Modal } from 'reactstrap';
import ItemCardsSearch from '../rendering/ItemCardsSearch';
import SendMessage from '../modals/SendMessage';
import transparent_logo from '../../assets/images/transparent_logo.png';

type PropsType = {
    title: string,
    senderUserName: string
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
    constructor(props: PropsType){
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
        let id = window.location.pathname.replace('/storefront/','');
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
        let id = window.location.pathname.replace('/storefront/','');
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
        return(
            <div>
            <h1>{this.props.title}</h1>
            <div>
                    {this.state.shopData.shopName === null
                    ?
                    <></>
                    :
                    <div>
                        {/* <img src={this.state.shopLogo || filler_logo} alt='item-image' /> */}
                    <img className='logoWidth' src={this.state.logo} />
                    <h1>{this.state.shopName}</h1>
                    <h4>{this.state.shopDescription}</h4>
                    <button onClick={this.toggleSendMessage}>contact this shop</button>
                    <Modal isOpen={this.state.isOpenSendMessage}>
                        <SendMessage shopName={this.state.shopName} shop={this.state.shop} toggle={this.toggleSendMessage} senderUserName={this.state.userName} />
                    </Modal>
                    <h3>pieces currently available from {this.state.shopName}</h3>
                    {/* map component to render our pieces as cards, unlimited */}
                    {this.state.itemData.map((potato) =>
                    <ItemCardsSearch photo={potato.photo1} name={potato.itemName} shop={potato.userID} />
                    )}
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default StoreFront;

// in app.js: <StoreFront title='StoreFront'>