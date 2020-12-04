// import React, { Component } from 'react';
// import { Form, FormGroup, Modal, ModalBody, ModalHeader, Label, Input, Button } from 'reactstrap';
// // import Firebase from '../firebase/firebasetest';
// import { storage } from '../../assets/firebase';


// type PropsType = {
//     // title: string
// }

// type State = {
//     isOpen: boolean,
//     // userID: number,
//     itemName: string,
//     itemDescription: string,
//     price: number,
//     quantity: number,
//     photo1: string,
//     photo2: string,
//     photo3: string,
//     available: boolean,
//     image: null,
//     url: string
// }

// export default class ItemAdd extends Component<PropsType, State>{
//     constructor(props: PropsType) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.toggleModal = this.toggleModal.bind(this);
//         this.toggleAvailable = this.toggleAvailable.bind(this);
//         this.handleUpload = this.handleUpload.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.setImage = this.setImage.bind(this);
//         this.setUrl = this.setUrl.bind(this);
//         this.state = {
//             isOpen: false,
//             // userID: 0,
//             itemName: '',
//             itemDescription: '',
//             price: 0.00,
//             quantity: 1,
//             photo1: '',
//             photo2: '',
//             photo3: '',
//             available: false,
//             image: null,
//             url: ''
//         }
//     }

//     handleSubmit(e: any) {
//         e.preventDefault();
//         let itemName = this.state.itemName;
//         let itemDescription = this.state.itemDescription;
//         let price = this.state.price;
//         let quantity = this.state.quantity;
//         let photo1 = this.state.url;
//         let photo2 = this.state.photo2;
//         let photo3 = this.state.photo3;
//         let available = this.state.available;

//         fetch('https://porchswing-server.herokuapp.com/itemauth/', {
//             method: 'POST',
//             body: JSON.stringify({
//                 itemdata: {
//                     itemName: itemName,
//                     itemDescription: itemDescription,
//                     price: price,
//                     quantity: quantity,
//                     photo1: photo1,
//                     photo2: photo2,
//                     photo3: photo3,
//                     available: available
//                 }
//             }),
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': localStorage.token
//             })
//         }).then(
//             (response) => response.json()
//         ).then((data) => {
//             console.log(data)
//         })
//     };

//     toggleModal = () => {
//         this.setState({
//             isOpen: (!this.state.isOpen)
//         })
//     };

//     toggleAvailable = () => {
//         this.setState({
//             available: (!this.state.available)
//         })
//     }

//     setUrl = (url) => {
//         this.setState({
//             url: (this.state.url)
//         })
//     }

//     setImage = () => {
//         this.setState({
//             image: (e.target.files[0])
//         })
//     }

//     handleChange = (e: any) => {
//         if (e.target.files[0]) {
//             this.setImage() 
//         }
//     };

//     //firebase image upload:
//     handleUpload = () => {
//         const uploadTask = storage.ref(`images/${image.name}`).put(image);
//         uploadTask.on(
//             'state_changed',
//             shapshot => {
//                 // const progress = Math.round(
//                 //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 // );
//                 // setProgress(progress);
//             },
//             error => {
//                 console.log(error);
//             },
//             () => {
//                 storage
//                     .ref('images')
//                     .child(image.name)
//                     .getDownloadURL()
//                     .then(url => {
//                         // console.log(url);
//                         this.setUrl(url);
//                     });
//             }
//         );
//     };

//     render() {
//         return (
//             <div>
//                 <Modal isOpen={!this.state.isOpen}>
//                     {/* <ModalHeader> */}
//                     {/* <h1>{this.props.title}</h1> */}
//                     {/* ^^this will say whatever you pass down as props */}
//                     {/* </ModalHeader> */}
//                     <FormGroup>
//                         <Button id='buttonHover' type='submit' onClick={this.toggleModal}>X</Button>
//                     </FormGroup>
//                     <ModalBody>
//                         <Form onSubmit={this.handleSubmit}>
//                             {/* piece name */}
//                             <FormGroup>
//                                 <Label htmlFor='item name'>piece name</Label>
//                                 <Input onChange={(e: any) => this.setState({ itemName: e.target.value })} name='item name' value={this.state.itemName} />
//                             </FormGroup>
//                             {/* piece description */}
//                             <FormGroup>
//                                 <Label htmlFor='item description'>piece description</Label>
//                                 <Input onChange={(e: any) => this.setState({ itemDescription: e.target.value })} name='item description' value={this.state.itemDescription} />
//                             </FormGroup>
//                             {/* quantity available */}
//                             <FormGroup>
//                                 <Label htmlFor='quantity'>quantity available?</Label>
//                                 <Input onChange={(e: any) => this.setState({ quantity: e.target.value })} name='quantity' value={this.state.quantity} />
//                             </FormGroup>
//                             {/* available now? */}
//                             <FormGroup check>
//                                 <Label check>
//                                     <Input type='checkbox' />{!this.toggleAvailable}
//                                     available now?
//                                 </Label>
//                                 {/* <Label htmlFor='available'>available now?</Label>
//                                 <Input onChange={(e: any) => this.setState({ available: e.target.value })} name='available' value={this.state.available} /> */}
//                             </FormGroup>
//                             {/* add an image */}
//                             <FormGroup>
//                                 <Label htmlFor='add image'>add an image</Label>
//                                 {/* <Input onChange={(e: any) => this.setState({ photo1: e.target.value })} name='add image' value={this.state.photo1} /> */}
//                                 {/* <Firebase /> */}
//                                 <div>
//                                     {/* <progress value={progress} max='100' /> */}
//                                     <br />
//                                     <input type='file' onChange={this.handleChange} />
//                                     <button onClick={this.handleUpload}>Upload</button>
//                                     <br />
//                                     <br />
//                                     <img src={url || 'http://via.placeholder.com/100x100'} alt='firebase-image' />
//                                 </div>
//                             </FormGroup>
//                             <FormGroup>
//                                 <Button id='buttonHover' type='submit' onClick={this.toggleModal}>add piece</Button>
//                             </FormGroup>
//                         </Form>
//                     </ModalBody>
//                 </Modal>
//             </div>
//         )
//     }
// };