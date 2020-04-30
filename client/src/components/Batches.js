import React from "react";
import "../App.css";
import getWeb3 from "../getWeb3";
import Supplier from "../contracts/Supplier.json"
import SupplierFactory from "../contracts/SupplierFactory.json"
import {Container,Row,ListGroup,Button} from 'react-bootstrap'
import Create from '../components/Create'
import SupplierList from '../components/SupplierList'
const Web3 = require('web3');


class Batches extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            suppliers: [],
            show: false,
            factory: '',
            deployedNetwork: '',
            web3: '',
            anySupplier:false,
            loading: true
        }
    }

    updateUI = async() => {
        const num_suppliers = await this.state.factory.methods.num_suppliers().call()
        if(num_suppliers>0){
            
            var suppliers = []
            for(var i=0;i<num_suppliers;i++){
                var supplier_address = await this.state.factory.methods.existing_suppliers(i).call()
                var supplier = new this.state.web3.eth.Contract(
                    Supplier.abi,
                    this.state.deployedNetwork && supplier_address
                )
                var supplier = await supplier.methods.supp_name().call()
                suppliers.push({name: supplier, address: supplier_address})
                
            }
            this.setState({anySupplier: true, loading: false})
            this.setState({suppliers})
        }else{
            this.setState({loading: false})
        }

    }

    componentDidMount = async() => {
        try{
            await window.ethereum.enable()
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");

            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SupplierFactory.networks[networkId];
            const factory = new web3.eth.Contract(
                SupplierFactory.abi,
                deployedNetwork && deployedNetwork.address,
            );
            this.setState({factory,deployedNetwork,web3})
            console.log(this.state)
            this.updateUI()
            console.log(this.state.suppliers)
        }catch(error){
          console.log(error)
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
                
                <Create show={this.state.show} onHide={this.handleClose} updateUI={this.updateUI} />
                <Row className="justify-content-between pl-3 pr-3">
                    <h3>Suppliers</h3>
                    <Button variant="primary" onClick={this.showModal}>New Supplier</Button>
                </Row>
                <hr/>
             <Container>
                
                <Row className="justify-content-center">
                    <ListGroup className="justify-content-center w-100 mt-5 mb-5">
                    {this.state.suppliers.length>0 ? this.state.suppliers.map(supplier => (
                        <SupplierList data={supplier} />
                    )): ''}
                    
                    
                    </ListGroup>
                </Row>
            </Container>
 
            </Container>
            
        )
    }
}

export default Batches;
