import React from 'react'
import {Container,Row,Button,Card,CardDeck,Col} from 'react-bootstrap'
import CreateDesign from './CreateDesign'
import Web3 from 'web3';
import Supplier from '../contracts/Supplier.json'
import Design from './Design'

class AdminCatalogue extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show: false,
            address: '',
            design: [],
            contract: ''
        }
    }

    updateUI = async () => {
        var design = []
        const num_design = await this.state.contract.methods.total_design().call()
        console.log(num_design)
        
        for(var i=1;i<=num_design;i++){
            var obj = await this.state.contract.methods.designs(i).call()
            design.push(obj)
        }

        this.setState({design})
        console.log(this.state.design)
    }

    componentDidMount = async() => {
        const {address} =  this.props.match.params
        this.setState({address})
        try{
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Supplier.networks[networkId];
            const instance = new web3.eth.Contract(
                Supplier.abi,
                deployedNetwork && address,
            );
            this.setState({web3, accounts, contract: instance})
            this.updateUI()
        
        }catch(error){
            alert(error)
        }
    }

    showModal = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }
    render(){
        return(
            <Container className="mt-3 pr-3 pl-3">
                <CreateDesign show={this.state.show} onHide={this.handleClose} contract={this.state.address} updateUI = {this.updateUI}/>
                <Row className="justify-content-between pl-3 pr-3">
                    <h3>Designs</h3>
                    <Button variant="primary" onClick={this.showModal}>Add Design</Button>
                </Row>
                <hr/>
                <Row className="justify-content-center">
                    <Col lg={12}>
                    <CardDeck>
                        {this.state.design.map(des => (
                            <Design data={des} />
                        ))}
                    </CardDeck>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AdminCatalogue