import { Table, Row, Button} from "react-bootstrap";
import {IoWallet} from "react-icons/io5";
import '../App.css';

//TODO fare join tabelle per sapere amount//
function ListOfClients(props){
    const {allClients} = props;
    const handleClick = (client) => {
        props.setWalletShow(true);
        props.setUser({name: "Mario rossi", email:"mario.rossi@gmail.com", money:"30"}); //TODO cambiare nome in base a quello clickato
    }

    return(
        <div className="w-75 mx-auto">
            <Row className="justify-content-center">
                <h1 className="font-italic font-weight-bold mt-3">List of Clients</h1>
            </Row>
            
            <Table variant="light">
                <thead>
                    <tr className="table">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birthdate</th>
                        <th>Email</th>
                        <th><IoWallet size={27}></IoWallet></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allClients.map((client) => (
                       <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.surname}</td>
                            <td>{client.birthdate}</td>
                            <td>{client.email}</td>
                            <td>€50 <Button inlinesize="sm" variant="outline-info" className="mt-2" onClick={() => console.log(client)}>Top up</Button></td> 
                       </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListOfClients;