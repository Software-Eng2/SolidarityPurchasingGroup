import { Carousel, Card, CardGroup, Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import backgroundimg from '../img/finale.mp4';
function Homepage() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <div>
            <div style={{position:"relative",overflowX:"hidden"}}>
                <video style={{maxHeight:"90vh",width:"100vw"}} autoPlay loop muted>
                    <source src={backgroundimg} type='video/mp4' />
                </video>

            </div>
            <CardGroup style={{ marginTop: "12vh", marginBottom: "12vh" }}>
                <Container fluid="md">
                    <Row>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://st3.depositphotos.com/5958522/32531/i/600/depositphotos_325318570-stock-photo-counter-with-fresh-vegetables-and.jpg" />
                            </Card>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            <h1 style={{ color: "#ba0000" }}>
                                Taste the equality
                            </h1>
                            <h4 style={{ marginTop: "7vh" }}>
                                It's local. It's fair. It's for our planet.
                            </h4>
                            <Button size="lg" variant="danger" style={{ backgroundColor: "#BA0000", marginTop: "7vh" }} >
                                Discover our products!
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </CardGroup>
            <div style={{ backgroundColor: "#DEDEDE", width: "100%" }}>
                <Container>
                    <Row style={{ textAlign: "center" }} >
                        <h1 style={{ color: "#ba0000" }}>
                            JOIN US!
                        </h1>
                    </Row>
                    <Row style={{ marginTop: "10vh" }}>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://www.altromercato.it/wp-content/uploads/2021/09/produttore_Hualtaco_Peru_AgrofairEurope-scaled-e1632143818906-800x582.jpg" />
                                <Card.Body>
                                    <Card.Title>Why selling in SPG?</Card.Title>
                                    <Card.Text>
                                        You decide the price and all orders are placed before distribution. So you will bring only what has been planned, and you will leave without any unsold goods.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>

                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://st2.depositphotos.com/1518767/8182/i/600/depositphotos_81826332-stock-photo-smiling-farmer-presenting-the-local.jpg" />
                                <Card.Body>
                                    <Card.Title>Taste the equality</Card.Title>
                                    <Card.Text>
                                        It's local. It's fair. It's for our planet.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary" size="lg">
                                        Discover our products!
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );
}

export default Homepage;