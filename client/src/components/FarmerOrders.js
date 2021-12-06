import { useState } from "react";
import { useEffect } from "react";
import{ Container, Table} from "react-bootstrap";

function FarmerOrders(props){
    const {orderedProducts} = props;
    const sendQuantities = orderedProducts.map((p) => ({id: p.id, quantity: p.amount}));
  
    
    return (
        <Container fluid className="page width-100 below-nav table">
            <FarmerOrderTable products={orderedProducts} quantities={sendQuantities}/>
        </Container>

    );

}

function FarmerOrderTable(props){
    const {products, quantities } = props;
    const [confirmedProducts, setConfirmedProducts] = useState([]);
    
    useEffect(() => {
        setConfirmedProducts(quantities);
    }, [quantities]);
    // TODO: Send quantities when confirm button is pressed and confirm orders 
    const updateFieldChanged = index => e => {
        let newArr = [...confirmedProducts]; 
        const newNumber = Number(e.target.value);
        if (newNumber > products[index].amount){ // if quantity inserted is higher than maximum, insert maximum
            newArr[index]['quantity'] = products[index].amount;
        } else {
            newArr[index]['quantity'] = Number(e.target.value); // replace e.target.value with whatever you want to change it to
        }
        setConfirmedProducts(newArr);
      }

    return (
        <Table striped bordered hover responsive >
            <thead>
                <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Name of product</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Estimated</th>
                    <th className="text-center">Ordered</th>
                    <th className="text-center">Confirmed</th>
                    <th className="text-center">Confirmation</th>
                </tr>
            </thead>
            <tbody>
                {   
                    products.map((p, index) => (
                        <tr key={p.id} data-testid = {`tr-${p.id}`}>
                            <td className="text-center">{p.id}</td>
                            <td className="text-center">{p.name}</td>
                            <td className="text-center"><strong>€ {p.price.toFixed(2)}</strong></td>
                            <td className="text-center"><strong >{p.estimated}</strong></td>
                            <td className="text-center"><strong >{p.amount}</strong></td>
                            <td className="text-center"><strong>
                                <input type='number' name='quantity' value={confirmedProducts[index].quantity} className = "display-amount" max={p.amount} min={0} onChange={updateFieldChanged(index)}/>  </strong></td>
                            <td className="text-center"><button className="dropdown dropdown-btn"> Confirm orders </button> </td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}

export default FarmerOrders;