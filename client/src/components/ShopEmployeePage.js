import ListOfClients from "./ListOfClients";
import { useState, useEffect} from 'react';
import Wallet from './Wallet';

function ShopEmployeePage(props){
    const [walletShow, setWalletShow] = useState(false);
    const [increment, setIncrement] = useState(0); //how much to top up
    const [user, setUser] = useState([]); 

    const {allClients} = props;
    return(
        <>
            <ListOfClients allClients={allClients} setWalletShow={setWalletShow} setUser={setUser}/>
            <Wallet show={walletShow} setWalletShow={setWalletShow} increment={increment} setIncrement={setIncrement} onHide={() => {setWalletShow(false); setIncrement(0)}} user={user}/>
        </>
    );
}

export default ShopEmployeePage;