import { Table, Row, Button} from "react-bootstrap";
import {IoWallet} from "react-icons/io5";
import '../App.css';
import { useState} from 'react';

//TODO fare join tabelle per sapere amount//
function ListOfClients(props){
    const {allClients} = props;
    const [selected, setSelected] = useState(""); //client selected
    const TotalAmount = 67;         //TODO SOTITUIRE CON IL TOTALE DELL'ACQUISTO


    const handleClick = (client) => {
        props.setWalletShow(true);
        props.setUser(client); 
    }

    return(
        <div className="w-75 mx-auto">
            <Row className="justify-content-center">
                <h1 className="font-italic mt-3">Select the client</h1>
            </Row>
            
            <Table variant="light">
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
                    {allClients.map((client) => (
                       <tr key={client.id} className="p-0" style={selected == client ? client.amount < TotalAmount ? {backgroundColor: "#f8d7da"} : {backgroundColor: "#d4edda"} : {}}  onClick={()=>{setSelected(client);}}>        
                            <td>{client.name}</td>
                            <td>{client.surname}</td>
                            <td>{client.birthdate}</td>
                            <td>{client.email}</td>
                            <td>{client.amount}{client.amount < TotalAmount ? <Button size="sm" variant="outline-danger" className="ml-5" onClick={() => handleClick(client)}>Top up</Button>: ""} </td> 
                       </tr>
                    ))}
                </tbody>
            </Table>
        
            <Row className="justify-content-center">
                <Button className="mt-5" disabled={selected=="" || selected.amount < TotalAmount}>Continue</Button>
            </Row>
        </div>
    );
}

export default ListOfClients;