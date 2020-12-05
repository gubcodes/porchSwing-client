import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, NavbarText, Table, Button } from 'reactstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import BackOffice from './pages/Page_BackOffice';
import Landing from './pages/Page_Landing';
import Profile from './pages/Page_Profile';
// import SearchResults from './pages/Page_SearchResults';
import StoreFront from './pages/Page_StoreFront';
import Register from './modals/Register';
import Login from './modals/Login';
// import {ReactComponent as ShoppingBag} from '../assets/images/shopping-bag.svg';
import Cart from '../components/rendering/ShoppingBag';
import shoppingBag from '../assets/images/shopping-bag.png';
import speechBubble from '../assets/images/speech-bubble.png';
import hamburgerNew from '../assets/images/hamburgerNew.png';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

// STRIPE:
const stripePromise = loadStripe('pk_test_51HqtlNFbOjNmnOEQhozxFoJLw3EZVhYKDtEMQo6Exmx5XgO3zp4cxscik7FHjkM8SdbKyoz78YIlIXr28VVL8hVW00jRKXb2Jm');




type PropsType = {
    updateToken: (token: string) => void;
    updateShopOwner: (isShopOwner: string) => void;
    clearToken: () => void;
    // logout: () => void;
    // isLoggedIn: boolean;
}

type State = {
    isOpen: boolean,
    isOpenLogin: boolean,
    isOpenRegister: boolean,
    isOpenShoppingBag: boolean,
    currentUserFirstName: string,
    shopID: number,
    bagItemCount: number,
    bagData: any[],
    itemPriceData: any[],
    sum: number,
    unreadCount: number,
    checkout: boolean
};

