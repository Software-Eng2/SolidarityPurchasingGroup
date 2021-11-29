import { Modal, Button, Row, Card, Col } from 'react-bootstrap';
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { useState } from "react";
import API from '../API';





function ConfirmModal(props) {
  const { show, ...rest } = props;

  const deleteUpdateProduct = () => {
    let status = false;
    {/*let products = props.products.filter(f => f.farmer_id == props.userid)
    console.log(products);
    products = props.productNW.map(r =>
      products.filter(f => r.id_product == f.name)
    );
    console.log(products);*/}



    const create = () => {


      props.productNW.map(r => (

        props.products.filter(f => f.name == r.id_product && f.farmer_id == 4)
          .map(c => {

            add({ id_product: r.id_product, description: c.description, category: c.category, quantity: r.quantity, price: r.price, id_user: r.id_user, img_path: c.img_path })

          }

          )
      )
      )
    }

    const add = async (b) => {
      const result = await API.createProduct({ name: b.id_product, description: b.description, category: b.category, quantity: b.quantity, price: b.price, farmer_id: b.id_user, img_path: b.img_path, confirmed: 1 });
    }




    const del = async () => {
      await API.deleteAllUserProductNW(props.userid).then(props.onHide);
      props.setDisable(true);
      props.setDirty(true);
    }

    const up = async (b) => {
      await API.changeProduct({ farmer_id: b.id_user, name: b.name, quantity: b.quantity });
      props.setDisable(true);
      props.setDirty(true);
    }

   
  create();
  del();
    
  }




  return (
    <>

      <Modal
        show={show}
        onHide={rest.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title><BsFillExclamationTriangleFill className="mb-2" fill="red" /> This Action is irreversible!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          maxHeight: 'calc(100vh - 210px)',
          overflowY: 'auto'
        }}>
          <Row className="justify-content-start align-items-center mb-2">
            {/*<BsFillExclamationTriangleFill fill="yellow" />  Are you sure? This action is irreversible !*/}
            <h3 style={{ color: "green" }}>Summary : </h3>
          </Row>
          <Row className="justify-content-start align-items-center mb-2">
            <CardRiepilogo productNW={props.productNW} products={props.products} userid={props.userid} />
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide} >
            Close
          </Button>
          <Button style={{ backgroundColor: '#b4e6e2', border: '0px', borderRadius: '4px', color: 'red' }} onClick={deleteUpdateProduct} >
            List Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CardRiepilogo(props) {


  return (
    <>
      {
        props.productNW.map(t =>
          props.products.filter(f => f.name == t.id_product && f.farmer_id == 4)
            .map(w =>
              <Col key={w.id} className="d-flex justify-content-center">
                <Card style={{ width: '20rem' }} className="mt-3">
                  <Card.Img className="center" variant="top" src={w.img_path} style={{ height: "80px", width: "80px" }} />
                  <Card.Body>
                    <h5>Product: {t.id_product}</h5>
                    <h5>Quantity: {t.quantity}</h5>
                    <h5>Price: {t.price}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
    </>

  );
}

export default ConfirmModal;