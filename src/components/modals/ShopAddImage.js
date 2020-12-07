import React, { useState } from 'react';
import { Form, FormGroup, Modal, ModalBody, ModalHeader, Label, Input, Button } from 'reactstrap';
import { storage } from '../../assets/firebase';
import filler_logo from '../../assets/images/filler_logo.png';

const ShopAddImage = (props) => {
    const [logo, setLogo] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://porchswing-server.herokuapp.com/shopauth/', {
            method: 'PATCH',
            body: JSON.stringify({
                shopdata: {
                    logo: logo
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
            console.log('logo uploaded')
        })
    };

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

    function handleUpload() {
        console.log('handleUpload initialized');
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
                        console.log(url);
                        setUrl(url);
                        setLogo(url);
                    });
            }
        );
    }

    return (
        <div>
            <ModalHeader className='modalHeader' toggle={props.toggle}>
                    <h4 className='modalHeaderText'>new shop logo</h4>
                </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <div>
                        {/* <progress value={progress} max='100' /> */}
                        <br />
                        <input type='file' onChange={handleChange} />
                        <button type='button' onClick={handleUpload}>upload</button>
                        <br />
                        <img className='logoWidthUpload' src={url || filler_logo} alt='logo' />
                    </div>
                    {/* button sends fetch and closes modal */}
                    <FormGroup>
                        <Button id='buttonHover' type='submit' onClick={props.toggle}>add logo</Button>
                    </FormGroup>
                </Form>
            </ModalBody >
        </div >
    )
};

export default ShopAddImage;