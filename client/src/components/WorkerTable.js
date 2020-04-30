import React from 'react'
import "../App.css";
import {Container, Row, Form, Button, Spinner,Modal,Table} from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import Web3 from 'web3';
import Supplier from '../contracts/Supplier.json'

class WorkerTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            workers: []
        }
    }

    componentDidMount = async()  => {
        try{
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");
            
            const accounts = await web3.eth.getAccounts();
                    
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Supplier.networks[networkId];
            const instance = new web3.eth.Contract(
                Supplier.abi,
                deployedNetwork && this.props.contract,
            );
            //await this.setState({web3, accounts, contract: instance})
            const num_workers = await instance.methods.get_num_workers().call()
            var workers = []
            for(var i=0;i<num_workers;i++){
                var worker_address = await instance.methods.workers_lookup(i).call()
                var worker = await instance.methods.workers(worker_address).call()
                workers.push(worker)
            }
            this.setState({workers})

        }catch(error){
            alert('connection failed')
            console.log(error)
        }
    }

    render(){
        return(
            <Container className="m-1">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                    
                    <th>Address</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.workers.map(function(worker,i){
                        return <tr key={worker.addr}>
                            <td>{worker.addr}</td>
                            <td>{worker.fname}</td>
                            <td>{worker.lname}</td>
                        </tr>
                    })}
                    <tr>
                    
                    </tr>
                    
                </tbody>
            </Table>
            </Container>
        )
    }
}

export default WorkerTable