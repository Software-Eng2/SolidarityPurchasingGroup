import { Button} from 'react-bootstrap';
function ClientsList(props) {

    const handleClick = () => {
        props.setWalletShow(true);
        props.setUser({name: "Mario rossi", email:"mario.rossi@gmail.com", money:"30"}); //TODO cambiare nome in base a quello clickato
      }

    return (
        <>
            <h1>Clients List </h1> 
            <Button variant="primary" onClick={() => handleClick()}>
                Button to pop up client wallet
            </Button>
        </>
    );
  }
  
export default ClientsList;
  