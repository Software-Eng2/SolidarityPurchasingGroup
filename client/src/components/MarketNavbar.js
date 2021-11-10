import { Col, Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MarketNavbar(props) {


    return (

        <Navbar collapseOnSelect expand="lg"/*  bg="dark" variant="dark"  */className="market-nav">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto justify-content-end">
                    <Col lg={3}>
                        <Link to={{ pathname: '/products' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}} /* className="mx-4" */>
                            Dairies
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <Link to={{ pathname: '/' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                            Fruits Vegetables
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <Link to={{ pathname: '/' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                            Cheese
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <Link to={{ pathname: '/' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                            Meat
                        </Link>
                    </Col>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MarketNavbar;