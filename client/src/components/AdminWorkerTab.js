import React from 'react'
import "../App.css";
import {Container, Row, Form, Button, Spinner,Modal} from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import NavBar from "./NavBar"
import WorkerTable from "./WorkerTable"
import CreateWorker from "./CreateWorker"
import {BrowserRouter as Router, Switch} from "react-router-dom"

class AdminWorkerTab extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            show: false,
            address: ''
        }
    }

    componentDidMount = () =>{
        const {address} = this.props.match.params
        this.setState({address})
    }

    showModal = () => {
        this.setState({show: true})
    }

    handleClose = () =>{
        this.setState({show: false})
    }

    render(){
        return(
            <Container className="mt-3 pr-3 pl-3 ">
                
            <CreateWorker show={this.state.show} onHide={this.handleClose} contract={this.state.address}/>
                <Row className="justify-content-between pl-3 pr-3">
                    <h3>Workers</h3>
                    <Button variant="primary" onClick={this.showModal}>Add Worker</Button>
                </Row>
                <hr/>
                <Container>
                    
                    <Row className="justify-content-center">

                        <WorkerTable contract={this.state.address} />
                    </Row>
                </Container>
 
            </Container>
        )
    }
}

export default AdminWorkerTab