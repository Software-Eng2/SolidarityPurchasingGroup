import React from 'react';
import SlidingPane from 'react-sliding-pane';
import{ Container, Row, Col, Form} from "react-bootstrap";
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { useHistory } from "react-router-dom"; 
import API from '../API';
import dayjs from 'dayjs';
import { Order } from '../Order';

function Basket(props){
    const basket = props.basket;
    const qty = basket.length;
    const client = props.client;
    let history = useHistory();

    const sum = (key) => {
        return basket.reduce((a, b) => a + (b[key] || 0), 0);
    }
    const total = sum("total");

    const handleShop = () => {
        if(client.amount < total){
            props.setAlertWalletShow(true);
        }else{
            const id = dayjs().unix();
            const now = dayjs().format('YYYY-MM-DD');
            const time = dayjs().format('HH:mm')
            const order = new Order(
                id,
                now,
                client.id,
                client.name,
                client.surname,
                total,
                now,
                time
            );
            
            API.createOrder(order).then(function(response){
                basket.map((product) => {
                    const productBasket = {
                        order_id: response.id,
                        product_id: product.id,
                        quantity: product.quantity
                    };
                    const success = API.createBasket(productBasket).then((response) => {
                        if (!response.inserted){
                            console.log("Error inserting basket in db.");
                        }
                        return response.inserted;
                    })
                    return success;
        
                })
            });
            history.push({pathname:'/orders', state: {orderDirty: true}});
        }

    }

	return(
		<SlidingPane
            className="basket"
			width="23rem"
            from="left"
            isOpen={props.isOpen}
			onRequestClose={props.onRequestClose}
            hideHeader={true}
		>
			<Container>
                <Row className="justify-content-center">
                    <div
                    style={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 26,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        
                    }}
                    >
                    Your Basket
                    </div>
                </Row>
                <hr className='solid'/>
                {basket.map(product =>
                <Row className='product-basket '>
                    <Col xs={4} md={4}>
                        <div className='img-container'>
                            <img style={{height: "3rem", width:"3rem"}} src={product.img} alt={product.name}/>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
                        <Row>
                            <h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>{product.name} x {product.quantity}</h3>
                        </Row>
                        <Row>
                            <h3 style={{fontSize: "1rem", marginTop: "3px", padding: "0"}}>Total: €{product.total.toFixed(2)}</h3>                        
                        </Row>
                    </Col>
                    <Col xs={2} md={2}>
                        <Row style={{marginTop:"8px"}}>
                            <button className='cancel-basket'  >
                                X
                            </button>
                        </Row>
                    </Col>
                    
                </Row> 
                )}
                { qty > 0 ?
                <>
                    <Row className='justify-content-center'>
                            <div
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                marginTop: "2rem",
                                fontSize: 22,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                
                            }}
                            >
                            Total: €{total.toFixed(2)}
                            </div>

                        </Row>
                    <hr className='solid'/>
                        <Form>
                            <Row className='justify-content-center'>
                            
                                <Col xs={12} md={6}>
                                    <div key="default-radio">
                                        <Form.Check 
                                            type="radio"
                                            id="default-radio"
                                            label="Pick-up"
                                        />
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div key="default-radio">
                                        <Form.Check
                                                disabled
                                                type="radio"
                                                label="Delivery"
                                                id="disabled-default-radio"
                                            />
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                        
                        <Row className='justify-content-center'>
                            <div className='card-button'>
                                <button style={{fontWeight:"bold"}} onClick={()=>{handleShop()}}>
                                    Shop now 
                                </button>
                            </div>

                        </Row>
                </>
                    :
                    ''
                }
                
                
            </Container>
		    </SlidingPane>
	);
}

export default Basket;