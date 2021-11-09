import ListOfClients from "./ListOfClients";

function ShopEmployeePage(props){
    const {allClients} = props;
    return(
        <ListOfClients allClients={allClients}/>
    );
}

export default ShopEmployeePage;