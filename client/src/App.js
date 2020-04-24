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
import "./App.css"
class App extends Component {

  render() {
    return(
      <Workers />
    )
    
  }
}

export default App;
