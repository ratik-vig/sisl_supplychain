import React from "react";
import "../App.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Container, Row, Col, Button} from 'react-bootstrap';

class Landing extends React.Component{
    render(){
        return(
            <Container fluid className="d-flex flex-column justify-content-center black-back" style={{minHeight:'100vh',height: '100%'}}>
                <Row>
                    <Col fluid>
                        <Jumbotron className="black-back">
                            <h3 className="text-center main-heading" >Welcome. </h3>
                            <h5 className="text-center main-heading">Please select your role to continue. </h5>
                        </Jumbotron>
                    </Col>
                </Row>
                <Container className="d-flex flex-column">
                    <Row className="m-2 justify-content-center">
                      
                        <Button variant="outline-primary" className="w-25 text-white">Manufacturer</Button>
                       
                    </Row>

                    <Row className="m-2 justify-content-center">
                        
                            <h5 className="text-center main-heading">OR</h5>
                        
                    </Row>

                    <Row className="m-2 mb-5 justify-content-center">
                        
                            <Button variant="outline-primary" className="w-25 text-white">Supplier</Button>
                        
                    </Row>
                </Container>
                

            </Container>
            
        )
    }
}

export default Landing;