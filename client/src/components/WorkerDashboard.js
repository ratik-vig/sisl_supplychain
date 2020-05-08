import React from 'react'
import "../App.css";
import {Container, Row, Form, Button, Spinner,Modal} from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import NavBarWorker from "./NavBarWorker"
import WorkerTable from "./WorkerTable"
import CreateWorker from "./CreateWorker"
import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom"
import AdminWorkerTab from './AdminWorkerTab';
import AdminHome from './AdminHome'
import AdminCatalogue from './AdminCatalogue'
import AdminBatches from './AdminBatches'
import BatchTab from './BatchTab'

class WorkerDashboard extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            show: false,
            address: '',
            batch: 1
        }
    }

    componentDidMount = () =>{
        const {address} = this.props.match.params
        console.log(address)
        this.setState({address})
    }

   

    render(){
        return(
            <Router>
            <Container fluid className="m-0 p-0">
                <NavBarWorker contract={this.state.address}/>
                <Switch>
                    <Route exact path = '/suppliers/:address' component={AdminHome} />
                    <Route path= '/suppliers/:address/orders' component={AdminWorkerTab}/>
                    
                    <Route path = '/suppliers/:address/batches' component={BatchTab} />
                    
                </Switch>
            
            </Container>
            </Router>
        )
    }

}

export default WorkerDashboard