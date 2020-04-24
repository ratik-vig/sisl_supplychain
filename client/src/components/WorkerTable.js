import React from 'react'
import "../App.css";
import {Container, Row, Form, Button, Spinner,Modal,Table} from 'react-bootstrap';
import getWeb3 from "../getWeb3";

class WorkerTable extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <Container>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                    
                    <th>Address</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>0x891360F18e2b7fAEA5D5e9Ac144Cae0cA048f3a6</td>
                    <td>Ratik</td>
                    <td>Vig</td>
                    </tr>
                    
                </tbody>
            </Table>
            </Container>
        )
    }
}

export default WorkerTable