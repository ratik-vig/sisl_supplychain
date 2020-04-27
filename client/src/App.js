import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import Landing from "./components/Landing";
import Create from "./components/Create";
import Batches from "./components/Batches"
import Suppliers from './components/SupplierList'
import NavBar from './components/NavBar'
import Workers from './components/Workers'
import WorkerTable from './components/WorkerTable'
import CreateWorker from './components/CreateWorker'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Container, Row, Col, Button,Jumbotron} from 'react-bootstrap';
import "./App.css"

class App extends React.Component{

    

  render(){
    return(
        <Router>
        <Switch>
          <Route exact path = "/" component={Landing} />
          <Route path={'/suppliers/:address/admin'} component={Workers}/>
          <Route path="/suppliers" component={Batches} />
          
        </Switch>
      </Router>
    )
  }
  
} 


export default App;
