import React, { useState, useLayoutEffect, useEffect } from 'react';
import{ Container, Row, Col } from "react-bootstrap";
import Product from '../components/Product';
import 'react-pro-sidebar/dist/css/styles.css';
import SideBar from '../components/SideBar';
import Basket from '../components/Basket';
import AlertWallet from '../components/AlertWallet';

function Market(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [size, setSize] = useState(0);
    const [basket, setBasket] = useState([]); //total of products ordered by a client
    const [width, setWitdh] = useState("");
    const [showBasket, setShowBasket] = useState(false);

      //state if the wallet is insufficient
    const [alertWalletShow, setAlertWalletShow] = useState(false);
    const [topUp, setTopUp] = useState(0); //how much to top up

    const handleBasket = () => {setCollapsed((s) => !s); setShowBasket((s) => !s)};

    const products = props.products;
    const client = props.client;
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        if (size < 1000 ) {
            setCollapsed(true);
        } 
        if (size >= 1000 && !showBasket) {
            setCollapsed(false);
        }
    }, [size, showBasket])
  
	return (
        <Container fluid style={{paddingLeft: 0, paddingRight: 0 , maxWidth: "100%"}} >

            <Basket basket={basket} client={client} setAlertWalletShow={setAlertWalletShow} clienthandleBasket={handleBasket} isOpen={showBasket} onRequestClose={handleBasket} />
            <AlertWallet show={alertWalletShow} setAlertWalletShow={setAlertWalletShow} topUp={topUp} setTopUp={setTopUp} onHide={() => {setAlertWalletShow(false); setTopUp(0)}} user={client}/>
            <Row>
                <Col xs={2} sm={2} md={2}>
                    <div className={`app `}>

                        <SideBar 
                        collapsed={collapsed}
                        width="13rem"
                        basket={basket}
                        handleBasket={handleBasket}
                        //client= {props.location.state}
                        />
                    </div>

                </Col>
                <Col xs={10} sm={10} md={10}>
                    <Container fluid style={{marginTop:"2rem"}}>
                        <Row >
                            {products.map(product => 
                            product.confirmed ? 
                            <Col fluid xs={12} sm={6} md={4} lg={3} >
                                <Product product={product} basket={basket} setBasket={setBasket}/>
                            </Col> : ''
                            
                            )}
                        </Row>
                        {/* style={{marginTop:"0.5rem", marginBottom:"0.5rem", marginLeft:"1rem", marginRight:"1rem"}} */}

                    </Container>

                </Col>
                
            </Row>



        </Container>
		
	);
}

export default Market;