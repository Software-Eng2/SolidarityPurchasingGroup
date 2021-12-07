import { useState, useEffect } from "react";
import{ Container, Table} from "react-bootstrap";
import API from '../API';

function FarmerOrders(props){
    const {orderedProducts} = props;
    const [orders, setOrders] = useState([]); // set of orders with their respective quantity for each product
    const sendQuantities = orderedProducts.map((p) => ({id: p.id, quantity: p.amount}));
    // Do here the fetch between products and return of new query
    
    useEffect(() => {
        sendQuantities.forEach(product => {
            let tempOrder = API.getOrderedByFarmerByDate(product.id);
            console.log(tempOrder);
            setOrders([...orders, tempOrder]);
        })
    });
    console.log(orders);
    return (
        <Container fluid className="page width-100 below-nav table">
            <FarmerOrderTable products={orderedProducts} quantities={sendQuantities} orders={orders}/>
        </Container>

    );

}

function FarmerOrderTable(props){
    const {products, quantities, orders } = props;
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
                                <input type='number' name='quantity' value={confirmedProducts.length > 0 ? confirmedProducts[index].quantity : ''} className = "display-amount" max={p.amount} min={0} onChange={updateFieldChanged(index)}/>  </strong></td>
                            <td className="text-center"><button className="dropdown dropdown-btn"> Confirm orders </button> </td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}

export default FarmerOrders;