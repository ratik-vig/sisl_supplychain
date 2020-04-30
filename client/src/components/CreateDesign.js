import React from "react";
import {Container, Row, Form, Button, Spinner,Modal} from 'react-bootstrap';
import Web3 from 'web3';
import ipfs from "../ipfs"
import Supplier from '../contracts/Supplier.json'
class CreateDesign extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            file: 'upload image',
            buffer: '',
            name: '',
            price: '',
            web3: '',
            accounts: '',
            contract: '',
            loading: false
        }
    }

    componentDidMount = async () => {
        try{
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");
            
            const accounts = await web3.eth.getAccounts();
                    
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Supplier.networks[networkId];
            const instance = new web3.eth.Contract(
                Supplier.abi,
                deployedNetwork && this.props.address,
            );
            await this.setState({web3, accounts, contract: instance})
            console.log(this.state)
        }catch(error){
            alert('connection failed')
            console.log(error)
        }
    }


    captureFile = (event) =>{
        console.log('file captured')
        const file = event.target.files[0]
        const fileName = file.name
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)})
            console.log(this.state.buffer)
        }
        this.setState({file: fileName})
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true})
        try{
            console.log('working')
            const result = await ipfs.files.add(this.state.buffer)
            await this.state.contract.methods.add_design(this.state.name,this.state.price, result[0].hash).send({from: this.state.accounts[0]})
        }catch(error){
            alert(error)
        }
        this.setState({loading: false})
        this.props.onHide()
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    
    handlePriceChange = (event) => {
        this.setState({price: event.target.value})
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new design</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="justify-content-center" fluid >
                    <Row className="justify-content-center">
                            <Form onSubmit={this.handleSubmit} className="w-75" style={{maxWidth: '500px'}}>
                            <Form.Group controlId="name" >
                                <Form.Label>Design Name</Form.Label>
                                <Form.Control  name = 'name' type="text" placeholder="Enter design name" value={this.state.name} onChange={this.handleNameChange}/>
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control  type="number" placeholder="Enter price per m sq." value={this.state.price} onChange={this.handlePriceChange}/>
                            </Form.Group>

                            <Form.Group controlId="img">
                                <Form.Label>Image</Form.Label>
                                <Form.File 
                                required
                                label={this.state.file}
                                custom
                                onChange={this.captureFile}
                                />
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

export default CreateDesign