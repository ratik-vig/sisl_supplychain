import React from "react";
import "../App.css";
import SupplierFactory from "../contracts/SupplierFactory.json"
import {Container, Row, Form, Button, Spinner,Modal} from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import Web3 from 'web3';


class Create extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            web3: null,
            accounts: null,
            name: '',
            contract:null,
            batches: null,
            loading: false,
        }
    }


    componentDidMount = async()  => {
        try{
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");
            
            const accounts = await web3.eth.getAccounts();
                    
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SupplierFactory.networks[networkId];
            const instance = new web3.eth.Contract(
                SupplierFactory.abi,
                deployedNetwork && deployedNetwork.address,
            );
            await this.setState({web3, accounts, contract: instance})
        }catch(error){
            alert('connection failed')
            console.log(error)
        }
    }

    

    handleChange = (event) => {
        this.setState({name: event.target.value})
        console.log(this.state.name)
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true})
        try{
            await this.state.contract.methods.create_supplier(this.state.name).send({from: this.state.accounts[0]})
        }catch(error){
            console.log(error.message)
            alert(error.message)
        }
        
        this.setState({loading: false})
        this.props.updateUI()
        this.props.onHide()
    }

    

    render(){
        return(
            
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="justify-content-center" fluid >
                    <Row className="justify-content-center">
                            <Form onSubmit={this.handleSubmit} className="w-75" style={{maxWidth: '500px'}}>
                            <Form.Group controlId="ethAddress" >
                                <Form.Label>Ethereum address</Form.Label>
                                <Form.Control  type="text" placeholder="Enter ethereum address" value={this.state.accounts} readOnly/>
                            </Form.Group>

                            <Form.Group controlId="suppliername">
                                <Form.Label>Supplier Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter supplier name" value={this.state.name} onChange={this.handleChange}/>
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

export default Create;