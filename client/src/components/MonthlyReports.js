import React, {useEffect, useState} from "react";
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import {Button, Col, Row, Tab, Table, Tabs} from "react-bootstrap";
import API from "../API";
import {Link} from "react-router-dom";
//TODO gestire anno in considerazione
function MonthlyReports(props) {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [failedOrders, setFailedOrders] = useState([]);
    const [unretrievedFood, setUnretrievedFood] = useState([]);
    const [key, setKey] = useState('01');

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(()=>{
        API.getAllOrders().then((o) => {
            setOrders(o);

            let products = [];
            let count = 0;
            o.map(order => {
                API.getBasket(order.id).then((prod) => {
                    prod.map(p => products.push({...p, order_id: order.id }) );
                    count ++;
                    if(count === o.length){
                        setData(o, products);
                        setProducts(products);

                    }
                })
            })

        });
    },[]);


    function setData(orders, products){
        let arrayOrders = [0,0,0,0,0,0,0,0,0,0,0,0];
        let arrayFood = [0,0,0,0,0,0,0,0,0,0,0,0];

        orders.filter(o => o.status = 'FAILED')
            .map(o => {
                switch(o.creation_date.substring(5,7)){
                    case '01' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[0] += 1;
                            }
                        })
                        arrayOrders[0] += 1;
                        break;
                    case '02' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[1] += 1;
                            }
                        })
                        arrayOrders[1] += 1;
                        break;
                    case '03' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[2] += 1;
                            }
                        })
                        arrayOrders[2] += 1;
                        break;
                    case '04' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[3] += 1;
                            }
                        })
                        arrayOrders[3] += 1;
                        break;
                    case '05' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[4] += 1;
                            }
                        })
                        arrayOrders[4] += 1;
                        break;
                    case '06' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[5] += 1;
                            }
                        })
                        arrayOrders[5] += 1;
                        break;
                    case '07' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[6] += 1;
                            }
                        })
                        arrayOrders[6] += 1;
                        break;
                    case '08' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[7] += 1;
                            }
                        })
                        arrayOrders[7] += 1;
                        break;
                    case '09' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[8] += 1;
                            }
                        })
                        arrayOrders[8] += 1;
                        break;
                    case '10' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[9] += 1;
                            }
                        })
                        arrayOrders[9] += 1;
                        break;
                    case '11' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[10] += 1;
                            }
                        })
                        arrayOrders[10] += 1;
                        break;
                    case '12' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[11] += 1;
                            }
                        })
                        arrayOrders[11] += 1;
                        break;
                    default:
                        break;
                }
            })
        setFailedOrders(arrayOrders);
        setUnretrievedFood(arrayFood);
    }


    function getTotalOrder() {
        let total = 0;
        failedOrders.map(i => total+=i);
        return total;
    }

    function getTotalFood(month) {
        return  unretrievedFood[month-1];
    }

    function filterProducts(month){
        let filter = [];
        let filteredO = orders.filter(o => o.status = 'FAILED' && o.creation_date.substring(5,7) === month);
        products.map(p => {
            for(let o of filteredO)
                if(o.id === p.order_id)
                    filter.push(p);
        })
        console.log(filter)
        return filter;
    }
    function getTotalFoodEuro(month) {
       let filter = filterProducts(month);
        let total = 0;
        filter.map(p => total += p.price * p.quantity);
        return total.toFixed(2);
    }


    return (
        <>
            <MDBContainer>
                <Bar data =  {{
                    labels:months,
                    datasets: [
                        {
                            label: "Number of failed orders",
                            data: failedOrders,
                            backgroundColor: "rgba(98, 182, 239,0.4)",
                            borderWidth: 1,
                            borderColor: "#000000",
                        }
                    ]
                }}
                />
            </MDBContainer>
            <hr style={{ marginTop: 10, marginBottom: 10}} />
            <MDBContainer>
                <Bar data =  {{
                    labels: months,
                    datasets: [
                        {
                            label: "Number of unretrieved food",
                            data: unretrievedFood,
                            backgroundColor: "rgba(113, 205, 205,0.4)",
                            borderWidth: 1,
                            borderColor: "rgba(113, 205, 205, 1)",
                        }
                    ]
                }}
                />
            </MDBContainer>
            <hr style={{ marginTop: 10, marginBottom: 10}} />
            <Tabs
                activeKey={key}
                onSelect={(k) => {setKey(k);}}
                className="mb-3 months"
                align="center"
            >
                <Tab eventKey="01" title="January">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(1)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("01")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("01")}/>
                    </Row>
                </Tab>
                <Tab eventKey="02" title="February">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(2)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("02")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("02")}/>
                    </Row>
                </Tab>
                <Tab eventKey="03" title="March">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(3)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("03")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("03")}/>
                    </Row>
                </Tab>
                <Tab eventKey="04" title="April">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(4)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("04")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("04")}/>
                    </Row>
                </Tab>
                <Tab eventKey="05" title="May">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(5)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("05")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("05")}/>
                    </Row>
                </Tab>
                <Tab eventKey="06" title="June">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(6)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("06")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("06")}/>
                    </Row>
                </Tab>
                <Tab eventKey="07" title="July">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(7)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("07")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("07")}/>
                    </Row>
                </Tab>
                <Tab eventKey="08" title="August">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(8)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("08")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("08")}/>
                    </Row>
                </Tab>
                <Tab eventKey="09" title="September">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(9)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("09")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("09")}/>
                    </Row>
                </Tab>
                <Tab eventKey="10" title="October">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(10)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("10")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("10")}/>
                    </Row>
                </Tab>
                <Tab eventKey="11" title="November">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(11)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("11")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("11")}/>
                    </Row>
                </Tab>
                <Tab eventKey="12" title="December">
                    <Row className='mt-3 mb-4' align='center'>
                        <Col xs={12}>
                            <h6>Total number of unretrived food this month: {getTotalFood(12)}</h6>
                        </Col>
                        <Col xs={12}>
                            <h6>Total euro of unretrived food this month: {getTotalFoodEuro("11ì2")} €</h6>
                        </Col>
                        <ProductTable products={filterProducts("12")}/>
                    </Row>
                </Tab>
            </Tabs>
            <Row className="mt-5" >
                <Col xs={12} sm={12} md={3} >
                    <Link to={{ pathname: '/manager' }}>
                        <Button size="md" className="mb-5 ml-5">Back</Button>
                    </Link>
                </Col>
            </Row>
        </>
    );
}
function ProductTable(props) {
    return (
        props.products.length > 0 ?
        <Col xs={12} md={{ span: 8, offset: 2 }}>
            <Table striped bordered hover responsive >
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {props.products.map(product =>
                    <tr key={`${product.id}`} data-testid={`tr-${product.id}`}>
                        <td> {product.order_id}</td>
                        <td>{product.name} </td>
                        <td> {product.quantity}</td>
                        <td>{product.price} €</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Col> : ""
    );
}

export default MonthlyReports;
export {ProductTable};
