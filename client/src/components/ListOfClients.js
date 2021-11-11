import { Container, Table, Row, Button, Form, Col} from "react-bootstrap";
import {IoWallet} from "react-icons/io5";
import '../App.css';
import { useState} from 'react';

//TODO fare join tabelle per sapere amount//
function ListOfClients(props){
    const {allClients} = props;
    const [selected, setSelected] = useState(""); //client selected
    const [view, setView] = useState("view"); //2 possible values: view for visualizing all clients, search for visualizing only search results
    const [search, setSearch] = useState(""); //value to search
    const TotalAmount = 67;         //TODO SOTITUIRE CON IL TOTALE DELL'ACQUISTO


    const handleClick = (client) => {
        props.setWalletShow(true);
        props.setUser(client); 
    }

    return(
        <Container className="page width-100 below-nav table">
            <Row className="justify-content-center align-items-center">
                <Col xs={10}>
                    <h2 className="font-italic mt-3">Select the client</h2>
                </Col>
                <Col xs={2} className="d-flex justify-content-end" >
                    <Form.Control onChange={(ev) => {
                        var value = ev.target.value;
                        if(value !== ""){
                            setView("search");
                            setSearch(value);
                        }
                        else{
                            setView("view");
                        }                        
                    }} 
                     style={{marginTop:"1rem", width:"20rem"}}  id="inlineFormInputName2" placeholder="Search here..."></Form.Control>
                </Col>
            </Row>
            
            <Table responsive variant="light">
                <thead >
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birthdate</th>
                        <th>Email</th>
                        <th><IoWallet size={27}></IoWallet></th>
                    </tr>
                </thead>
                <tbody>
                    {(view === "view") ? 
                    allClients.map((client) => (
                       <tr key={client.id} className="p-0" style={selected == client ? client.amount < TotalAmount ? {backgroundColor: "#f8d7da"} : {backgroundColor: "#d4edda"} : {}}  onClick={()=>{setSelected(client);}}>        
                            <td>{client.name}</td>
                            <td>{client.surname}</td>
                            <td>{client.birthdate}</td>
                            <td>{client.email}</td>
                            <td>$ {client.amount}{client.amount < TotalAmount ? <Button size="sm" variant="outline-danger" className="ml-5" onClick={() => handleClick(client)}>Top up</Button>: ""} </td> 
                       </tr>
                    ) )
                    :
                    allClients.filter((c) => c.name.includes(search) || c.surname.includes(search) || c.email.includes(search)).map((client) => (
                        <tr key={client.id} className="p-0" style={selected == client ? client.amount < TotalAmount ? {backgroundColor: "#f8d7da"} : {backgroundColor: "#d4edda"} : {}}  onClick={()=>{setSelected(client);}}>        
                             <td>{client.name}</td>
                             <td>{client.surname}</td>
                             <td>{client.birthdate}</td>
                             <td>{client.email}</td>
                             <td>$ {client.amount}{client.amount < TotalAmount ? <Button size="sm" variant="outline-danger" className="ml-5" onClick={() => handleClick(client)}>Top up</Button>: ""} </td> 
                        </tr>
                     ))}
                </tbody>
            </Table>
        
            <Row className="justify-content-center">
                <Button className="mt-5" disabled={selected=="" || selected.amount < TotalAmount}>Continue</Button>
            </Row>
        </Container>
    );
}

export default ListOfClients;