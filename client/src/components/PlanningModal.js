import { Modal, Button, FormControl, Dropdown, ButtonGroup, Row, Col, Form } from 'react-bootstrap';
import { useState } from "react";



function PlanningModal(props) {
    const { show, img_path, ...rest } = props;



    return (
        <Modal
            show={show}
            onHide={rest.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormPlanning onHide={rest.onHide} />
            </Modal.Body>


        </Modal>
    );
}


function FormPlanning(props) {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;


        if (form.checkValidity() === false) {
            event.stopPropagation();

        } else {

            console.log(product + "..." + quantity)

        }

        setValidated(true);

    }


    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="justify-content-center">
                <Form.Group as={Col} sm={5} controlId="Product">
                    <Form.Label className="mr-3">Product</Form.Label>
                    <Form.Control
                    required
                    as="select" 
                    value={product} 
                    onChange={(event) => setProduct(event.target.value)}>
                        <option></option>
                        <option>Butter</option>
                        <option>Red Apple</option>
                        <option>Green Apple</option>
                        <option>Green Grapes</option>
                        <option>Grapes</option>
                        <option>Carrot</option>
                        <option>Tomato</option>
                        <option>Fresh Milk</option>
                        <option>Milk</option>
                        <option>Buffala Mozzarella</option>
                        <option>Tomato Seeds</option>
                        <option>Lettuce</option>
                        <option>Fresh Salmon</option>
                        <option>Frozen Salmon</option>
                        <option>Chicken Breast</option>
                        <option>Frozen Meat</option>
                        <option>Basil</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a product.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>    





            <Row className="justify-content-center"> 
                <Form.Group as={Col} sm={5} className="mt-5" controlId="quantity" variant="outlined">
                    <Form.Label>Quantity (Kg) </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0.0"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please insert a quantity.
                    </Form.Control.Feedback>

                </Form.Group>

            </Row>

            <Row className="pb-4 mb-4 ml-4 pl-4">
                <Col xs={5} sm={6} className="d-flex justify-content-start align-items-center">
                    <Button className="mt-5" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }} onClick={props.onHide}>Close</Button>
                </Col>

                <Col xs={4} sm={5} className="d-flex justify-content-end align-items-center">
                    <Button className="mt-5" data-testid="submit-Button" variant="success" type="submit" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}>submit</Button>
                </Col>
                <Col></Col>

            </Row>

        </Form>


    );

}

export default PlanningModal;