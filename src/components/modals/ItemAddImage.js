import React, { useState } from 'react';
import { Form, FormGroup, Modal, ModalBody, Label, Input, Button } from 'reactstrap';
import { storage } from '../../assets/firebase';
import filler_item from '../../assets/images/filler_item.png';
import cancel from '../../assets/images/cancel.png';

const ItemAddImage = (props) => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [price, setPrice] = useState(0.00);
    const [quantity, setQuantity] = useState(1);
    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [available, setAvailable] = useState(false);
    // const [itemAddModal, setItemAddModal] = useState(false);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://porchswing-server.herokuapp.com/itemauth/', {
            method: 'POST',
            body: JSON.stringify({
                itemdata: {
                    itemName: itemName,
                    itemDescription: itemDescription,
                    price: price,
                    quantity: quantity,
                    photo1: photo1,
                    photo2: photo2,
                    photo3: photo3,
                    available: available
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
        })
    };

    const toggleAvailable = () => setAvailable(!available)

    // const toggleModal = () => setItemAddModal(!itemAddModal)

    //firebase image upload:
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };

    //adding JS date to beginning of image file name
    let d = new Date();
    let n = d.getTime();
    let milliseconds = n;

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${milliseconds}${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            shapshot => {
                // const progress = Math.round(
                //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
                // setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(`${milliseconds}${image.name}`)
                    .getDownloadURL()
                    .then(url => {
                        // console.log(url);
                        setUrl(url);
                        setPhoto1(url);
                    });
            }
        );
    };

    return (
        <div>
            {/* <Modal isOpen={props.isOpenItemAdd}> */}
            <div className='modalBar'>
                <img src={cancel} id='buttonHover' className='x-button' onClick={props.toggle}></img>
            </div>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    {/* piece name */}
                    <FormGroup>
                        <Label htmlFor='item name'>piece name</Label>
                        <Input onChange={(e) => setItemName(e.target.value)} name='item name' value={itemName} />
                    </FormGroup>
                    {/* piece description */}
                    <FormGroup>
                        <Label htmlFor='item description'>piece description</Label>
                        <Input onChange={(e) => setItemDescription(e.target.value)} name='item description' value={itemDescription} />
                    </FormGroup>
                    {/* price */}
                    <FormGroup>
                        <Label htmlFor='item price'>price</Label>
                        <Input onChange={(e) => setPrice(e.target.value)} name='item price' value={price} />
                    </FormGroup>
                    {/* quantity available */}
                    <FormGroup>
                        <Label htmlFor='quantity'>quantity available?</Label>
                        <Input onChange={(e) => setQuantity(e.target.value)} name='quantity' value={quantity} />
                    </FormGroup>
                    {/* available now? */}
                    <FormGroup check>
                        <Label check>
                            <Input type='checkbox' onClick={toggleAvailable} />
                                    available now?
                                </Label>
                    </FormGroup>
                    {/* add images here */}
                    <div className='centerText'>
                        {/* <progress value={progress} max='100' /> */}
                        <br />
                        <input className='uploadFileButton' type='file' onChange={handleChange} />
                        <br />
                        <button className='button' type='button' onClick={handleUpload}>upload</button>
                        <br />
                        <img src={url || filler_item} alt='item-image' />
                    </div>
                    {/* button sends fetch and closes modal */}
                    <FormGroup>
                        <div className='centerText'>
                            <button className='button' id='buttonHover' type='submit' onClick={props.toggle}>add piece</button>
                        </div>
                    </FormGroup>
                </Form>
            </ModalBody>
            {/* </Modal> */}
        </div>
    )
};

export default ItemAddImage;