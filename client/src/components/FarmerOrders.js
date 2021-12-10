import { useState, useEffect } from "react";
import{ Container, Table} from "react-bootstrap";
import API from '../API';
import { Clock } from "../Clock";

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
    const timerEvent = new Clock();
    const passedTime = timerEvent.checkProductsAvailabilityMilestone();
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
    
     const updateConfirmation = async (index) => { 
       let confirmed = confirmedProducts[index].quantity;
       for(let i=0;i<tempOrders[index].length; i++){
           if(confirmed - tempOrders[index][i].quantity >=0){
              confirmed -= tempOrders[index][i].quantity;
           } else{
                 //settare la quantità all'ordine i-esimo  mettere confirmed a 0 e il resto degli ordini vanno cancellati, in orders total = total - (notConfirmed*price)
                 let difference = (tempOrders[index][i].quantity - confirmed)*products[index].price;
                 console.log("la diffenza in total è"+difference);
                 await  API.updateQuantityBasket(tempOrders[index][i].id,confirmedProducts[index].id, confirmed).then(API.updateTotalInOrders(tempOrders[index][i].id, difference));
                 confirmed = 0;
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
                                <input type='number' name='quantity' disabled={passedTime} value={confirmedProducts.length > 0 ? confirmedProducts[index].quantity : ''} className = "display-amount" max={p.amount} min={0} onChange={updateFieldChanged(index)}/>  </strong></td>
                            <td className="text-center">{passedTime ? 'You cannot confirm quantity now' : <button className="dropdown dropdown-btn" onClick={()=>updateConfirmation(index)}> Confirm orders </button>}</td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}

export default FarmerOrders;