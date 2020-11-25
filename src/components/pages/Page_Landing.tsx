import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ItemCardsSearch from '../rendering/ItemCardsSearch';

type PropsType = {
    title: string
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
        this.state = {
            searchValue: 'er',
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
        this.searchItems();
        this.searchShops();
        console.log('componentDidMount fired');
        // TODO: try to get this to run on mount with a search that is a randomized array like ['sticker', 'pin', 'necklace'] etc...
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
                <div>
                    <h1>{this.props.title}</h1>
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        {/* shop name */}
                        <FormGroup>
                            <Input onChange={(e: any) => this.setState({ searchValue: e.target.value })} name='shop name' value={this.state.searchValue} />
                            {/* <Label htmlFor='shop name'>shop name</Label> */}
                        </FormGroup>
                        <FormGroup>
                            <button className='button' id='buttonhover' type='submit'>search</button>
                        </FormGroup>
                    </Form>
                </div>
                <div>
                    {this.state.itemData.length === 0
                    ?
                    <h4>we couldn't find anything for '{this.state.searchValue}'</h4>
                    :
                    <div>
                    <h3>shops</h3>
                    {/* map component to render our shops as card, limited to 3 */}
                    {this.state.shopData.slice(0,3).map((potato) =>
                    <ItemCardsSearch photo={potato.logo} name={potato.shopName} shop={potato.userID} />
                    )}
                    <h3>pieces</h3>
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
};