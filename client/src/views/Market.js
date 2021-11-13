import React, { useState, useLayoutEffect, useEffect } from 'react';
import{ Container, Row, Col } from "react-bootstrap";
import Product from '../components/Product';
import 'react-pro-sidebar/dist/css/styles.css';
import SideBar from '../components/SideBar';
import Basket from '../components/Basket';

function Market(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [size, setSize] = useState(0);
    const [category, setCategory] = useState('All');
    const [filter, setFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [basket, setBasket] = useState([]); //total of products ordered by a client
    const [width, setWitdh] = useState("");
    const [showBasket, setShowBasket] = useState(false);
    const handleBasket = () => {setCollapsed((s) => !s); setShowBasket((s) => !s)};

    const products = props.products;
    const searchCategory = (category) => {
        setCategory(category);
        
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
        <Container fluid style={{paddingLeft: 0, paddingRight: 0 , maxWidth: "100%"}} >

            <Basket basket={basket} handleBasket={handleBasket} isOpen={showBasket} onRequestClose={handleBasket}/>
            <Row>
                <Col xs={2} sm={2} md={2}>
                    <div className={`app `}>

                        <SideBar 
                        collapsed={collapsed}
                        width="13rem"
                        searchCategory={(cat) => searchCategory(cat)}
                        handleBasket={handleBasket}
                        />
                    </div>

                </Col>
                <Col xs={10} sm={10} md={10}>
                    <Container fluid style={{marginTop:"2rem"}}>
                        <Row >
                            {filter ? 
                            filteredProducts.map(product => 
                                product.confirmed ? 
                                <Col fluid xs={12} sm={6} md={4} lg={3} >
                                    <Product product={product} basket={basket} setBasket={setBasket}/>
                                </Col> : ''
                                
                                )
                            
                            : 
                            
                            products.map(product => 
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