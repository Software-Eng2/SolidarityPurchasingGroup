import { Modal, Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';
import {MdDoneOutline} from "react-icons/md";
import {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import API from '../API';

function AlertCancellingOrders(props) {

  const [done, setDone] = useState(false);
  const [showLaterModal, setShowLaterModal] = useState(false);
  let history = useHistory();
  const updateWallet = () => {
    API.updateWallet(parseInt(props.topUp) + parseInt( props.currentClient.amount), props.currentClient.id).then(() => {
      let amountCancellingOrders = 0;
      props.cancelOrders.map((o) => (amountCancellingOrders += o.total))
      console.log(amountCancellingOrders);
    // TODO marcare gli ordini come non cancellati
      props.currentClient.amount = parseInt(props.topUp)+parseInt(props.currentClient.amount);
      if(props.currentClient.amount > props.amountCancellingOrders){
        API.deleteNotification(props.currentClient.id).then(()=>console.log("deleted"))
      }

      setDone(true);
      setTimeout(() => {
        // After 3 seconds set the done false 
        props.setAlertWalletShow(false);
        props.setNotificationFlag(1);
        setDone(false);
        props.setTopUp(0);
      }, 3000)
    }).catch((err) => console.log(err));
  }

  const handleLaterModal = () => {
    setShowLaterModal(true);
    setTimeout(() => {
      // After 3 seconds set the ShowLaterModal false
      props.setAlertWalletShow(false);
      props.setNotificationFlag(1);
      setShowLaterModal(false);
      props.setTopUp(0);
    }, 3000)
  }


    return (
      <>
        {showLaterModal ?
            <Modal {...props} centered>
              <Modal.Body style={{backgroundColor: "#f8d7da"}}>
                <Alert show={showLaterModal} variant="danger">
                  <Alert.Heading className="mt-2">
                    <MdDoneOutline size={30} className="mr-3"/>
                    Status of orders: CANCELLING!
                  </Alert.Heading>
                  <p>Remember to top up to confirm the order!</p>
                </Alert>
              </Modal.Body>
            </Modal>
           :

            <Modal {...props} centered>
              {done ?
              <Modal.Body style={{backgroundColor: "#d4edda"}}>
                <Alert show={done} variant="success">
                    <Alert.Heading className="mt-2">
                      <MdDoneOutline size={30} className="mr-3"/>
                      Top Up Success
                    </Alert.Heading>
                    <p>
                      Your top up has been successfully done.<br/> You will receive a notification when your order is ready.
                    </p>
                </Alert>
              </Modal.Body>
                :
            <>
              <Modal.Header className="justify-content-center" style={{backgroundColor: "#f8d7da"}} >
                <Modal.Title>
                  <b className="mr-1"> Attention! </b>Better top up your wallet
                </Modal.Title>
              </Modal.Header>
              <small className="text-center">If you don't top up your wallet, your orders will be cancelled at 08:00 pm</small>
              <Modal.Body >
                <Container>
                  <Row className="mt-1">
                      <Col xs={12} >
                          <h6 className="text-center mt-1">Balance</h6>
                          <h3 className="text-center">€ {props.currentClient.amount}</h3>
                      </Col>
                  </Row>
                  <br/>
                  {props.cancelOrders ?
                  <Row>
                      <Col xs={12}>
                        <h6 className="mt-3">Orders marked as <strong>CANCELLING:</strong></h6>
                        {
                       props.cancelOrders.map((o) => (
                          <Row key={o.id}>
                            <Col xs={2} >
                              <strong>ID: {o.id}</strong>
                            </Col>
                            <Col xs={7} >
                            <strong>CREATION DATE: </strong>{o.creation_date}
                            </Col>
                            <Col xs={3} >
                            <strong>TOTAL: </strong> € {o.total}
                            </Col>
                          </Row>
                        ))
                       }
                      </Col>
                  </Row>
                  : ""}
                  <Row>
                      <Col xs={12}>
                        <br/>
                        <h6 className="mt-3">Set amount</h6>
                        <small className="ml-1">How much would you like to top up?<b> At least € {props.amountCancellingOrders}</b></small>
                      </Col>
                  </Row>
                  <Form>
                    <Form.Group as={Row} className="mb-3 mt-2">
                      <Form.Label column xs={1} md={1} className="ml-3">€</Form.Label>
                      <Col xs={5} md={5}>
                        {/*TODO non funziona number*/}
                        <Form.Control
                          type="number"
                          onChange={(event) => props.setTopUp(event.target.value)}
                          data-testid = "boxTopUp"
                        />
                        </Col>
                    </Form.Group>
                  </Form>


                  <Row className="justify-content-center">
                      <Button
                        data-testid="button-top-up"
                        className="text-center mt-5"
                        variant="success"
                        disabled={props.topUp < props.amountCancellingOrders}
                        onClick={updateWallet}>
                          Top up now
                      </Button>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer style={{backgroundColor: "#f8d7da"}}>

                  <Link to={{ pathname: '/products'}}>
                      <Button variant="danger" onClick={handleLaterModal}>Top up later</Button>
                  </Link>
              </Modal.Footer>
              </>}
            </Modal>}
      </>
    );
  }
  
export default AlertCancellingOrders;
  