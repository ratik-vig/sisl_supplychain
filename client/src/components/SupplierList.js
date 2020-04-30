import React from "react"
import getWeb3 from "../getWeb3";
import Supplier from "../contracts/Supplier.json"
import SupplierFactory from '../contracts/SupplierFactory.json'
import {ListGroup, Spinner, Container} from 'react-bootstrap';
import Web3 from "web3"
import {Link} from "react-router-dom";

class SupplierList extends React.Component{

    constructor(props){
        super(props)
    }

        
    render(){
        return(
           
            
               <ListGroup.Item key={this.props.data.name} className="justify-content-center">
                            <h3>{this.props.data.name}</h3>
                            <p style={{wordWrap: 'break-word'}}>{this.props.data.address}</p>
                            <Link to={`suppliers/${this.props.data.address}/admin`}>Admin Page</Link>
                </ListGroup.Item>
           
            
           
            
        )
    }
}

export default SupplierList;
