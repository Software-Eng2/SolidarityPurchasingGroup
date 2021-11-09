import ListOfClients from "./ListOfClients";
import { useState, useEffect} from 'react';
import Wallet from './Wallet';

function ShopEmployeePage(props){
    const [walletShow, setWalletShow] = useState(false);
    const [user, setUser] = useState([]); 

    const {allClients} = props;
    return(
        <>
            <ListOfClients allClients={allClients} setWalletShow={setWalletShow} setUser={setUser}/>
            <Wallet show={walletShow} onHide={() => setWalletShow(false)} user={user}/>
        </>
    );
}

export default ShopEmployeePage;