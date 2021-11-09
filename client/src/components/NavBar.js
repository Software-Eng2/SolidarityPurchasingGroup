import { Col, Navbar, Nav, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { shopIcon } from './Icons'

function NavBar(props) {

    const {loggedIn, doLogOut} = props;

    return (

        <Navbar collapseOnSelect expand="lg"/*  bg="dark" variant="dark"  */className="nav">
                <Navbar.Brand>
                    <Link to={{ pathname: '/' }} className="font-weight-bold" style={{color: "white", textDecoration: "none"}}>
                        {shopIcon}
                        {' '}
                        SP⁵G
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto justify-content-around">
                    <Col lg={3}>
                        <Link to={{ pathname: '/products' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}} /* className="mx-4" */>
                            Our Products
                        </Link>
                    </Col>
                    <Col lg={4}>
                        <Link to={{ pathname: '/' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                            Become our Supplier
                        </Link>
                    </Col>
                    <Col lg={4}>
                        <Link to={{ pathname: '/' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                            Deliver our product
                        </Link>
                    </Col>
                    <Col lg={4}>
                        <Link to={{ pathname: '/' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                            Join our warehouse
                        </Link>
                    </Col>
                </Nav>
                <Nav className="ml-3">
                    {
                        loggedIn ? (
                            <Link to={{ pathname: '/' }} onClick={doLogOut} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                                Logout
                    </Link>
                        ) : (
                            <Link to={{ pathname: '/login' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                        Login
                    </Link>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;