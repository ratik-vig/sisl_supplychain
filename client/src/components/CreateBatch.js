import React from "react";
import "../App.css";
import Supplier from "../contracts/Supplier.json"
import {Container, Row, Form, Button, Spinner,Modal} from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import Web3 from 'web3';


class CreateBatch extends React.Component{



    constructor(props){
        super(props)
        this.state = {
            web3: null,
            accounts: null,
            contract:null,
            loading: false,
            design: '',
            price: 0,
            designs: []
        }
    }

    loadDesigns = async() => {
        var designs = []
        const num_designs = await this.state.contract.methods.total_design().call()
        for(var i=1;i<=num_designs;i++){
            const data = await this.state.contract.methods.designs(i).call()
            designs.push({id: data.id, name: data.name, price: data.price})
        }
        this.setState({designs})
    }


    componentDidMount = async()  => {
        try{
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Supplier.networks[networkId];
            const instance = new web3.eth.Contract(
                Supplier.abi,
                deployedNetwork && this.props.contract,
            );
            await this.setState({web3, accounts, contract: instance})
            this.loadDesigns()
            
        }catch(error){
            alert('connection failed')
            console.log(error)
        }
    }

    
    handleDesignChange = (event) => {
        console.log(event.target.value)
        this.setState({design: this.state.designs[event.target.value-1].name, price: this.state.designs[event.target.value-1].price})
    }
    

    handleSubmit = async (event) => {
        event.preventDefault();
        const num_batches = await this.state.contract.methods.total_batches().call()
       
        this.setState({loading: true})
        try{
            
            await this.state.contract.methods.create_batch(this.state.design, this.state.price).send({from: this.state.accounts[0]})
        }catch(error){
            console.log(error.message)
            alert(error.message)
        }
        this.props.onHide()
        this.setState({loading: false})
        this.props.getBatch(parseInt(num_batches) + 1)
    }

    

    render(){
        return(
            
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Batch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="justify-content-center" fluid >
                    <Row className="justify-content-center">
                            <Form onSubmit={this.handleSubmit} className="w-75" style={{maxWidth: '500px'}}>

                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Design Name</Form.Label>
                                <Form.Control as="select" onChange={this.handleDesignChange} custom>
                                    <option>Select Design</option>
                                    {this.state.designs.map(des => {
                                        return <option value={des.id}>{des.name}</option>
                                    })}
                                
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control required type="number" placeholder="Price" value={this.state.price} readOnly/>
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

export default CreateBatch;