import { useState } from 'react';
import {Card, Button, Row, Col} from 'react-bootstrap'
import {pickUpIcon, deliveryIcon, arrowRightIcon} from "../Icons";
import gif from '../../img/preparation.gif'

function ClientOrders(props) {

    const clientOrders = props.clientOrders;
    const [selected, setSelected] = useState(false);
    const [order, setOrder] = useState();

    const handleClick = () =>{
        if(selected)
            setSelected(false);
        else
            setSelected(true);
     }
        switch (props.status) {
            case "pending":
                return(<div className="borders mb-3" >
                    {
                        !selected ? <PendingList clientOrders={clientOrders} handleClick={handleClick} setOrder={setOrder}/> : <SelectedOrder handleClick={handleClick} order={order}/>                   
                    }
                </div>);
            case "accepted":
                return(<div className="borders mb-3" >
                {
                    <AcceptedList acceptedOrders={clientOrders}/>                 
                }
            </div>);
            
            default:
                return(
                    <>
                    </>
                );
        }
}


function PendingList(props){

    const {clientOrders, handleClick, setOrder} = props;

    return(
        
            clientOrders.map((o) => (
                <Card key={o} className="my-3 mx-3" >
                    {/* <Card.Header>Featured</Card.Header> */}
                    <Card.Body>
                        <Row>
                        <Col xs={3} className="text-center my-auto">
                            <h4>Order #{o.id}</h4>
                            <hr/>
                            <strong> Total: <h2>€ {o.total}</h2></strong><br />
                        </Col>
                        <vr/>
                        <Col xs={7} className="my-auto">
                            <Row className="m-auto d-flex align-items-center"><h4 >Delivery method:&ensp; </h4> { o.pick_up ? pickUpIcon /* Pick-Up */ : deliveryIcon /* Delivery */}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Address:&ensp; </h4>  {o.address}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Date:&ensp; </h4> {o.date}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Time:&ensp; </h4> {o.time}</Row>
                        </Col>
                        <Col xs={2}  className=" text-right">
                            <Button variant="outline-info" className="pheight-100" onClick={()=>{handleClick(); setOrder(o) }}>{arrowRightIcon}</Button>
                        </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-muted text-center"><small>Created: {o.creation_date}</small></Card.Footer>
                </Card>
            ))
              
    );
}

function AcceptedList(props){

    const orders = props.acceptedOrders;

    return(
        
            orders.map((o) => (
                <Card key={o} className="my-3 mx-3" >
                    <Card.Body>
                        <Row>
                        <Col xs={3} className="text-center my-auto">
                            <h4>Order #{o.id}</h4>
                            <hr/>
                            <strong> Total: <h2>€ {o.total}</h2></strong><br />
                        </Col>
                        <vr/>
                        <Col xs={7} className="my-auto">
                            <Row className="m-auto d-flex align-items-center"><h4 >Delivery method:&ensp; </h4> { o.pick_up ? pickUpIcon /* Pick-Up */ : deliveryIcon /* Delivery */}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Address:&ensp; </h4>  {o.address}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Date:&ensp; </h4> {o.date}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Time:&ensp; </h4> {o.time}</Row>
                        </Col>
                        <Col>
                            <h4>We are preparing your order!</h4>
                            <img width={150} height={150} src={gif} alt="order in preparation..." />
                        </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-muted text-center"><small>Created: {o.creation_date}</small></Card.Footer>
                </Card>
            ))
              
    );
}

function SelectedOrder(props){

    const {handleClick, order} = props;

    return(
        <div className="my-3 mx-3">
            <h1>Riepilogo Ordine:</h1>
            <Row className="m-auto d-flex align-items-center"><h4>Delivery method:&ensp; </h4> {order.pick_up ? pickUpIcon /* Pick-Up */ : deliveryIcon /* Delivery */}</Row>
            <Row className="m-auto d-flex align-items-center"><h4>Address:&ensp; </h4>  {order.address}</Row>
            <Row className="m-auto d-flex align-items-center"><h4>Date:&ensp; </h4> {order.date}</Row>
            <Row className="m-auto d-flex align-items-center"><h4>Time:&ensp; </h4> {order.time}</Row>
            <h1>AGGIUNGERE POSSIBILITà DI MODIFICARE I CAMPI</h1>
            <h1>AGGIUNGERE PRODOTTI + OZIONI PER MODIFICARLI</h1>
            <h1>AGGIUNGERE BOTTONE PER ELIMINARE L'ORDINE</h1>
            <h1>AGGIUNGERE BOTTONE PER SALVARE MODIFICHE</h1>
            
            <Button onClick={handleClick}>Bottone per tornare alla lista</Button>
        </div>
    );
}


export default ClientOrders;


 