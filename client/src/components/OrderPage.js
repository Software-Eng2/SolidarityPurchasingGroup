import { useState, useEffect } from "react";
import{ Container, Row, Col, Table} from "react-bootstrap";
import {OrdersList} from "../Order";


function OrderPage(props){

    const [orders, setOrders] = useState([]);

    const getOrdersList = async () => {
        let o = new OrdersList();
        await o.initialize();
        console.log(o.ordersList);
        setOrders(o.ordersList);        
    };

    useEffect(()=> {
        //initialization of new ordersList 
        getOrdersList();
        console.log(orders)
    },[]);
    
/*     useEffect(() => {

        const getOrdersList = async () => {
            let o = new OrdersList();
            await o.initialize();
            console.log(o.ordersList);
            setOrders(o.ordersList);
        };

        getOrdersList();
        console.log(orders)
   }, []); */

    return (
        <Container fluid>
           <OrderTable orders={orders} />
        </Container>
    );
}

function OrderTable(props){

    const {orders} = props;

    return(
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Creation Date</th>
                    <th>Client ID</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Pick Up</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((o) => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.creation_date}</td>
                            <td>{o.client_id}</td>
                            <td>{o.total}</td>
                            <td>{o.status}</td>
                            <td>{o.pick_up}</td>
                            <td>{o.address}</td>
                            <td>{o.date}</td>
                            <td>{o.time}</td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}

export default OrderPage;

