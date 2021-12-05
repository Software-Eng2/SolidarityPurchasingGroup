import{ Container, Table, Dropdown, ButtonGroup, Form} from "react-bootstrap";
import API from '../API';
import {pickUpIcon, deliveryIcon} from "./Icons";

function WarehouseEmployeePage(props){

    return(
        <Container fluid className="page below-nav table">
            <OrderTable orders={props.orders}/>
        </Container>
    );
}


function OrderTable(props){

    const {orders} = props;

    //change status of the selected order
    const changeStatus = async (order_id, status) => {
        API.changeStatus(order_id, status).then(() => {
            console.log("ok");
        });
    }


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
                <th>Preparation</th>
            </tr>
            </thead>
            <tbody>
            {
                orders.filter((o) => o.date != "" && o.time != "").map((o) => (
                    <tr key={o.id} data-testid = {`tr-${o.id}`}>
                        <td>{o.id}</td>
                        <td>{o.creation_date}</td>
                        <td>{o.client_id}</td>
                        <td>{o.client_name}</td>
                        <td>{o.client_surname}</td>
                        <td><strong>€ {o.total.toFixed(2)}</strong></td>
                        {o.pick_up ? <td> {pickUpIcon} Pick-Up  </td> : <td> {deliveryIcon} Delivery </td>}
                        <td>{o.address}</td>
                        <td>{o.date}</td>
                        <td>{o.time}</td>
                        <td className="text-center">
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    id={o.id}
                                    label={o.status === "READY" ? "Confirmed" : "Check to confirm"}
                                    checked={o.status === "READY"}
                                    disabled = {o.status === "READY"}
                                    onClick={() => { o.status="READY"; changeStatus(o.id, "READY") }}
                                />
                            </Form.Group>

                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    );
}

export default WarehouseEmployeePage;