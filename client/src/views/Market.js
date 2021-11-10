import React, { useState, useEffect } from 'react';
import{ Container, Row, Col } from "react-bootstrap";
import MarketNavbar from '../components/MarketNavbar';
import Product from '../components/Product';
import Sidebar from '../components/Sidebar/Sidebar'



function Market(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const product1 = {name: "Butter", 
        price: 2.00, 
        description: "Excelent butter made from free cows", 
        quantity: 63, 
        img: "https://images.lider.cl/wmtcl?source=url[file:/productos/300575a.jpg]&sink", 
        confirmed: true};
    const product2 = {name: "Milk", 
        price: 1.75, 
        description: "Excelent milk from free cows", 
        quantity: 16, 
        img: "https://www.icbfs.cl/wp-content/uploads/104523400.jpg", 
        confirmed: true};
    const product3 = {name: "Philadelfia Cheese", 
        price: 1.80, 
        description: "Excelent cheese", 
        quantity: 32, 
        img: "https://images.lider.cl/wmtcl?source=url[file:/productos/874674a.jpg]&sink", 
        confirmed: true,
        farmer_id: 1};
    const product4 = {name: "Milk", 
        price: 1.75, 
        description: "Excelent milk from free cows", 
        quantity: 16, 
        img: "https://www.icbfs.cl/wp-content/uploads/104523400.jpg", 
        confirmed: true,
        farmer_id: 1};
    const product5 = {name: "Milk", 
        price: 1.75, 
        description: "Excelent milk from free cows", 
        quantity: 16, 
        img: "https://www.icbfs.cl/wp-content/uploads/104523400.jpg", 
        confirmed: true,
        farmer_id: 1};
        const product6 = {name: "Butter", 
        price: 2.00, 
        description: "Excelent butter made from free cows", 
        quantity: 63, 
        img: "https://images.lider.cl/wmtcl?source=url[file:/productos/300575a.jpg]&sink", 
        confirmed: true,
        farmer_id: 1};
    const product7 = {name: "Milk", 
        price: 1.75, 
        description: "Excelent milk from free cows", 
        quantity: 16, 
        img: "https://www.icbfs.cl/wp-content/uploads/104523400.jpg", 
        confirmed: true,
        farmer_id: 1};
    const product8 = {name: "Philadelfia Cheese", 
        price: 1.80, 
        description: "Excelent cheese", 
        quantity: 32, 
        img: "https://images.lider.cl/wmtcl?source=url[file:/productos/874674a.jpg]&sink", 
        confirmed: true,
        farmer_id: 1};
    const product9 = {name: "Milk", 
        price: 1.60, 
        description: "Excelent milk from free cows", 
        quantity: 16, 
        img: "https://www.icbfs.cl/wp-content/uploads/104523400.jpg", 
        confirmed: true,
        farmer_id: 1};
    const product10 = {name: "Milk", 
        price: 1.75, 
        description: "Excelent milk from free cows", 
        quantity: 16, 
        img: "https://www.icbfs.cl/wp-content/uploads/104523400.jpg", 
        confirmed: true,
        farmer_id: 1};

    
    const products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10];


	return (
        <Container fluid style={{maxWidth: "100%"}} >
            <Row>
                <Col>      
                    <MarketNavbar />
                </Col>
            </Row>
            <Row>
            
                <Container >
                    <Row >
                        {products.map(product => 
                        <Col fluid="lg" lg={2} sm={4} style={{marginTop:"0.5rem", marginBottom:"0.5rem", marginLeft:"1rem", marginRight:"1rem"}}>
                            <Product product={product}/>
                        </Col>
                        )}
                    </Row>

                </Container>
            </Row>



        </Container>
		
	);
}

export default Market;