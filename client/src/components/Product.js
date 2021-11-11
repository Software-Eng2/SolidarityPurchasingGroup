import React, { useState } from 'react';
import{ Container, Row, Col, Modal, Alert} from "react-bootstrap";
import Card from '../components/Card/Card';



function Product(props) {
    const {id, name, description, category, quantity, price, farmer_id, img_path, confirmed} = props.product;
	const [show, setShow] = useState(false);
	const [counter, setCounter] = useState(1);
	const [total, setTotal] = useState(price);
    const handleShow = () => setShow(true);
	const handleClose = () => {setShow(false); setCounter(1); setTotal(price)};
	const decrease = () => setCounter(counter-1);
	const increase = () => setCounter(counter+1); 
	const updateTotal = () => setTotal(price*counter);

	return (
		<>
			<Container onClick={handleShow}>
				<Card title={name} body={description} img={img_path} subinfo={price} ></Card>		
			</Container>
			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton>
				<Modal.Title>{name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container fluid>
						<Row>
							<Col xs={12} md={6}>
								<img src={img_path} alt={name} className="img-fluid" style={{height:"10rem", width:"10rem"}}/>
							</Col>
							
							<Col xs={6} md={6}>
								<h3 style={{color: "#247D37", marginTop:"1rem", marginBottom:"1rem", fontSize: "1.3rem"}}>Description</h3>
								<p style={{margin: "0", padding: "0"}}>{description}</p>
								<h3 style={{color: "#247D37", marginTop:"1rem", marginBottom:"1rem", fontSize: "1.3rem"}}>Category</h3>
								<p style={{margin: "0", padding: "0"}}>{category}</p>
							</Col>
						</Row>
						<Row style={{marginTop:"1rem"}}>
							<Col xs={12} md={12}>
								<Alert variant="success">
									<Alert.Heading style={{textAlign: "center"}}>Availability of the week: {quantity}</Alert.Heading>
								</Alert>
							
							</Col>
						</Row>
						<hr className='solid'/>
						<Row align="center" style={{marginTop:"1rem", marginBottom:"1.2rem"}}>
							<Col xs={6} md={6}>
								<h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>Price</h3>
							</Col>
							<Col xs={6} md={6}>
								<h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>Select quantity</h3>
							</Col>
						</Row>
						<Row align="center" style={{marginTop:"1rem", marginBottom:"1.2rem"}}>
							<Col xs={6} md={6}>
								<h4 style={{color: "#247D37", marginTop:"0.8rem"}}> €{(price*counter).toFixed(2)} </h4>
								<p style={{fontStyle: "italic"}}> €{price.toFixed(2)} each unit</p>
							</Col>
							<Col xs={6} md={6}>
								<div className = "product-quantity">
									<button className = "editquantity-btn" disabled={counter === 0 || counter === '' || counter instanceof String ? true : false} onClick = {() => {updateTotal(); decrease();  }} >-</button>
									<input name = 'count-multiplied' value = {counter} type= 'number' className = "display-count" onChange= {e => setCounter(Number(e.target.value))} />
									<button className = "editquantity-btn" disabled={counter >= quantity ? true : false} onClick = {() => {updateTotal(); increase();  }}  >+</button>
									<p><span className="error" >{counter > quantity ? 'The quantity is invalid' : ''}{counter instanceof String ? 'Insert a valid number' : ''}</span></p>
								</div>

							</Col>
						</Row>
					</Container>

				</Modal.Body>
				<Modal.Footer>
					<Row>
						<Col xs={12} md={6}> 
							<div className='card-button align-left'>
								<button style={{backgroundColor:"#dc3545", fontWeight:"bold"}} onClick={handleClose}>
									Cancel
								</button>
							</div>
						</Col>
						<Col xs={12} md={6}>
							<div className='card-button align-left'>
								<button style={{fontWeight:"bold"}}>
									Confirm €{(price*counter).toFixed(2)}
								</button>
							</div>
						</Col>


					</Row>
					
					
				</Modal.Footer>
			</Modal>	
		</>
		
        // <Container>
		// 	<Card style={{ width: '12rem', height: ' 2rem', backgroundColor: '#FAFAFA'}}>
		// 		<Card.Img variant="top" src={img} />
		// 		<Card.Body>
		// 			<Card.Title>{name}</Card.Title>
		// 			<Card.Text>
		// 				{description}
		// 			</Card.Text>
		// 			<Button className="add-button">Add to cart</Button>
		// 		</Card.Body>
		// 	</Card>

        // </Container>
		
	);
}

export default Product;