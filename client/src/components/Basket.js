import React from 'react';
import SlidingPane from 'react-sliding-pane';
import{ Container, Row, Col} from "react-bootstrap";
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { useHistory } from "react-router-dom"; 

function Basket(props){
    const basket = props.basket;
    const qty = basket.length;
    const client = props.client;
    let history = useHistory();

    const handleShop = () => {
        let totale = 0;
        basket.map(info => {totale += info.price * info.quantity})
        if(client.amount < totale){
            props.setAlertWalletShow(true);
        }else{
            history.push('/orders');
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
                    <hr className='solid'/>
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