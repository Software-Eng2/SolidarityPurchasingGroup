import { useState, useEffect } from "react";
import{ Container, Table, Dropdown, Button, ButtonGroup} from "react-bootstrap";
import {OrdersList} from "../Order";
import {pickUpIcon, deliveryIcon} from "./Icons";


function OrderPage(props){

    const {orders, setOrders /*, o */, getOrdersList, changeStatus } = props;
    const [dirty, setDirty] = useState(true);

/*     const o = new OrdersList();

    const getOrdersList = async () => {
        await o.initialize();
        console.log(o.ordersList);
        setOrders(o.ordersList);        
    };
 */
/*     const changeStatus = async (order_id, status) => {
        getOrdersList();
        console.log('status of order'+ ' ' + order_id + ' ' + 'changing in... '+ status);
        o.changeStatus(order_id, status);
        setDirty(true);
    } */

    useEffect(()=> {
        if(dirty){
        //initialization of new ordersList 
        getOrdersList();
        console.log(orders);
        setDirty(false);
        }
    },[dirty]);
    
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
        <Container fluid className="page width-100 below-nav table">
           <OrderTable orders={orders} changeStatus={changeStatus}/>
        </Container>
    );
}

function OrderTable(props){

    const {orders, changeStatus} = props;

    return(
        <Table striped bordered hover responsive >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Creation Date</th>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th>Client Surname</th>
                    <th>Total</th>
                    <th>Deliver Type</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((o) => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.creation_date}</td>
                            <td>{o.client_id}</td>
                            <td>{o.client_name}</td>
                            <td>{o.client_surname}</td>
                            <td> € {o.total}</td>
                            {o.pick_up ? <td> {pickUpIcon} PickUp  </td> : <td> {deliveryIcon} Delivery </td>}
                            <td>{o.address}</td>
                            <td>{o.date}</td>
                            <td>{o.time}</td>
                            {/* <td><Button>{o.status}</Button></td> */}
                            <td>
                                <Dropdown size="sm" as={ButtonGroup}>
                                    <Dropdown.Toggle split variant="success" id="dropdown-basic" size="sm" className="dropdown">
                                        {o.status}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        <Dropdown.Item id="PENDING" onClick={(e) =>{changeStatus(o.id, e.target.id)}}>PENDING</Dropdown.Item><Dropdown.Divider />
                                        <Dropdown.Item id="ACCEPTED" onClick={(e) =>{changeStatus(o.id, e.target.id)}}>ACCEPTED</Dropdown.Item><Dropdown.Divider />
                                        <Dropdown.Item id="CANCELLING" onClick={(e) =>{changeStatus(o.id, e.target.id)}}>CANCELLING</Dropdown.Item><Dropdown.Divider />
                                        <Dropdown.Item id="FAILED" onClick={(e) =>{changeStatus(o.id, e.target.id)}}>FAILED</Dropdown.Item><Dropdown.Divider />
                                        <Dropdown.Item id="READY" onClick={(e) =>{changeStatus(o.id, e.target.id)}}>READY</Dropdown.Item><Dropdown.Divider />
                                        <Dropdown.Item id="DELIVERED" onClick={(e) =>{changeStatus(o.id, e.target.id)}}>DELIVERED</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}

export default OrderPage;