export default class TitleBar extends React.Component<PropsType, State> {
    constructor(props: PropsType) {
        super(props);
        this.changeOpen = this.changeOpen.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
        this.toggleShoppingBagModal = this.toggleShoppingBagModal.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.toggleCheckout = this.toggleCheckout.bind(this);
        this.getShoppingBag = this.getShoppingBag.bind(this);
        this.state = {
            isOpen: true,
            isOpenLogin: true,
            isOpenRegister: true,
            isOpenShoppingBag: true,
            currentUserFirstName: '',
            shopID: 0,
            bagItemCount: 0,
            // bagData: [{price: 0, itemID: 0, itemName: 'test', photo1: 'testurl'}],
            bagData: [{}],
            itemPriceData: [0],
            sum: 0,
            unreadCount: 0,
            checkout: false
        };
    };

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
                        shopID: data.userID,
                    }) : console.log('no data returned getShopInfo');
            })
    };

    getShoppingBag = () => {
        fetch('https://porchswing-server.herokuapp.com/cartauth/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                data.length > 0 
                    ?
                    this.setState({
                        bagItemCount: data.length,
                        bagData: data
                    }) 
                    : console.log('no data returned getShoppingBag');
            })
    };

    getUnread = () => {
        fetch('https://porchswing-server.herokuapp.com/chatauth/unread', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                data.length > 0 ?
                    this.setState({
                        unreadCount: data.length,
                    }) : console.log('no data returned getUnread');
            })
    }

    //getting the total price of items

    getTotal = () => {
        // let priceArray = [1, 2];
        {this.state.bagData.map((tomato) =>
        
        fetch(`https://porchswing-server.herokuapp.com/item/${tomato.itemID}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data.price)
                this.state.itemPriceData.unshift(parseInt(data.price))
            })
            )}
            // console.log(priceArray);
            // let test = [20.00, 5.00];
            // let sumTest = test.reduce(function(a,b){
            //     return a + b;
            // }, 0);
            // console.log(sumTest);
            console.log(this.state.itemPriceData);
            //     let sum = this.state.itemPriceData.reduce(function(a,b){
            //         return a + b;
            //     }, 0);
            // console.log('sum: ', sum);
    };

    getSum = () => {
    let priceSum = this.state.itemPriceData.reduce(function(a,b){
        return a + b;
    }, 0);
    console.log('sum: ', priceSum);
    this.setState({
        sum: priceSum
    })
    }

    componentDidMount() {
        this.getShopInfo();
        this.getShoppingBag();
        this.getUnread();
    }

    changeOpen = () => {
        this.setState({
            isOpen: (!this.state.isOpen)
        });
        console.log('test');
    }

    toggleLoginModal() {
        this.setState({
            isOpenLogin: (!this.state.isOpenLogin)
        })
    };

    toggleRegisterModal() {
        this.setState({
            isOpenRegister: (!this.state.isOpenRegister)
        })
    };

    toggleShoppingBagModal() {
        this.setState({
            isOpenShoppingBag: (!this.state.isOpenShoppingBag)
        })
    };

    toggleCheckout() {
        this.setState({
            checkout: (!this.state.checkout)
        })
    };

    changeUserName(userFirstName: string) { //i think this was a dead end attempt at getting the user's first name passed down to sender in message modal
        this.setState({
            currentUserFirstName: (userFirstName)
        })
        console.log(userFirstName);
    };

    render() {
        return (
            <div>
                <Navbar id='Navbar' light>
                    <NavbarBrand id='NavbarBrand' href="/" className="mr-auto NavbarBrandSize">porchSwing</NavbarBrand>
                    {/* nav icons */}
                    {
                        this.state.unreadCount === 0
                        ?
                        <div className='numberBubblesEmpty'><h5 className='bubbleNumbersEmpty'> </h5></div>
                        :
                        <div className='numberBubblesLeft'><h5 className='bubbleNumbers'>{this.state.unreadCount}</h5></div>
                    }
                    {
                        localStorage.token 
                        ? 
                        <NavLink href='/profile'>
                        <NavbarText id='navbarText'><img className='iconSize pointer' src={speechBubble} /></NavbarText>
                        </NavLink>
                        :
                        <NavbarText id='navbarText'><img className='iconSize' src={speechBubble} /></NavbarText>
                    }
                    {
                        this.state.bagItemCount === 0
                        ?
                        <div className='numberBubblesEmpty'><h5 className='bubbleNumbersEmpty'> </h5></div>
                        :
                        <div className='numberBubbles'><h5 className='bubbleNumbers'>{this.state.bagItemCount}</h5></div>
                    }
                    {
                        localStorage.token 
                        ? 
                        <NavbarText onClick={this.toggleShoppingBagModal} id='navbarText'><img className='iconSize pointer' src={shoppingBag} /></NavbarText>
                        :
                        <NavbarText id='navbarText'><img className='iconSize' src={shoppingBag} /></NavbarText>
                    }
                    <NavbarText onClick={this.changeOpen} id='navbarText'><img className='iconSize pointer' src={hamburgerNew} /></NavbarText>
                    {/* dropdown nav */}
                    <Collapse isOpen={!this.state.isOpen} navbar>
                        <Nav navbar>
                            {
                                localStorage.token
                                    ?
                                    <div>
                                        <NavItem>
                                            <NavLink href="/">search</NavLink>
                                        </NavItem>
                                        {
                                            localStorage.shopOwner == 'true'
                                                ?
                                                <NavItem>
                                                    <NavLink href={`/storefront/${this.state.shopID}`}>my storefront</NavLink>
                                                </NavItem>
                                                :
                                                <></>
                                        }
                                        <NavItem>
                                            <NavLink href="/backoffice">back office</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/profile">profile</NavLink>
                                        </NavItem>
                                        <NavItem onClick={this.props.clearToken}>
                                            <NavLink href="/">sign out</NavLink>
                                        </NavItem>
                                    </div>
                                    :
                                    <div>
                                        <NavItem onClick={this.toggleLoginModal}>
                                            <NavLink href="#">login</NavLink>
                                        </NavItem>
                                        <NavItem onClick={this.toggleRegisterModal}>
                                            <NavLink href="#">sign up</NavLink>
                                        </NavItem>
                                    </div>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
                <Switch>
                    <Route exact path="/"><Landing title='landing page' getShoppingBag={this.getShoppingBag}/></Route>
                    <Route path="/storefront/:id"><StoreFront senderUserName={this.state.currentUserFirstName} title='storefront page' getShoppingBag={this.getShoppingBag}/></Route>
                    <Route exact path="/profile"><Profile currentUserName={this.state.currentUserFirstName} title='profile page' /></Route>
                    <Route exact path="/backoffice"><BackOffice updateShopOwner={this.props.updateShopOwner} title='backoffice page' /></Route>
                </Switch>
                {/* login + register modals */}
                <Modal isOpen={!this.state.isOpenLogin} toggle={this.toggleLoginModal}>
                    <Login updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken} toggle={this.toggleLoginModal} changeUserName={this.changeUserName} />
                </Modal>
                <Modal isOpen={!this.state.isOpenRegister} toggle={this.toggleRegisterModal}>
                    <Register updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken} toggle={this.toggleRegisterModal} changeUserName={this.changeUserName} />
                </Modal>
                {/* shopping bag modal */}
                <Modal isOpen={!this.state.isOpenShoppingBag} toggle={this.toggleShoppingBagModal}>
                    <ModalHeader toggle={this.toggleShoppingBagModal}>shopping cart</ModalHeader>
                    <ModalBody>
                    <div>
                        {
                            this.state.checkout === false
                            ?
                            <div>
                            <div>
                            <Table className='table' size='sm'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>${this.state.sum}.00</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.bagData.slice(0).reverse().map((potato) =>
                                        <Cart bagItemData={potato} bagItemID={potato.itemID} bagItemCartID={potato.id} getShoppingBag={this.getShoppingBag}/>
                                    )}
                                </tbody>
                            </Table>
                            <Button onClick={this.getTotal}>getTotal</Button>
                            <Button onClick={this.getSum}>getSum</Button>
                            </div>
                            <div>
                            <button className='button' onClick={this.toggleCheckout}>checkout</button>
                            </div>
                            </div>
                            :
                            <div>
                            <div>
                            <Elements stripe={stripePromise}>
                            <CardElement />
                            </Elements>
                            </div>
                            <br/>
                            <div>
                            <Button className='button' onClick={this.toggleCheckout}>return to bag</Button>
                            </div>
                            </div>
                        }
                            
                            
                        </div>
                    </ModalBody>
                </Modal>
            </div>

        );
    }
};

// export default TitleBar;