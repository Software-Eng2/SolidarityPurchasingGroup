import { useState, useEffect } from "react";
import{ Container, Table, Dropdown, Button, ButtonGroup} from "react-bootstrap";
import API from '../API';
import {pickUpIcon, deliveryIcon} from "./Icons";
import { useLocation} from "react-router-dom";

function OrderPage(props){

    const {orders, setOrders, loggedIn} = props;
    const [dirty, setDirty] = useState(false);
    const orderDirty = useLocation().state;

    //change status of the selected order
    const changeStatus = async (order_id, status) => {
        console.log('status of order' + ' ' + order_id + ' ' + 'changing in... ' + status);
        API.changeStatus(order_id, status).then(() => {
            setDirty(true);
            console.log(dirty);
        });
    }

    useEffect(() => {
        console.log(loggedIn + ' ' + dirty);
        if ((loggedIn && dirty) || (loggedIn && orderDirty )) {
            //initialization of new ordersList 
            API.getAllOrders().then((orders) => {
                console.log(orders);
                setOrders(orders)
                setDirty(false);
            });
        }
    }, [loggedIn, dirty, orderDirty]);

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
                            <td> € {o.total.toFixed(2)}</td>
                            {o.pick_up ? <td> {pickUpIcon} PickUp  </td> : <td> {deliveryIcon} Delivery </td>}
                            <td>{o.address}</td>
                            <td>{o.date}</td>
                            <td>{o.time}</td>
                            <td className="text-center">
                                <TableDropdown changeStatus={changeStatus} id={o.id} status={o.status} />
                            </td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}

function TableDropdown(props) {
    const {changeStatus, id, status } = props;

    return (
        <Dropdown size="sm" as={ButtonGroup}>
            <Dropdown.Toggle split id="dropdown-basic" size="sm" className="dropdown dropdown-btn">
                {status}
            </Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item id="PENDING" onClick={(e) => { changeStatus(id, e.target.id) }}>PENDING</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item id="ACCEPTED" onClick={(e) => { changeStatus(id, e.target.id) }}>ACCEPTED</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item id="CANCELLING" onClick={(e) => { changeStatus(id, e.target.id) }}>CANCELLING</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item id="FAILED" onClick={(e) => { changeStatus(id, e.target.id) }}>FAILED</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item id="READY" onClick={(e) => { changeStatus(id, e.target.id) }}>READY</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item id="DELIVERED" onClick={(e) => { changeStatus(id, e.target.id) }}>DELIVERED</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default OrderPage;

