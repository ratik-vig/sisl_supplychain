import React from "react";
import "../App.css";
import getWeb3 from "../getWeb3";
import Supplier from "../contracts/Supplier.json"
import SupplierFactory from "../contracts/SupplierFactory.json"
import {Container,Row,ListGroup,Button, Modal} from 'react-bootstrap'
import Create from '../components/Create'
import SupplierList from '../components/SupplierList'
const Web3 = require('web3');


class Batches extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
            show: false
        }
    }

    componentDidMount = async() => {
        try{
          const web3 = new Web3(
            new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e')
          );
        }catch(error){
          console.log(error)
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
            
            <Container className="mt-3 pr-3 pl-3">
                
                <Create show={this.state.show} onHide={this.handleClose}/>
                <Row className="justify-content-between pl-3 pr-3">
                    <h3>Suppliers</h3>
                    <Button variant="primary" onClick={this.showModal}>New Supplier</Button>
                </Row>
                <hr/>
             <Container>
                
                <Row className="justify-content-center">

                    <SupplierList />
                </Row>
            </Container>
 
            </Container>
            
        )
    }
}

export default Batches;
