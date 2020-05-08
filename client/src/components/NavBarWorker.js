import React from "react"
import "../App.css"
import getWeb3 from "../getWeb3";
import Supplier from "../contracts/Supplier.json"
import SupplierFactory from '../contracts/SupplierFactory.json'
import {Navbar,Nav,NavDropdown} from "react-bootstrap"
import Web3 from "web3"
import {Link} from "react-router-dom"


class NavBarWorker extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            supp_name: ''
        }
    }

    componentDidMount = async() => {
        try{
            //const web3 = await getWeb3()
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");

            
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Supplier.networks[networkId];
            const contract = new web3.eth.Contract(
                Supplier.abi,
                deployedNetwork && this.props.contract,
            );
            const supp_name = await contract.methods.supp_name().call()
            this.setState({supp_name})
        }catch(error){
            console.log(error)
        }
    }

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" variant="dark" style={{background: '#000'}}>
                <Navbar.Brand className="pt-2 mt-1"><h6>{this.state.supp_name}</h6></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" bg="dark" variant="dark">
                    <Nav className="ml-auto">
                    <Nav.Link><Link className="text-white text-decoration-none" to ={`/suppliers/${this.props.contract}`}>Home</Link></Nav.Link>
                    <Nav.Link><Link className="text-white text-decoration-none" to ={`/suppliers/${this.props.contract}/batches`}>Batches</Link></Nav.Link>
                    <Nav.Link><Link className="text-white text-decoration-none" to ={`/suppliers/${this.props.contract}/orders`}>Orders</Link></Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBarWorker