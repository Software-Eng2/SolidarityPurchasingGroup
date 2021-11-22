import React, { useState, useLayoutEffect, useEffect } from 'react';
import{ Container, Row, Col } from "react-bootstrap";
import Product from '../components/Product';
import 'react-pro-sidebar/dist/css/styles.css';
import SideBar from '../components/SideBar';
import Basket from '../components/Basket';
import AlertWallet from '../components/AlertWallet';
import PropTypes from 'prop-types';

function Market(props) {
    const { products, client, userid} = props;
    const [collapsed, setCollapsed] = useState(false);
    const [size, setSize] = useState(0);
    const [category, setCategory] = useState('All');
    const [filter, setFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [basket, setBasket] = useState([]); //total of products ordered by a client
    const [showBasket, setShowBasket] = useState(false);

      //state if the wallet is insufficient
    const [alertWalletShow, setAlertWalletShow] = useState(false);
    const [topUp, setTopUp] = useState(0); //how much to top up

    const handleBasket = () => {setCollapsed((s) => !s); setShowBasket((s) => !s)};

    
    const searchCategory = (c) => {
        setCategory(c);
        
    };
    useEffect(() => {
        if (category === "All" ){
            setFilter(false);

        } else {
            var filtered = products.filter((el) =>
                el.category === category);
            setFilteredProducts(filtered);
            setFilter(true);
        }


    }, [category, products])

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
        <Container fluid style={{paddingLeft: 0, paddingRight: 0 , maxWidth: "100%", overflowX:"hidden"}} {...props}>

            <Basket basket={basket} client={client} setAlertWalletShow={setAlertWalletShow} clienthandleBasket={handleBasket} isOpen={showBasket} onRequestClose={handleBasket} />
            <AlertWallet show={alertWalletShow} setAlertWalletShow={setAlertWalletShow} topUp={topUp} setTopUp={setTopUp} onHide={() => {setAlertWalletShow(false); setTopUp(0)}} user={client}/>
            <Row>
                <Col xs={2} sm={2} md={2}>
                    <div className={`app `}>

                        <SideBar 
                        collapsed={collapsed}
                        width="13rem"
                        searchCategory={(cat) => searchCategory(cat)}
                        handleBasket={handleBasket}
                        //client= {props.location.state}
                        />
                    </div>

                </Col>
                <Col xs={10} sm={10} md={10}>
                    <Container fluid style={{marginTop:"2rem"}}>
                        <Row >
                            {filter ? 
                            filteredProducts.map(product => 
                                product.confirmed ? 
                                <Col fluid key={`product-"${product.id}"`} xs={12} sm={6} md={4} lg={3} >
                                    <Product product={product} basket={basket} setBasket={setBasket}/>
                                </Col> : ''
                                
                                )
                            
                            : 
                            
                            products.map(product => 
                            product.confirmed ? 
                            <Col fluid key={`product-"${product.id}"`} xs={12} sm={6} md={4} lg={3} >
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

Market.propTypes = {
    products: PropTypes.array.isRequired,
    client: PropTypes.object.isRequired
  };

export default Market;