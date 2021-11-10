import React, { useState, useEffect } from 'react';
import{ Container, Row, Col, Button, Modal} from "react-bootstrap";
import Card from '../components/Card/Card';



function DetailProduct(props) {
    const {name, price, description, quantity, img, confirmed} = props.product;
    const [isOpen, setOpen] = useState(props.isOpen);

	return (
        <>
            <Modal show={isOpen} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{description}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

        </>
		
       
	);
}

export default DetailProduct;