import OrdersList from "./OrdersList";
import OrderModal from "./OrderModal";
import { useState } from 'react';

function OrdersPage(props){
    const {orders, setOrders, loggedIn} = props;
    const [modalShow, setModalShow] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(''); //current order selected for top up


    return(
        <>
            <OrdersList orders={orders} setOrders={setOrders} loggedIn={loggedIn} setSelectedOrder={setSelectedOrder} setModalShow={setModalShow}/>
            <OrderModal show={modalShow} setModalShow={setModalShow} onHide={() => {setModalShow(false)}} selectedOrder={selectedOrder}/>
        </>
    );
}

export default OrdersPage;