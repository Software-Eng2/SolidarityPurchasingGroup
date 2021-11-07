import {
    Row, Button, Form, Card,
  } from 'react-bootstrap';
  import { useState } from 'react';
  
  function LoginForm(props) {
    const { doLogIn } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (username === '' || password === '') {
        setInvalidUsername(username === '');
        setInvalidPassword(password === '');
      } else {
        doLogIn(username, password);
      }
    };
  
    const handleChange = (event) => {
      if (event.target.id === 'username') {
        setUsername(event.target.value);
        setInvalidUsername(event.target.value === '');
      } else if (event.target.id === 'password') {
        setPassword(event.target.value);
        setInvalidPassword(event.target.value === '');
      }
    };
  
    return (
      <div className="login">
        <Row className="mt-5 justify-content-center">
        <Card className="text-center" style={{ width: '24rem' }}>
          <Card.Body>
            <Form>
              <Form.Group className="text-left mb-4" controlId="username">
                <Form.Label>Email:</Form.Label>
                <Form.Control isInvalid={invalidUsername} placeholder="Enter Email" type="email" value={username} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please insert username.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="text-left mb-4" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control isInvalid={invalidPassword} placeholder="Enter Password" type="password" value={password} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please insert password.</Form.Control.Feedback>
              </Form.Group>
              <Button className="btn-lg btn-block" variant="danger" onClick={handleSubmit}>Log In</Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      </div>
    );
  }
  
  export default LoginForm;