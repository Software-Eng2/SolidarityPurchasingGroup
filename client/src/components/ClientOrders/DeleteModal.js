import { Modal, Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';
import {arrowLeftIcon,iconConfirm} from "../Icons";
import { useState, useEffect} from 'react';
import {MdDoneOutline} from "react-icons/md";
import API from '../../API';

function DeleteModal(props) {

  const {order_id, setModalShow, clientOrders /* setBasket */ /* setDirty */} = props;  
  const [done, setDone] = useState(false);
  
  const deleteOrder = () => {
    API.deleteOrder(order_id).then(() => {
      
      setDone(true);
      /* setDirty(true); */
      setTimeout(() => {
        // After 3 seconds set the done false 
        setModalShow(false); 
        setDone(false);
        clientOrders.filter((o)=>o.id !== order_id);
        window.location.reload();
      }, 3000)
    }).catch((err) => console.log(err));
  };

/*   useEffect(() => {
    if(order){
      API.getBasket(order.id).then((products) => {
        setBasket(products);
      })
    }
}, [order]); */

    return (
      <Modal {...props} backdrop="static" keyboard={false}  centered data-testid="order-modal" >
        {done ? 
            <Modal.Body style={{ backgroundColor: "#d4edda", height: "10rem", borderRadius:"5px"}}>
                
                <h3><MdDoneOutline size={30} className="mr-3" /> Order Canceled!</h3>
                <p className="mt-3">
                    Your Order has been successfully canceled.
                </p>
            </Modal.Body>
          : 
      <>
        <Modal.Header  style={{borderColor: "#dedede"}} className="justify-content-center">
          <Modal.Title>
            By confirming you are going to cancel this order. <strong>Do you wish to continue?</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{borderColor: "#dedede"}}>
          <Col className="text-left">
          <Button data-testid="button-close"  variant='danger'onClick={props.onHide}>
              Undo
          </Button>
          </Col>
          <Col className="text-right" >
          <Button data-testid="button-confirm" variant="success" onClick={deleteOrder}>
              Confirm
         </Button>
         </Col>
        </Modal.Footer>
        </>}
      </Modal>
    );
}
  
export default DeleteModal;