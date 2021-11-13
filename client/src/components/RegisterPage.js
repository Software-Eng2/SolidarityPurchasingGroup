import { Form, Button, Container, Col, Row, Stack } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import dayjs from 'dayjs';
import API from '../API';
import User from '../User';
import { useLocation, useHistory } from "react-router-dom";


function RegisterInterface(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const role = useLocation().state;
    console.log(role);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        

        if (form.checkValidity() === false ) {
            event.stopPropagation();

        } else {
            API.createUser(new User(role, firstName, lastName, dayjs(birthday).format('DD/MM/YYYY'), email, password)).then(()=>{ history.push("/clientlist");})
        }

        setValidated(true);

    }

    return (

    <>
        <Container as={Col} sm={8} md={8} className="register-form mt-5">
            <div className="text-center user-icon">
                <FaUserCircle size={60}></FaUserCircle>
            </div>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <Form.Group as={Col} sm={5} md={5} controlId="fisrstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a name.
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group as={Col} sm={5} controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a surname.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={10} controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            value={birthday}
                            onChange={(event) => setBirthday(event.target.value)}
                            max={dayjs().format("YYYY-MM-DD")}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert your birthday date.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={7} controlId="address" className="mt-5">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="via Roma"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert your address.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={3} controlId="number" className="mt-5">
                        <Form.Label>N°</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="17"
                            value={number}
                            onChange={(event) => setNumber(event.target.value)}

                        />
                    </Form.Group>

                    <Form.Group as={Col} sm={4} controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Torino"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a city.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={3} controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Italy"
                            value={state}
                            onChange={(event) => setState(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a state.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={3} controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="10023"
                            value={postalCode}
                            onChange={(event) => setPostalCode(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a postal code.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={10} controlId="email" className="mt-5">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter your email.."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert your email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={10} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter new password.."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a new password.
                        </Form.Control.Feedback>
                        </Form.Group>

                    <Form.Group as={Col} sm={11} className="mt-5 ">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="mt-4">submit</Button>

                </Row>
            </Form>
        </Container>

        <Row className="pb-4 mb-4 ml-4 pl-4">
            <Link to={{ pathname: '/clientlist' }}>
                <Button style={{backgroundColor: '#247D37', border: '0px', borderRadius: '4px'}}>Back</Button>
            </Link>
        </Row>
    </>


    );
}


export default RegisterInterface;