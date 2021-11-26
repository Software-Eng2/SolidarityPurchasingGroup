import React, { useState } from 'react';
import{ Container, Row, Col, Modal, Alert, Form, FloatingLabel} from "react-bootstrap";
import FarmerCard from '../components/FarmerCard/FarmerCard';
import Switch from "react-switch";



function FarmerProduct(props) {
    const {id, name, description, category, quantity, price, img_path, confirmed} = props.product;
	const [show, setShow] = useState(false);
    const [switched, setSwitch] = useState(confirmed ? true : false);
    const [disabled, setDisabled] = useState(true);
    const [nameProduct, setNameProduct] = useState(name);
    const [descriptionProduct, setDescriptionProduct] = useState(description);
    const [categoryProduct, setCategoryProduct] = useState(category);
    const [priceProduct, setPriceProduct] = useState(price);
    const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
    const categories = ["Dairies", "Fruits", "Vegetables", "Plants", "Fish", "Meat"];
	
    const handleSwitch = (checked) => {
        setSwitch(checked);
        console.log(switched);
      }
    const handleChange = () => {setDisabled(false)};
	const handleConfirm = () => {
        const changedProduct= {
            id: id, 
            name: nameProduct, 
            description: descriptionProduct,
            category: categoryProduct,
            quantity: quantity,
            price: priceProduct,
            img_path: img_path,
            confirmed: !switched
        }
        //DO THE API CALL WITH CHANGED VALUES
		
	}

	return (
		<>
			<Container onClick={handleShow} {...props}>
				<FarmerCard title={name} body={description} img={img_path} subinfo={price} ></FarmerCard>		
			</Container>
			<Modal centered show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Name of product</Form.Label>
                            <Form.Control 
                                type="text" 
                                defaultValue={name} 
                                placeholder={name}
                                onChange={(event) => {setNameProduct(event.target.value); handleChange();}}
                                />
                        </Form.Group>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col xs={12} md={6}>
                                    <img src={img_path} alt={name} className="img-fluid" style={{height:"10rem", width:"10rem"}}/>
                                </Col>
                                
                                <Col xs={6} md={6}>
                                    <h3 style={{color: "#247D37", marginTop:"1rem", marginBottom:"1rem", fontSize: "1.3rem"}}>Description</h3>
                                    <p style={{margin: "0", padding: "0"}}>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3} 
                                            defaultValue={description} 
                                            placeholder={description}
                                            onChange={(event) => {setDescriptionProduct(event.target.value); handleChange();}}
                                            />
                                    </p>
                                    <h3 style={{color: "#247D37", marginTop:"1rem", marginBottom:"1rem", fontSize: "1.3rem"}}>Category</h3>
                                    <p style={{margin: "0", padding: "0"}}>
                                        <Form.Control 
                                            as="select"
                                            value={category}
                                            onChange={(event) => { setCategoryProduct(event.target.value); handleChange()}} 
                                        >
                                            <option default>{category}</option>
                                            {categories.map(cat => cat != category ? 
                                            <option value={cat}>{cat} </option>
                                            : "" )}
                                        </Form.Control>
                                    </p>
                                </Col>
                            </Row>
                            <hr className='solid'/>
                            <Row align="center" style={{marginTop:"1rem", marginBottom:"1.2rem"}}>
                                <Col xs={6} md={6}>
                                    <h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>Price</h3>
                                </Col>
                                <Col xs={6} md={6}>
                                    <h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>Change confirmation</h3>
                                </Col>
                            </Row>
                            <Row align="center" style={{marginTop:"1rem", marginBottom:"1.2rem"}}>
                                <Col xs={6} md={6}>
                                    <Form.Control 
                                        type="text" 
                                        defaultValue={price} 
                                        placeholder={price}
                                        onChange={(event) => {setPriceProduct(event.target.value); handleChange();}}
                                        />
                                </Col>
                                <Col xs={6} md={6}>
                                    <div data-testid="counter" className = "product-quantity">
                                        <Switch onChange={(checked) => {handleSwitch(checked); handleChange()}} checked={switched}/>
                                    </div>

                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col xs={12} md={6}> 
                                <div className='farmer-card-button align-left'>
                                    <button style={{backgroundColor:"#dc3545", fontWeight:"bold"}} onClick={handleClose}>
                                        Delete
                                    </button>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className='farmer-card-button align-left'>
                                    <button disabled={disabled} style={{fontWeight:"bold"}} onClick={() => {handleConfirm(); handleClose();}}>
                                        Confirm changes
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Form>
			</Modal>	
		</>
		
	);
}

export default FarmerProduct;