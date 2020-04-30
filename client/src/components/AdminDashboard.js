import React from 'react'
import "../App.css";
import {Container, Row, Form, Button, Spinner,Modal} from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import NavBar from "./NavBar"
import WorkerTable from "./WorkerTable"
import CreateWorker from "./CreateWorker"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import AdminWorkerTab from './AdminWorkerTab';
import AdminHome from './AdminHome'
import AdminCatalogue from './AdminCatalogue'

class AdminDashboard extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            show: false,
            address: ''
        }
    }

    componentDidMount = () =>{
        const {address} = this.props.match.params
        this.setState({address})
    }

    showModal = () => {
        this.setState({show: true})
    }

    handleClose = () =>{
        this.setState({show: false})
    }

    render(){
        return(
            <Router>
            <Container fluid className="m-0 p-0">
                <NavBar contract={this.state.address}/>
                <Switch>
                    <Route exact path = '/suppliers/:address/admin' component={AdminHome} />
                    <Route path= '/suppliers/:address/admin/workers' component={AdminWorkerTab}/>
                    <Route path = '/suppliers/:address/admin/catalogue' component={AdminCatalogue}/>
                </Switch>
            
            </Container>
            </Router>
        )
    }

}

export default AdminDashboard