import React, { Component } from 'react';
import { ModalBody, ModalHeader, Modal, Button, Carousel, CarouselIndicators, CarouselCaption, CarouselControl, CarouselItem } from 'reactstrap';
import ItemAddImage from './ItemAddImage';

type PropsType = {
    itemData: any,
    shopID: number,
    toggle: () => void;
    getShoppingBag: () => void;
}

type State = {
    addedToCart: boolean,
    activeIndex: number,
    animating: boolean
}

export default class ItemViewSearch extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
        this.toggleAddedToCart = this.toggleAddedToCart.bind(this);
        this.state = {
            addedToCart: false,
            activeIndex: 0,
            animating: false
        }
    }

    addItemToCart = () => {
        fetch(`https://porchswing-server.herokuapp.com/cartauth/`, {
            method: 'POST',
            body: JSON.stringify({
                cartdata: {
                    itemID: this.props.itemData.id,
                    shopUserID: this.props.itemData.userID,
                    quantity: 1
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data);
            this.toggleAddedToCart();
            this.props.getShoppingBag();
        })
    };

    toggleAddedToCart = () => {
        this.setState({
            addedToCart: (!this.state.addedToCart)
        })
    }

    //carousel:

items = 
    (this.props.itemData.photo2 === '' || this.props.itemData.photo3 === ''
        ?
        [
            {
                src: this.props.itemData.photo1,
                altText: 'piece photo one'
            }
        ]
        :
        [
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
        )

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

goToIndex = (newIndex: any) => {
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
                    {
                    this.state.addedToCart === true
                    ?
                    <h3>piece added to bag!</h3>
                    :
                    <div>
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
                    <p>{this.props.itemData.itemDescription}</p>
                    <h4>${this.props.itemData.price}</h4>
                    <button onClick={this.addItemToCart} className='button'>add to bag</button>
                    {/* <button className='button'><a href={`/storefront/${this.props.shopID}`}>visit shop</a></button> */}
                    </div>
    }
                </ModalBody>
            </div>
        )
    }
};