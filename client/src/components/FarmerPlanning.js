import { Container, Table, Dropdown, ButtonGroup, ListGroup, Row, Col, Form } from "react-bootstrap";
import { BsFillPlusCircleFill, BsTrash, BsPencilFill } from "react-icons/bs";
import PlanningModal from "./PlanningModal";
import { useState } from 'react';
import dayjs from 'dayjs';


function FarmerPlanning(props) {

    const [modalShow, setModalShow] = useState(false);
    const prova = [{ id: 1, id_persona: 1, name: "Red Apple", quantity: "3.5", insert_data: '2021-11-25', expiration_data: '2021-11-29, 09:00' },
    { id: 2, id_persona: 6, name: "Tomato Seeds", quantity: "4", insert_data: '2021-11-24', expiration_data: '2021-11-29, 09:00' },
    { id: 3, id_persona: 6, name: "Carrot", quantity: "6", insert_data: '2021-11-25', expiration_data: '2021-11-29, 09:00' }
    ];
    return (

        <Container fluid className="page width-100 below-nav table">

            <FormTable userid={props.userid} prova={prova} />
            <BsFillPlusCircleFill className="fixed" size={40} color="#28a745" onClick={() => { setModalShow(true) }} />
            <PlanningModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>


    );
}


function FormTable(props) {
    const [view, setView] = useState("view"); //2 possible values: view for visualizing all clients, search for visualizing only search results
    const [search, setSearch] = useState(""); //value to search



    return (
        <>
            <Row className="justify-content-center align-items-center mb-2">
                <Col xs={10} md={6}>
                    <h1 className="font-italic mt-3">Your Planning</h1>
                </Col>
                <Col xs={2} md={6} className="d-flex justify-content-end" >
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

            <Table responsive variant="light">
                <thead >
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Insert Data</th>
                        <th>Expiration data</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(view === "view") ?
                        props.prova.filter(p => p.id_persona == props.userid)
                            .map(r => (
                                <tr key={r.id} className="p-0" >
                                    <td>{r.name}</td>
                                    <td>{r.quantity}</td>
                                    <td>{r.insert_data}</td>
                                    <td>{r.expiration_data}</td>
                                    <td><BsPencilFill fill="heavenly" /><BsTrash fill="red" /></td>
                                </tr>)
                            )
                        :
                        props.prova.filter(p => p.id_persona == props.userid)
                            .filter((t)=> t.name.includes(search) || t.insert_data.includes(search) )
                            .map(r => (
                                <tr key={r.id} className="p-0" >
                                    <td>{r.name}</td>
                                    <td>{r.quantity}</td>
                                    <td>{r.insert_data}</td>
                                    <td>{r.expiration_data}</td>
                                    <td><BsPencilFill fill="heavenly" /><BsTrash fill="red" /></td>
                                </tr>)
                            )
                    }
                </tbody>
            </Table>

        </>


    );
}



export default FarmerPlanning;