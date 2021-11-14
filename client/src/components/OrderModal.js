import { Modal, Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';
import { useState} from 'react';
import {MdDoneOutline} from "react-icons/md";
import dayjs from 'dayjs';
import API from '../API';

function OrderModal(props) {

  const {selectedOrder, modalShow, setModalShow} = props;  
  const [done, setDone] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const updateOrder = () => {
    /* API.updateOrder().then(() => {
      
      setDone(true);
      setTimeout(() => {
        // After 3 seconds set the done false 
        setModalShow(false); 
        setDone(false);
      }, 3000)
    }).catch((err) => console.log(err)); */
    setDone(true);
      setTimeout(() => {
        // After 3 seconds set the done false 
        setModalShow(false); 
        setDone(false);
      }, 3000)
  }

    return (
      <Modal {...props}  centered>
        {done ? 
        <Modal.Body style={{backgroundColor: "#d4edda"}}>
          <Alert show={done} variant="success">
              <Alert.Heading className="mt-2">
                <MdDoneOutline size={30} className="mr-3"/>
                Order Modified!
              </Alert.Heading>
              <p>
                Your Order has been successfully modified. 
              </p>
          </Alert>
        </Modal.Body>
          : 
      <>
        <Modal.Header  style={{backgroundColor: "#b4e6e2"}} className="justify-content-center">
          <Modal.Title>
            Order {selectedOrder.id} - {selectedOrder.client_name} {selectedOrder.client_surname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Container>            
            <Row className="mt-1">
                <Col xs={12} >
                    <h6 className="text-center mt-1">Products:</h6>
                    {/* To be fetched from basket table in db */}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={6}>
                  <h6>Select pick-up date</h6>
                </Col>
                <Col xs={6}>
                <Form.Control
                    type="date" 
                    placeholder="date" 
                    value={date} 
                    onChange={(event) => setDate(event.target.value)}
                    min={dayjs().format("YYYY-MM-DD")} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={6}>
                  <h6 >Select pick-up time</h6>
                </Col>
                <Col xs={6}>
                <Form.Control /* isInvalid={invalidDeadline}  */
                    type="time" 
                    placeholder="time" 
                    value={time}
                    onChange={(event) => setTime(event.target.value)} />
                </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#b4e6e2"}}>
          <Col className="text-left">
          <Button variant='danger'onClick={props.onHide}>
              Close
          </Button>
          </Col>
          <Col className="text-right" >
          <Button variant="success" /* disabled={props.increment <= 0} */ onClick={updateOrder}>
              Confirm
         </Button>
         </Col>
        </Modal.Footer>
        </>}
      </Modal>
    );
  }
  
export default OrderModal;