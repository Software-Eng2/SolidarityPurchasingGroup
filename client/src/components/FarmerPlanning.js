import { Container, Table,    Row, Col, Form, Button, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill, BsTrash, BsPencilSquare, BsFillInfoCircleFill } from "react-icons/bs";
import PlanningModal from "./PlanningModal";
import { useState,useEffect } from 'react';
import ConfirmModal from "./ConfirmModal";
import API from "../API";


function FarmerPlanning(props) {
    const [modalShow, setModalShow] = useState(false);
    const [productNW, setProductNw] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [update,setUpdate] = useState(false);
    const [id,setId]= useState(0);
    const [disable,setDisable] = useState(false);


    const deleteTask = (id) => {
        const del = async () => {
          await API.deleteProductNW(id);
          setDirty(true);
          
        };
        del();
    }    

    useEffect(() => {
        
        const getProductNW = async () => {
            

            const inProductNW = await API.getProductNW(props.userid);
            setProductNw(inProductNW);
            setDirty(false);
        };

        getProductNW();

        
    }, [modalShow, dirty]);

    
    
    return (
            
        <Container className="page below-nav table">
            
            <FormTable userid={props.userid} productNW={productNW} products={props.products} deleteTask={deleteTask} setModalShow={setModalShow} setUpdate={setUpdate} setId={setId} setDirty={setDirty} setDisable={setDisable} disable={disable}/>
            <div className="fixed">
                <BsFillPlusCircleFill className="pointer" size={40} color="#28a745" onClick={() => { setModalShow(true) }} />
                <PlanningModal
                    show={modalShow}
                    onHide={() => {setModalShow(false); setUpdate(false)}}
                    products={props.products}
                    userid={props.userid}
                    update={update}
                    setUpdate={setUpdate}
                    setDirty={setDirty}
                    id={id}
                    productNW={productNW}
                    
                />
            </div>
        </Container>


    );
}


function FormTable(props) {
    const [view, setView] = useState("view"); //2 possible values: view for visualizing all clients, search for visualizing only search results
    const [search, setSearch] = useState(""); //value to search
    const [modal, setModal] = useState(false);
    

    {/*const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            ciao 
            <h6 className="font-italic "> 2. If you do not save the products by the expiration date, they will be deleted and not listed for sale.</h6>
        </Tooltip>
    );*/}



    return (
        <>
            <Row className="justify-content-start align-items-center mb-2">
                <Col xs={10} md={6}>
                    <h1 className="font-italic mt-3">Your Planning

                    {/*<OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <BsFillInfoCircleFill className="justify-content-start align-items-center ml-4" fill="green" style={{ height: "30px", width: "30px" }} />
                    </OverlayTrigger>*/}
                     <BsFillInfoCircleFill className="justify-content-start align-items-center ml-4" fill="green" style={{ height: "30px", width: "30px" }}/>
                    </h1>
                </Col>

                <Col xs={10} md={6} className="d-flex justify-content-end" >
                    <Form.Control onChange={(ev) => {
                        var value = ev.target.value;
                        if (value !== "") {
                            setView("search");
                            setSearch(value);
                        }
                        else {
                            setView("view");
                        }
                    }}
                        style={{ marginTop: "1rem", width: "20rem" }} id="inlineFormInputName2" placeholder="Search here..."></Form.Control>
                </Col>

            </Row>
            <Row className="justify-content-start align-items-center mb-2">




            </Row>

            <Table responsive variant="light">
                <thead >
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Edit Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {(view === "view") ?
                        props.productNW.filter(p => p.id_user == props.userid)
                            .map(r => (
                                <tr key={r.id} className="p-0" >
                                    <td>{r.id_product} {props.products.filter(f => f.name == r.id_product && f.farmer_id == 4)
                                        .map(c =>
                                            <img key={c.id} src={c.img_path} className="img-fluid" style={{ height: "50px", width: "50px" }} />)} </td>
                                    <td>{r.quantity}</td>
                                    <td>{r.price}</td>
                                    <td><BsPencilSquare size={30} className="pointer" onClick={()=> {props.setModalShow(true); props.setUpdate(true); props.setId(r.id);}}/></td>
                                    <td><BsTrash size={30} className="pointer" fill="red" onClick={() => { props.deleteTask(r.id); }}/></td>
                                </tr>)
                            )
                        :
                        props.productNW.filter(p => p.id_user == props.userid)
                            .filter((t) => t.id_product.includes(search) )
                            .map(r => (
                                <tr key={r.id} className="p-0" >
                                    <td>{r.id_product} {props.products.filter(f => f.name == r.id_product && f.farmer_id == 4)
                                        .map(c =>
                                            <img key={c.id} src={c.img_path} className="img-fluid" style={{ height: "50px", width: "50px" }} />)} </td>
                                    <td>{r.quantity}</td>
                                    <td>{r.price}</td>
                                    <td><BsPencilSquare   className="pointer" onClick={()=> {props.setModalShow(true); props.setUpdate(true); props.setId(r.id);}}/></td>
                                    <td><BsTrash  className="pointer" fill="red" onClick={() => { props.deleteTask(r.id); }}/></td>
                                </tr>)
                            )
                    }
                </tbody>
            </Table>
            <Row>
                <Col xs={6} md={6} className="d-flex justify-content-start">
                    <Link to={{ pathname: '/farmer' }}>
                        <Button size="lg" className="mt-5" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}>Back</Button>
                    </Link>
                </Col>
                <Col xs={6} md={6} className="d-flex justify-content-end">
                    <Button disabled={props.disable} style={{ backgroundColor: '#b4e6e2', border: '0px', borderRadius: '4px', color: 'black' }} className="mt-5" onClick={() => { setModal(true) }}>Provide your estimation</Button>
                    <ConfirmModal
                        show={modal}
                        onHide={() => setModal(false)}
                        productNW={props.productNW}
                        products={props.products}
                        userid={props.userid}
                        setDirty={props.setDirty}
                        disable={props.disable}
                        setDisable={props.setDisable}
                        
                    />
                </Col>
            </Row>

        </>


    );
}



export default FarmerPlanning;