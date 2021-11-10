import { Table, Row, Button} from "react-bootstrap";
import {IoWallet} from "react-icons/io5";
import '../App.css';

//TODO fare join tabelle per sapere amount//
function ListOfClients(props){
    const {allClients} = props;
    const handleClick = (client) => {
        props.setWalletShow(true);
        props.setUser(client); 
    }

    return(
        <div className="w-75 mx-auto">
            <Row className="justify-content-center">
                <h1 className="font-italic font-weight-bold mt-3">List of Clients</h1>
            </Row>
            
            <Table variant="light">
                <thead>
                    <tr>
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
                       <tr key={client.id} className= "p-0">
                           {client.amount > 0 ? 
                
                            <>
                            <td className="positive">{client.name}</td>
                            <td className="positive">{client.surname}</td>
                            <td className="positive">{client.birthdate}</td>
                            <td className="positive">{client.email}</td>
                            <td className="positive">{client.amount}<Button size="sm" variant="outline-info" className="ml-5" onClick={() => handleClick(client)}>Top up</Button></td>
                            </>
                          
                             :
                            <>
                            <td className="negative" >{client.name}</td>
                            <td className="negative">{client.surname}</td>
                            <td className="negative">{client.birthdate}</td>
                            <td className="negative">{client.email}</td>
                            <td className="negative">{client.amount}
                                <Button size="sm" variant="outline-danger" className="ml-5" onClick={() => handleClick(client)}>Top up</Button></td>
                            </>
                  
                   }        
                       </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListOfClients;