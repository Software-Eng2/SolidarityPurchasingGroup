import { Modal, Container, Row, Col, Button} from 'react-bootstrap';
function Wallet(props) {
    return (
      <Modal {...props} centered>
        <Modal.Header className="justify-content-center">
          <Modal.Title>
            Your wallet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
                <Col xs={12}>
                    <h5 className="text-center">{props.user.name}</h5>
                    <h6 className="text-center">{props.user.email}</h6>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h6 className="text-center mt-3">Balance</h6>
                    <p className="text-center">${props.user.money}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h6 className="mt-3">Set amount</h6>
                    <small>How much would you like to pop up?</small>
                </Col>
            </Row>
            <Row>
                <Col xs={12}> 
                    <h6 className="text-center mt-3">TODO</h6>
                    
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Button className="text-center" variant="success">Top up now</Button>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
export default Wallet;
  