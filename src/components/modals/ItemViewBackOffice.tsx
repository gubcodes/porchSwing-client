import React, { Component } from 'react';
import { ModalBody, ModalHeader, Modal, Button, Carousel, CarouselIndicators, CarouselCaption, CarouselControl, CarouselItem, Form, Label, Input, FormGroup } from 'reactstrap';
import ItemAddImage from './ItemAddImage';

type PropsType = {
    itemData: any,
    toggle: () => void;
    getItems: () => void;
    toggleAndGetItems: () => void;
}

type State = {
    activeIndex: number,
    animating: boolean,
    itemNameUpdate: string,
    itemDescriptionUpdate: string,
    itemPriceUpdate: number,
    availableUpdate: boolean,
    itemQuantityUpdate: number,
    // itemAvailableForModal: boolean
}

export default class ItemViewBackOffice extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.state = {
            activeIndex: 0,
            animating: false,
            itemNameUpdate: this.props.itemData.itemName,
            itemDescriptionUpdate: this.props.itemData.itemDescription,
            itemPriceUpdate: this.props.itemData.price,
            availableUpdate: this.props.itemData.available,
            itemQuantityUpdate: this.props.itemData.quantity,
            // itemAvailableForModal: this.props.itemData.available
        }
    }

    toggleAvailable = () => {
        this.setState({
            availableUpdate: !this.state.availableUpdate
        })
    };

    // toggleItemAvailableForModal = () => {
    //     this.setState({
    //         itemAvailableForModal: !this.state.itemAvailableForModal
    //     })
    // };

    handleSubmit = (e: any) => {
        e.preventDefault();

        fetch(`https://porchswing-server.herokuapp.com/itemauth/update/${this.props.itemData.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                itemdata: {
                    itemName: this.state.itemNameUpdate,
                    itemDescription: this.state.itemDescriptionUpdate,
                    price: this.state.itemPriceUpdate,
                    quantity: this.state.itemQuantityUpdate,
                    available: this.state.availableUpdate
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            this.props.getItems();
        })
    };

    toggleAndGetItems() {
        this.props.getItems();
        this.props.toggle();
    }

//carousel:
items = [
    {
        src: this.props.itemData.photo1,
        altText: 'piece photo one'
    }, 
    {
        src: this.props.itemData.photo2,
        altText: 'piece photo two'
    }, 
    {
        src: this.props.itemData.photo3,
        altText: 'piece photo three'
    }
]
next = () => {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === this.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({
        activeIndex: nextIndex
    })
  }


previous = () => {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.items.length - 1 : this.state.activeIndex - 1;
    this.setState({
        activeIndex: nextIndex
    })
  }

goToIndex = (newIndex) => {
    if (this.state.animating) return;
    this.setState({
        activeIndex: newIndex
    })
  }

slides = this.items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => 
            this.setState({
                animating: true
            })}
        onExited={() => this.setState({
            animating: false
        })}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });

    render() {
        return (
            <div>
                <ModalHeader className='modalHeader' toggle={this.props.toggle}>
                    {this.props.itemData.itemName}
                </ModalHeader>
                <ModalBody>
                <div>
                            {/* let's try the carousel here */}
                            <Carousel className='carouselSize'
                            activeIndex={this.state.activeIndex}
                            next={this.next}
                            previous={this.previous}
                            >
                            <CarouselIndicators items={this.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                            {this.slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                            </Carousel>
                        </div>
                    <div>
                    {/* <img className='itemViewWidth' src={this.props.itemData.photo1} /> */}
                    <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input onChange={(e: any) => this.setState({itemNameUpdate: e.target.value})} name='nameUpdate' value={this.state.itemNameUpdate} />
                            </FormGroup>
                            <FormGroup>
                                <Input onChange={(e: any) => this.setState({itemDescriptionUpdate: e.target.value})} name='descriptionUpdate' type='textarea' value={this.state.itemDescriptionUpdate} />
                            </FormGroup>
                            <FormGroup>
                                <Input onChange={(e: any) => this.setState({itemPriceUpdate: e.target.value})} name='priceUpdate' value={this.state.itemPriceUpdate} />
                            </FormGroup>
                    {/* <h4>{this.props.itemData.itemName}</h4>
                    <p>{this.props.itemData.itemDescription}</p>
                    <h4>${this.props.itemData.price}</h4> */}
                    {
                        this.state.availableUpdate 
                        ?
                        <div>
                        <p>this piece is available now.</p>
                        <button onClick={this.toggleAvailable} className='button'>take it off the shelf?</button>
                        </div>
                        :
                        <div>
                        <p>this piece is not currently available.</p>
                        <button onClick={this.toggleAvailable}className='button'>display it?</button>
                        </div>
                    }
                        <br/>
                        <button onClick={this.props.toggleAndGetItems} type='submit' className='button'>save changes</button>
                    </Form>
                    </div>
                </ModalBody>
            </div>
        )
    }
};