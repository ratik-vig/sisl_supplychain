import React from 'react'
import {Container,Card,Row,Col, CardDeck} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Web3 from 'web3';
import Supplier from '../contracts/Supplier.json'
import BatchStatusTable from './BatchStatusTable'
import BatchProgressForm from './BatchProgressForm'

class Batch extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            batch: [],
            web3: null,
            accounts: '',
            contract: null,
        }
    }

    

    componentDidMount = async() => {
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
        }catch(error){
            alert(error)
        }
    }

    render(){
        return(
            <Container className="mt-3 pr-3 pl-3 ">
                <Row className="justify-content-center">
                    <Col lg={12}>
                        <CardDeck>
                        <Col lg={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">Batch ID</Card.Title>
                                    <Card.Text className="text-center">{this.props.batch.uid}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">Design Name</Card.Title>
                                    <Card.Text className="text-center">{this.props.batch.design_name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">Price per m sq.</Card.Title>
                                    <Card.Text className="text-center">{this.props.batch.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="mt-3">
                                <Card.Body>
                                    <Card.Title className="text-center">Area</Card.Title>
                                    <Card.Text className="text-center">{this.props.batch.area}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="mt-3">
                                <Card.Body>
                                    <Card.Title className="text-center">Amount</Card.Title>
                                    <Card.Text className="text-center">{this.props.batch.amount}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="mt-3">
                                <Card.Body>
                                    <Card.Title className="text-center">Certificate</Card.Title>
                                    <Card.Text className="text-center">
                                        {this.props.certificate ? <a href={`https://ipfs.io/ipfs/${this.props.batch.image}`} target="_blank">Show</a>: 'NA'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        </CardDeck>
                    </Col>
                    
                </Row>

                <Row className="justify-content-center">
                    <BatchStatusTable address={this.props.address} status={this.props.status} completed_by={this.props.completed_by}/>
                </Row>

                <Row className="justify-content-center">
                    <BatchProgressForm updateUI = {this.props.updateUI} address={this.props.address} batch={this.props.batch}/>
                </Row>
                
            </Container>
        )
    }
}

export default Batch