import React from 'react'
import {Container,Row,Button,Form,Col,Spinner} from 'react-bootstrap'
import CreateBatch from './CreateBatch';
import Batch from './Batch'
import Web3 from 'web3';
import Supplier from '../contracts/Supplier.json'

class BatchTab extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            show: false,
            address: '',
            batch_id: '',
            anyBatch: false,
            certificate: false,
            web3: null,
            accounts: null,
            contract: null,
            batch: null, 
            status: [],
            addr: [],
            completed_by: [],
            loading: false
        }
    }

    componentDidMount = async() => {
        const {address} = this.props.match.params
        this.setState({address})
        try{
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Supplier.networks[networkId];
            const instance = new web3.eth.Contract(
                Supplier.abi,
                deployedNetwork && this.state.address,
            );
            await this.setState({web3, accounts, contract: instance})
            
        }catch(error){
            alert(error)
        }
    }

    getWorkers = async(addr) => {
        var names = []
        for(var i=0;i<4;i++){
            const name = await this.state.contract.methods.workers(addr[i]).call()
            names.push(name.fname+" "+name.lname)
        }
        
        this.setState({completed_by: names})
        console.log(this.state.completed_by)
    }

    getBatch = async(batch_id) => {
        this.setState({anyBatch: false, loading: true})
        const batch = await this.state.contract.methods.batches(batch_id).call()
        const status = await this.state.contract.methods.get_status_for_batch(batch_id).call()
        const addr = await this.state.contract.methods.get_completed_by(batch_id).call()
        console.log(addr)
        this.getWorkers(addr)
        this.setState({addr, status})
        var obj = {
            uid: batch.uid,
            image: batch.image,
            design_name: batch.design_name,
            price: batch.price,
            amount: batch.amount,
            area: batch.area, 
            cur_step: batch.cur_step
        }
        if(batch.image == '') {
            this.setState({certificate: false})
        }else {
            this.setState({certificate: true})
        }
        this.setState({anyBatch: true, batch: obj, loading: false, anyBatch: true})
        
    }

    handleSubmit = async(event) => {

        event.preventDefault()
        this.setState({loading: true, anyBatch: false})
        this.getBatch(this.state.batch_id)
    }

    showModal = () => {
        this.setState({show: true})
    }

    onHide = () => {
        this.setState({show: false})
    }

    handleChange = (event) => {
        this.setState({batch_id: event.target.value})
    }

    render(){

        return(
            <Container className="mt-3 pr-3 pl-3">
                <CreateBatch show = {this.state.show} contract={this.state.address} onHide={this.onHide} getBatch={this.getBatch}/>
            <Row className="justify-content-between pl-3 pr-3">
                <Col lg={10}>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Row>
                        <Col lg={5}>
                        <Form.Control placeholder="Enter Batch ID" value={this.state.batch_id} onChange={this.handleChange} />
                        </Col>
                        <Col lg={1}>
                        <Button variant="outline-primary" type="submit">Search</Button>
                        </Col>
                    </Form.Row>
                </Form>
                </Col>
                <Col lg={2}>
                <Button variant="primary" type="submit" onClick={this.showModal}>Create Batch</Button>
                </Col>
            </Row>
            <hr/>
            <Row className="justify-content-center">
                {this.state.loading? <Spinner animation="grow" variant="primary" />: null}
                {this.state.anyBatch?<Batch certificate={this.state.certificate} updateUI = {this.getBatch} address = {this.state.address} batch={this.state.batch} status={this.state.status} completed_by={this.state.completed_by} />:''}
            </Row>

            
        </Container>
            
        )
    }
}

export default BatchTab