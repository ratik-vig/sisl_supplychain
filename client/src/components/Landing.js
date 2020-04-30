import React from "react";
import "../App.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Container, Row, Col, Button} from 'react-bootstrap';
import getWeb3 from "../getWeb3"
import {Link} from "react-router-dom";

class Landing extends React.Component{


    render(){
        return(
            
            <Container fluid="true" className="d-flex flex-column justify-content-center black-back w-100 m-0 p-0" style={{minHeight:'100vh',height: '100%'}}>
                
                        <Jumbotron className=" w-90 justify-content-center black-back">
                            <h3 className="text-center main-heading" >Welcome. </h3>
                            <h5 className="text-center main-heading">Please select your role to continue. </h5>
                        </Jumbotron>
                    
                
                <Container className="d-flex flex-column">
                    <Row className="m-2 justify-content-center">
                      
                        <Button variant="outline-primary" className="w-25 text-white" style={{minWidth: '150px'}}>Manufacturer</Button>
                       
                    </Row>

                    <Row className="m-2 justify-content-center">
                        
                            <h5 className="text-center main-heading">OR</h5>
                        
                    </Row>

                    <Row className="m-2 mb-5 justify-content-center">
                        
                    <Link to="/suppliers" className="text-white w-25" style={{minWidth: '150px'}}><Button variant="outline-primary" className="w-100 text-white" >Supplier</Button></Link>
                    
                    </Row>
                </Container>

                
                
            </Container>
            
        )
    }
}

export default Landing;