import React from 'react'
import "../App.css";
import {Container, Row, Form, Button, Spinner,Modal} from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import NavBar from "./NavBar"
import WorkerTable from "./WorkerTable"
import CreateWorker from "./CreateWorker"

class Workers extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            show: false
        }
    }

    showModal = () => {
        this.setState({show: true})
    }

    handleClose = () =>{
        this.setState({show: false})
    }

    render(){
        return(
            <Container fluid className="m-0 p-0">
                <NavBar/>
            
            <Container className="mt-3 pr-3 pl-3">
                
            <CreateWorker show={this.state.show} onHide={this.handleClose}/>
                <Row className="justify-content-between pl-3 pr-3">
                    <h3>Workers</h3>
                    <Button variant="primary" onClick={this.showModal}>Add Worker</Button>
                </Row>
                <hr/>
                <Container>
                    
                    <Row className="justify-content-center">

                        <WorkerTable/>
                    </Row>
                </Container>
 
            </Container>
            </Container>
        )
    }

}

export default Workers