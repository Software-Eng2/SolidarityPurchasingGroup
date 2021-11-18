import { useEffect, useState } from "react";
import { Container, Row, Table, Col } from "react-bootstrap";
import { ClientsList } from "../Client";

function VirtualClock(props){

    const [allocated, setAllocated] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [clientObject, setClientObject] = useState(undefined);

    console.log('Prova');
    console.log(clientObject);

    useEffect(async () => {
        if(!allocated){
            setClientObject(new ClientsList());
            setAllocated(true);
        }

        if(allocated && !initialized){
            let res = await clientObject.initialize();
            if(res){
                setInitialized(true);
            }
        }
    }, [allocated]);


    return(
        <Container>
            <Row>
                <Col>
                    <Table>
                        <thead >
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Birthdate</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(initialized === true) ?                        
                        clientObject.getClients().map((client) => (
                        <tr key={client.id} className="p-0">        
                                <td>{client.name}</td>
                                <td>{client.surname}</td>
                                <td>{client.birthdate}</td>
                                <td>{client.email}</td>
                        </tr>))
                        :
                        <>
                        </>
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )

}

export default VirtualClock;