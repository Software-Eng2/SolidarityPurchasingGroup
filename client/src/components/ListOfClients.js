import { Table } from "react-bootstrap";


//TODO fare join tabelle per sapere amount//
function ListOfClients(props){
    const {allClients} = props;
    return(
        <div>
        <h1>List Of Client</h1>
            <Table id="task-table" variant="light">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birthdate</th>
                        <th>Email</th>
                        <th>WalletIcon</th>
                    </tr>
                </thead>
                <tbody>
                    {allClients.map((client) => (
                       <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.surname}</td>
                            <td>{client.birthdate}</td>
                            <td>{client.email}</td>
                            <td>€50</td> 
                       </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListOfClients;