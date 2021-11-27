import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import{ Container, Row, Col } from "react-bootstrap";
import SideBar from './SideBar';
import FarmerProduct from './FarmerProduct';
import API from '../API';
import { FaCalendarAlt, FaPlus} from "react-icons/fa";
import {ImSad } from "react-icons/im";

function FarmerInterface(props) {
    const { products, userid} = props;
    const [collapsed, setCollapsed] = useState(false);
    const [size, setSize] = useState(0);
    const [category, setCategory] = useState('All');
    const [filter, setFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [basket, setBasket] = useState([]); //total of products ordered by a client
    const [showBasket, setShowBasket] = useState(false);
    const [currentFarmer, setCurrentFarmer] = useState('');
    useEffect(()=>{
        if(userid){
            API.getUserInfo(userid).then((user) => {
                setCurrentFarmer(user.name + ' ' + user.surname);
            });
        }
        console.log(currentFarmer);
            
    },[currentFarmer, userid]);

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

            <Row style={{minHeight: "45rem"}}>
                <Col xs={2} sm={2} md={2}>
                    <div className={`app `}>

                        <SideBar 
                        collapsed={collapsed}
                        width="13rem"
                        searchCategory={(cat) => searchCategory(cat)}
                        handleBasket={handleBasket}
                        userRole="farmer"
                        //client= {props.location.state}
                        />
                    </div>

                </Col>
                <Col xs={10} sm={10} md={10}>
                    <Container style={{marginTop:"0.5rem"}}>
                        <Row align='center'>
                            <Col>
                                <h3 style={{fontSize:'35px', color:'#1d1d1d'}}> Welcome, {currentFarmer}! </h3>
                            </Col>
                        </Row>
                        <hr style={{marginTop:0}}/>
                        <Row align='center' >
                            <Col xs={12} sm={12} md={6} >
                                <Link to={{ pathname: '/farmerPlanning' }}>
                                    <div className="farmer-button">
                                        <button disabled={products.length == 0 ? true : false}>
                                            <FaCalendarAlt/> Plan for next week
                                        </button>
                                       
                                    </div>
                                </Link>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <Link to={{ pathname: '/farmerPlanning' }}>
                                    <div className="farmer-button">
                                        <button  >
                                            <FaPlus/> Add new product
                                        </button>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                        <hr/>
                    </Container>
                    <Container fluid style={{marginTop:"2rem"}}>
                        <Row >
                            {filter ? 
                            filteredProducts.map(product => 
                                product.confirmed ? 
                                <Col fluid key={`product-"${product.id}"`} xs={12} sm={6} md={4} lg={3} >
                                    <FarmerProduct product={product} basket={basket} setBasket={setBasket}/>
                                </Col> : ''
                                )
                            : 
                            products.map(product => 
                            product.confirmed ? 
                            <Col fluid key={`product-"${product.id}"`} xs={12} sm={6} md={4} lg={3} >
                                <FarmerProduct product={product} basket={basket} setBasket={setBasket}/>
                            </Col> : ''
                            )}
                        </Row>
                        <Row align='center'> 
                            {products.length == 0 ? 
                            <Col xs={12} sm={12} md={12} lg={12}> 
                                <h3 style={{fontSize: "2.5rem", margin: "4", padding: "0", color: "#247D37"}}> 
                                There are no products yet <ImSad />
                                </h3>
                            </Col>
                            : 
                            ''
                            }
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        
    );
}



export default FarmerInterface;

