import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Modal } from 'reactstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import BackOffice from './pages/Page_BackOffice';
import Landing from './pages/Page_Landing';
import Profile from './pages/Page_Profile';
// import SearchResults from './pages/Page_SearchResults';
import StoreFront from './pages/Page_StoreFront';
import Register from './modals/Register';
import Login from './modals/Login';

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
    currentUserFirstName: string,
    shopID: number
};

export default class TitleBar extends React.Component<PropsType, State> {
    constructor(props: PropsType) {
        super(props);
        this.changeOpen = this.changeOpen.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.state = {
            isOpen: true,
            isOpenLogin: true,
            isOpenRegister: true,
            currentUserFirstName: '',
            shopID: 0
        };
    };
    // state = {
    //     isOpen: true,
    //     isOpenLogin: true,
    //     isOpenRegister: true
    // };

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
                        // shopLogo: data.logo,
                        // shopName: data.shopName,
                        // shopDescription: data.shopDescription
                    }) : console.log('no data returned getShopInfo');
                // this.getItems();
            })
    }

    componentDidMount() {
        this.getShopInfo();
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
                    {/* <Navbar color="faded" light> */}
                    <NavbarBrand id='NavbarBrand' href="/" className="mr-auto">porchSwing</NavbarBrand>
                    <NavbarToggler onClick={this.changeOpen} className="mr-2 button" />
                    <Collapse isOpen={!this.state.isOpen} navbar>
                        <Nav navbar>

                            {/* if not logged in: */}
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
                    <Route exact path="/"><Landing title='landing page' /></Route>
                    {/* <Route exact path="/search"><SearchResults title='search page'/></Route> */}
                    <Route path="/storefront/:id"><StoreFront senderUserName={this.state.currentUserFirstName} title='storefront page' /></Route>
                    <Route exact path="/profile"><Profile currentUserName={this.state.currentUserFirstName} title='profile page' /></Route>
                    <Route exact path="/backoffice"><BackOffice updateShopOwner={this.props.updateShopOwner} title='backoffice page' /></Route>
                    {/* <Route exact path="/register"><Register updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken}/></Route> */}
                    {/* <Route exact path="/login"><Login updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken}/></Route> */}
                    {/* <Route exact path="/backoffice">{!isAuth ? <Redirect to='/' /> : <ListDisplay />}</Route> */}
                </Switch>
                <Modal isOpen={!this.state.isOpenLogin} toggle={this.toggleLoginModal}>
                    <Login updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken} toggle={this.toggleLoginModal} changeUserName={this.changeUserName} />
                </Modal>
                <Modal isOpen={!this.state.isOpenRegister} toggle={this.toggleRegisterModal}>
                    <Register updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken} toggle={this.toggleRegisterModal} changeUserName={this.changeUserName} />
                </Modal>

            </div>
        );
    }
};

// export default TitleBar;