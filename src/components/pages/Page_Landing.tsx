import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, CardGroup, Container, Row, Col } from 'reactstrap';
import ItemCardsSearch from '../rendering/ItemCardsSearch';
import ShopCardsSearch from '../rendering/ShopCardsSearch';
import Search from '../../assets/images/search.png';
import LineRed from '../../assets/images/lineFillBlack.png';

type PropsType = {
    title: string,
    getShoppingBag: () => void;
    toggleLoginModal: () => void;
}

type State = {
    searchValue: string,
    shopData: any[],
    itemData: any[]
}

export default class Landing extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchShops = this.searchShops.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.randomSearch = this.randomSearch.bind(this);
        this.state = {
            searchValue: '',
            shopData: [],
            itemData: []
        }
    }

    handleSubmit(e: any) {
        e.preventDefault();
        this.searchItems();
        this.searchShops();
        console.log('handleSubmit fired');
    }

    componentDidMount() {
        this.randomSearch();
        this.searchItems();
        this.searchShops();
        console.log('componentDidMount fired');
    }

    randomSearch = () => {
        let array = ['stickers', 'necklace', 'pins', 'embroidery'];
        let randomItem = array[Math.floor(Math.random() * array.length)];
        this.setState({
            searchValue: randomItem
        })
    }

    searchShops = () => {
        fetch(`https://porchswing-server.herokuapp.com/shop/search/${this.state.searchValue}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    shopData: data
                });
                console.log(this.state.shopData);
                console.log('shops searched')
            })
    };

    searchItems = () => {
        fetch(`https://porchswing-server.herokuapp.com/item/search/${this.state.searchValue}`, {
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


    render() {
        return (
            <div>
            {/* <div className="h-100 row align-items-center"> */}
                    {/* <div class="col" style="background:red">
                      TEXT
                     </div>
                </div> */}
                <br/>
                <Container id='top' className="ml-auto mr-auto">
                    <Form onSubmit={this.handleSubmit}>
                <Row className='justify-content-center'>
                        <Col>
                        {/* <img className='magGlass' src={Search} /> */}
                        </Col>
                            <Col>
                        <FormGroup>
                            <Input onChange={(e: any) => this.setState({ searchValue: e.target.value })} name='shop name' value={this.state.searchValue} />
                            {/* <Label htmlFor='shop name'>shop name</Label> */}
                        </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                            
                            <button className='button' id='buttonhover' type='submit'><img className='magGlass' src={Search} /></button>
                        </FormGroup>
                        </Col>
                    </Row>
                    </Form>
                    </Container>
                <div>
                    {this.state.itemData.length === 0 && this.state.shopData.length === 0
                        ?
                        <div className='centerText'>
                        <h4>we couldn't find anything for '{this.state.searchValue}'</h4>
                        </div>
                        :
                        <div>
                            <Container className="ml-auto mr-auto">
                            <Row>
                                <Col xs="2">
                            <h3 className='paddingLeft'>shops</h3>
                            </Col>
                            <Col>
                            <img className='lines alignLeft' src={LineRed} />
                            </Col>
                            </Row>
                            </Container>
                            {/* map component to render our shops as card, limited to 3 */}
                            <Container className="ml-auto mr-auto">
                                    <Row className="ml-auto mr-auto">
                                {this.state.shopData.slice(0, 3).map((potato) =>
                                    <ShopCardsSearch photo={potato.logo} name={potato.shopName} shop={potato.userID} />
                                )}
                            </Row>
                            </Container>
                            <Container className="ml-auto mr-auto">
                            <Row>
                                <Col xs="2">
                            <h3 className='paddingLeft'>pieces</h3>
                            </Col>
                            <Col>
                            <img className='lines alignLeft' src={LineRed} />
                            </Col>
                            </Row>
                            </Container>
                            {/* map component to render our pieces as cards, unlimited */}
                            <Container className="ml-auto mr-auto">
                                    <Row className="ml-auto mr-auto">
                                {this.state.itemData.map((potato) =>
                                    <ItemCardsSearch photo={potato.photo1} name={potato.itemName} shop={potato.userID} itemData={potato} getShoppingBag={this.props.getShoppingBag} toggleLoginModal={this.props.toggleLoginModal}/>  
                                )}
                            </Row>
                            </Container>
                        </div>
                    }
                </div>
            </div>
        )
    }
};