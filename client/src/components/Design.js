import React from "react"
import getWeb3 from "../getWeb3";
import Supplier from "../contracts/Supplier.json"
import SupplierFactory from '../contracts/SupplierFactory.json'
import {ListGroup, Spinner, Container, Card,Col} from 'react-bootstrap';
import Web3 from "web3"
import {Link} from "react-router-dom";

class Design extends React.Component{

    constructor(props){
        super(props)

    }
        
    render(){
        return(
           
            <Col lg = {4}>
            <Card key={this.props.data.id} className="m-3">
            <Card.Img variant="top" src={`https://ipfs.io/ipfs/${this.props.data.image_hash}`} />
            <Card.Body>
              <Card.Title>{this.props.data.name}</Card.Title>
              <Card.Text>
                <p>Price: Rs. {this.props.data.price} per mm sq.</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Price: Rs. {this.props.data.price} per m sq.</small>
            </Card.Footer>
          </Card>
           </Col>
            
           
            
        )
    }
}

export default Design;
