import React from 'react'
import "../App.css";
import {Container, Row, Form, Button, Spinner,Modal,Table} from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import Web3 from 'web3';
import Supplier from '../contracts/Supplier.json'

class BatchStatusTable extends React.Component{
    

    

    render(){
        return(
            <Table responsive striped bordered hover className="mt-5">
                <thead>
                    <tr>
                    
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Completed By</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <td>Preparatory Stage</td>
                        {this.props.status[0] ? <td>Completed</td>: <td>Pending</td>}
                        <td>{this.props.completed_by[0]}</td>
                    </tr>
                    <tr>
                        <td>Tanning</td>
                        {this.props.status[1] ? <td>Completed</td>: <td>Pending</td>}
                        <td>{this.props.completed_by[1]}</td>
                    </tr>
                    <tr>
                        <td>Quality Check</td>
                        {this.props.status[2] ? <td>Completed</td>: <td>Pending</td>}
                        <td>{this.props.completed_by[2]}</td>
                    </tr>
                    <tr>
                        <td>Packing</td>
                        {this.props.status[3] ? <td>Completed</td>: <td>Pending</td>}
                        <td>{this.props.completed_by[3]}</td>
                    </tr>
                    
                </tbody>
            </Table>
        )
    }
}

export default BatchStatusTable