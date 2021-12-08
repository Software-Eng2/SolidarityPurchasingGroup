import { useState, useEffect } from "react";
import{ Container, Table} from "react-bootstrap";
import API from '../API';

function FarmerOrders(props){
    const {orderedProducts} = props;
    const [orders, setOrders] = useState([]); // set of orders with their respective quantity for each product
    const sendQuantities = orderedProducts.map((p) => ({id: p.id, quantity: p.amount}));
    // Do here the fetch between products and return of new query
    

    return (
        <Container fluid className="page width-100 below-nav table">
            <FarmerOrderTable products={orderedProducts} quantities={sendQuantities} orders={orders}/>
        </Container>

    );

}

function FarmerOrderTable(props){
    const {products, quantities, orders} = props;
    const [confirmedProducts, setConfirmedProducts] = useState([]);
    const [tempOrders, setTempOrders] = useState([]);
    console.log('Orders: ', orders);
    useEffect(() => {
        setConfirmedProducts(quantities);
    }, [quantities]);

    let tO = [];
    
    function fetchOrdersByFarmer() {
     quantities.forEach(async (product, index) => {
         const tempOrder =  await API.getOrderedByFarmerByDate(product.id);
         tO[index] = tempOrder;
         setTempOrders(tO);
     })
     }

    useEffect(() => {
         fetchOrdersByFarmer();
    },[]);
    //TODO MODIFICARE TOTAL NELLA TABELLA ORDERS
     const updateConfirmation = async (index) => {
       let confirmed = confirmedProducts[index].quantity;
       for(let i=0;i<tempOrders[index].length; i++){
           if(confirmed - tempOrders[index][i].quantity >=0){
               console.log("caso 1:   "+confirmed);
              confirmed -= tempOrders[index][i].quantity;
              console.log("caso 1 ora confirmed diventa: "+confirmed);
           } else{
                 //settare la quantità all'ordine i-esimo  mettere confirmed a 0 e il resto degli ordini vanno cancellati
                 await  API.updateQuantityBasket(tempOrders[index][i].id,confirmedProducts[index].id, confirmed);
                 console.log("caso 2:   " +confirmed);
                 confirmed = 0;
                 console.log("caso 2 , confirmed dovrebbe essere 0: "+confirmed);

           } 
       }
    } 
    
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
                            <td className="text-center"><button className="dropdown dropdown-btn" onClick={()=>updateConfirmation(index)}> Confirm orders </button> </td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}

export default FarmerOrders;