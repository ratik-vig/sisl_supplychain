import React from "react"
import "../App.css";
import getWeb3 from "../getWeb3";
import Supplier from "../contracts/Supplier.json"
import SupplierFactory from '../contracts/SupplierFactory.json'
import {ListGroup, Spinner, Container} from 'react-bootstrap';
import Web3 from "web3"
import {Link} from "react-router-dom";

class SupplierList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            anySupplier:false,
            suppliers: [],
            loading: true
        }
    }
    
        componentDidMount = async() => {
            
             try{
                //const web3 = await getWeb3()
                const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");

                
                const accounts = await web3.eth.getAccounts();
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = SupplierFactory.networks[networkId];
                const factory = new web3.eth.Contract(
                    SupplierFactory.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                const num_suppliers = await factory.methods.num_suppliers().call()
                if(num_suppliers>0){
                    
                    
                    var suppliers = []
                    for(var i=0;i<num_suppliers;i++){
                        var supplier_address = await factory.methods.existing_suppliers(i).call()
                        var supplier = new web3.eth.Contract(
                            Supplier.abi,
                            deployedNetwork && supplier_address
                        )
                        var supplier = await supplier.methods.supp_name().call()
                        suppliers.push({name: supplier, address: supplier_address})
                        
                    }
                    this.setState({suppliers})
                    console.log(this.state.suppliers)
                    {this.setState({anySupplier:true,loading:false})}
                }else{
                    this.setState({anySupplier: false, loading:false})
                }
              
                
            }catch(error){
                alert('connection failed')
                console.log(error)
            } 
            
        }
    render(){
        return(
                <Container className="justify-content-center mb-3">
                {this.state.loading?<div className="d-flex justify-content-center"><Spinner animation="grow" variant="primary"></Spinner></div>:<div>
                {this.state.anySupplier?<ListGroup className="justify-content-center w-100 mt-5">
                {this.state.suppliers.map(function(supplier,i){
                    return <ListGroup.Item key={supplier.name} className="justify-content-center">
                    <h3>{supplier.name}</h3>
                    <p>{supplier.address}</p>
                    <Link to={`suppliers/${supplier.address}/admin`}>Admin Page</Link>
                </ListGroup.Item>
                })}
                        
                </ListGroup>:<div class="d-flex justify-content-center"><h5>No suppliers</h5></div>}</div>}
                </Container>
           
            
        )
    }
}

export default SupplierList;
