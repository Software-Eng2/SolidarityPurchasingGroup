import{ Container, Table, Dropdown, ButtonGroup,Badge} from "react-bootstrap";
import {pickUpIcon, deliveryIcon} from "./Icons";



function Manager(props){
    
    
    return(
        <>
        <Container fluid className="page width-100 below-nav table" >
            <OrderTable orders={props.orders}/>
        </Container>
        </>

    );

}


function OrderTable(props){

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
                    props.orders.filter(f=> f.status == "ACCEPTED").map((o) => (
                        <tr key={o.id} data-testid = {`tr-${o.id}`}>
                            <td>{o.id}</td>
                            <td >{o.creation_date}</td>
                            <td >{o.client_id}</td>
                            <td >{o.client_name}</td>
                            <td >{o.client_surname}</td>
                            <td ><strong>€ {o.total.toFixed(2)}</strong></td>
                            {o.pick_up ? <td > {pickUpIcon} Pick-Up  </td> : <td > {deliveryIcon} Delivery </td>}
                            <td >{o.address}</td>
                            <td >{o.date ? o.date : <strong>click to update</strong>}</td>
                            <td >{o.time ? o.time : <strong>click to update</strong>}</td>
                            <td className="text-center">
                                <Badge bg="success">CONFIRMED</Badge>
                            </td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}


export default Manager;