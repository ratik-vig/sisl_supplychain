import React from "react";
import "../App.css";
import Supplier from "../contracts/Supplier.json"
import {Container, Row, Form, Button, Spinner,Modal} from 'react-bootstrap';
import getWeb3 from "../getWeb3";

class CreateWorker extends React.Component{



    constructor(props){
        super(props)
        this.state = {
            web3: null,
            accounts: null,
            fname: '',
            lname: '',
            ethaddr: null,
            contract:null,
            batches: null,
            loading: false,
        }
    }


    componentDidMount = async()  => {
        try{
            const web3 = await getWeb3()
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Supplier.networks[networkId];
            const instance = new web3.eth.Contract(
                Supplier.abi,
                deployedNetwork && deployedNetwork.address,
            );
            await this.setState({web3, accounts, contract: instance})
        
        }catch(error){
            alert('connection failed')
            console.log(error)
        }
    }

    

    handleAddrChange = (event) => {
        this.setState({ethaddr: event.target.value})
    }

    handleFnameChange = (event) => {
        this.setState({fname: event.target.value})
    }

    handleLnameChange = (event) => {
        this.setState({lname: event.target.value})
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state.fname)
        console.log(this.state.lname)
        console.log(this.state.ethaddr)
        console.log(this.state.accounts[0])
        this.setState({loading: true})
        try{
            await this.state.contract.methods.add_worker(this.state.ethaddr).send({from: this.state.accounts[0]})
        }catch(error){
            console.log(error.message)
            alert(error.message)
        }
        
        this.setState({loading: false})
        
    }

    

    render(){
        return(
            
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new worker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="justify-content-center" fluid >
                    <Row className="justify-content-center">
                            <Form onSubmit={this.handleSubmit} className="w-75" style={{maxWidth: '500px'}}>
                            <Form.Group controlId="ethAddress" >
                                <Form.Label>Ethereum address</Form.Label>
                                <Form.Control  name = 'ethaddr' type="text" placeholder="Enter ethereum address" value={this.state.ethaddr} onChange={this.handleAddrChange}/>
                            </Form.Group>

                            <Form.Group controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter first name" value={this.state.fname} onChange={this.handleFnameChange}/>
                            </Form.Group>

                            <Form.Group controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter last name" value={this.state.lname} onChange={this.handleLnameChange}/>
                            </Form.Group>
                            
                            {this.state.loading? 
                            <Button variant="primary" type="submit" className="mb-3" block>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                ></Spinner>Loading</Button>: <Button variant="primary" type="submit" className="mb-3" block>Submit</Button>}
                         </Form>
                        </Row>
                    </Container>
                </Modal.Body>
            
            </Modal>
        )
    }
}

export default CreateWorker;