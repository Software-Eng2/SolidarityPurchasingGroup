import { useState } from 'react';
import {Card, Button} from 'react-bootstrap'
import {pickUpIcon, deliveryIcon} from "../Icons";

function ClientOrders(props) {

    const {clientOrders} = props;
    console.log(clientOrders);
    return (
        <div className="borders mb-3" >
            {
                clientOrders.map((o) => (
                    <Card key={o} className="text-center my-3 mx-5">
                        {/* <Card.Header>Featured</Card.Header> */}
                        <Card.Body>
                            <Card.Title>Order #{o.id}</Card.Title>
                            <Card.Text>
                               <strong>€ {o.total}</strong><br/>
                               <strong>Delivery method: </strong> {o.pick_up ? pickUpIcon /* Pick-Up */ : deliveryIcon /* Delivery */} <br/>
                               <strong>Address: </strong> {o.address}<br/>
                               <strong>Date: </strong> {o.date}<br/>
                               <strong>Time: </strong> {o.time}
                            </Card.Text>
                            <Button variant="primary">Manage Products</Button> 
                        </Card.Body>
                        <Card.Footer className="text-muted">Created: {o.creation_date}</Card.Footer>
                    </Card>
                ))
            }
        </div>
    );
}

export default ClientOrders;