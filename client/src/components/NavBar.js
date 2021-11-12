import { Col, Navbar, Nav, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { shopIcon } from './Icons'

function NavBar(props) {

    const {loggedIn, doLogOut} = props;

    const roles = [{ role: 'client', link: 'Join our Community' },
                   { role: 'farmer', link: 'Become our Supplier' },
                   { role: 'rider', link: 'Deliver our Products' }];

    return (

        <Navbar collapseOnSelect expand="lg"/*  bg="dark" variant="dark"  */className="nav">
            <Navbar.Brand>
                <Link to={{ pathname: '/' }} className="font-weight-bold" style={{color: "white", textDecoration: "none"}}>
                    {shopIcon}
                    {' '}
                    SP⁵G
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                {!loggedIn &&
                <Nav className="mx-auto justify-content-around">
                <Col lg={3}>
                    <Link to={{ pathname: '/products' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }} /* className="mx-4" */>
                        Our Products
                    </Link>
                </Col>
                {
                    roles.map((r) => (
                        <Col lg={4} key={r.role}>
                            <Link to={{ pathname: '/registerForm', state: r.role }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                {r.link}
                            </Link>
                        </Col>
                    ))
                }
            </Nav>}
                <Nav className="d-flex justify-content-end"> 
                    {
                        loggedIn ? 
                            <Col>
                                <Link to={{ pathname: '/' }} onClick={doLogOut} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                    Logout
                                </Link>
                            </Col>
                            : 
                            <Link to={{ pathname: '/login' }} className="font-weight-light" style={{color: "white", textDecoration: "none"}}>
                                Login
                            </Link>    
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;