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
    // logout: () => void;
    // isLoggedIn: boolean;
}

type State = {
    isOpen: boolean,
    isOpenLogin: boolean,
    isOpenRegister: boolean,
    currentUserFirstName: string
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
            currentUserFirstName: ''
        };
    };
    // state = {
    //     isOpen: true,
    //     isOpenLogin: true,
    //     isOpenRegister: true
    // };

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

    changeUserName(userFirstName: string) {
        this.setState({
            currentUserFirstName: (userFirstName)
        })
        console.log(userFirstName);
    };

    // function updateToken(newToken: string) {
    //     localStorage.setItem("token", newToken);
    //     setSessionToken(newToken);
    //     console.log(sessionToken);
    //   }

    render() {
        return (
            <div>
                <Navbar id='Navbar' light>
                {/* <Navbar color="faded" light> */}
                    <NavbarBrand id='NavbarBrand' href="/" className="mr-auto">porchSwing</NavbarBrand>
                    <NavbarToggler onClick={this.changeOpen} className="mr-2" />
                    <Collapse isOpen={!this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/search">search</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/storefront/:id">my storefront</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/backoffice">backoffice</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/profile">profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">sign out</NavLink>
                            </NavItem>
                            {/* if not logged in: */}
                            <NavItem onClick={this.toggleLoginModal}>
                                <NavLink href="#">login</NavLink>
                            </NavItem>
                            <NavItem onClick={this.toggleRegisterModal}>
                                <NavLink href="#">sign up</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Switch>
                    <Route exact path="/"><Landing title='landing page'/></Route>
                    {/* <Route exact path="/search"><SearchResults title='search page'/></Route> */}
                    <Route path="/storefront/:id"><StoreFront senderUserName={this.state.currentUserFirstName} title='storefront page'/></Route>
                    <Route exact path="/profile"><Profile currentUserName={this.state.currentUserFirstName}title='profile page' /></Route>
                    <Route exact path="/backoffice"><BackOffice updateShopOwner={this.props.updateShopOwner} title='backoffice page'/></Route>
                    {/* <Route exact path="/register"><Register updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken}/></Route> */}
                    {/* <Route exact path="/login"><Login updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken}/></Route> */}
                    {/* <Route exact path="/backoffice">{!isAuth ? <Redirect to='/' /> : <ListDisplay />}</Route> */}
                </Switch>
                <Modal isOpen={!this.state.isOpenLogin} toggle={this.toggleLoginModal}>
                <Login updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken} toggle={this.toggleLoginModal} changeUserName={this.changeUserName}/>
                </Modal>
                <Modal isOpen={!this.state.isOpenRegister} toggle={this.toggleRegisterModal}>
                <Register updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken} toggle={this.toggleRegisterModal} changeUserName={this.changeUserName}/>
                </Modal>
                
            </div>
        );
    }
};

// export default TitleBar;