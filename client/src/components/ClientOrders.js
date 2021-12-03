import { useState } from 'react';
import {Card, Button, Container} from 'react-bootstrap'

function ClientOrders(props) {

    const {clientOrders} = props;
    console.log(clientOrders);
    return (
        <Container fluid className="page width-100 below-nav table">
            {
                clientOrders.map((o) => (
                    <Card key={o} className="text-center mb-3 mx-5">
                        {/* <Card.Header>Featured</Card.Header> */}
                        <Card.Body>
                            <Card.Title>Order #</Card.Title>
                            <Card.Text>
                               Order Info
                            </Card.Text>
                            <Button variant="primary">Modify Icon [apre modal per modificare ordine]</Button> 
                        </Card.Body>
                        <Card.Footer className="text-muted">Created: 2 days ago</Card.Footer>
                    </Card>
                ))
            }
        </Container>
    );
}

export default ClientOrders;