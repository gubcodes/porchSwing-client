import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import BackOffice from './pages/Page_BackOffice';
import Landing from './pages/Page_Landing';
import SearchResults from './pages/Page_SearchResults';
import StoreFront from './pages/Page_StoreFront';
import Register from './modals/Register';
import Login from './modals/Login';

type PropTypes = {
    updateToken: (token: string) => void;
    updateShopOwner: (isShopOwner: string) => void;
    // logout: () => void;
    // isLoggedIn: boolean;
}

export default class TitleBar extends React.Component<PropTypes, {}> {

    state = {
        isOpen: true
    };

    changeOpen = () => {
        this.setState({
            isOpen: (!this.state.isOpen)
        });
        console.log('test');
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">porchSwing</NavbarBrand>
                    <NavbarToggler onClick={this.changeOpen} className="mr-2" />
                    <Collapse isOpen={!this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/search">search</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/storefront">my storefront</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/backoffice">backoffice</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">sign out</NavLink>
                            </NavItem>
                            {/* if not logged in: */}
                            <NavItem>
                                <NavLink href="/login">login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register">sign up</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Switch>
                    <Route exact path="/"><Landing title='landing page'/></Route>
                    <Route exact path="/search"><SearchResults title='search page'/></Route>
                    <Route exact path="/storefront"><StoreFront title='storefront page'/></Route>
                    <Route exact path="/backoffice"><BackOffice updateShopOwner={this.props.updateShopOwner} title='backoffice page'/></Route>
                    <Route exact path="/register"><Register updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken}/></Route>
                    <Route exact path="/login"><Login updateShopOwner={this.props.updateShopOwner} updateToken={this.props.updateToken}/></Route>
                    {/* <Route exact path="/backoffice">{!isAuth ? <Redirect to='/' /> : <ListDisplay />}</Route> */}
                </Switch>
            </div>
        );
    }
};

// export default TitleBar;