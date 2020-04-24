import React from "react"
import "../App.css"
import getWeb3 from "../getWeb3";
import Supplier from "../contracts/Supplier.json"
import SupplierFactory from '../contracts/SupplierFactory.json'
import {Navbar,Nav,NavDropdown} from "react-bootstrap"

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" variant="dark" style={{background: '#000'}}>
                <Navbar.Brand><h6>The Good Leather Company<span className="ml-1 " style={{fontSize: '10px', fontWeight:'bold'}}>ADMIN</span></h6></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" bg="dark" variant="dark">
                    <Nav className="ml-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Batches</Nav.Link>
                    <Nav.Link>Orders</Nav.Link>
                    <Nav.Link>Workers</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar