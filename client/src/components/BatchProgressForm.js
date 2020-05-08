import React from 'react'
import{Row,Col,Form,Button,Spinner} from 'react-bootstrap'
import Web3 from 'web3';
import Supplier from '../contracts/Supplier.json'
import ipfs from "../ipfs"

class BatchProgressForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            area: '',
            web3: null,
            accounts: null,
            contract: null,
            file: 'upload certificate',
            buffer: ''
        }
    }

    componentDidMount = async() => {
        try{
            console.log(this.props.batch.image)
            const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e");
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Supplier.networks[networkId];
            const instance = new web3.eth.Contract(
                Supplier.abi,
                deployedNetwork && this.props.address,
            );
            await this.setState({web3, accounts, contract: instance})
        }catch(error){
            alert(error)
        }
    }

    handleChange = (event) => {
        this.setState({area: event.target.value})
    }

    captureFile = (event) =>{
        console.log('file captured')
        const file = event.target.files[0]
        const fileName = file.name
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)})
            console.log(this.state.buffer)
        }
        this.setState({file: fileName})
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        console.log(this.props.batch.uid)
        this.setState({loading: true})
        try{
            switch(parseInt(this.props.batch.cur_step)){
                case 0:
                    await this.state.contract.methods.transfer_to_tanning(this.props.batch.uid, parseInt(this.state.area)).send({from: this.state.accounts[0]})
                    break;
                case 1:
                    await this.state.contract.methods.transfer_to_QC(this.props.batch.uid).send({from: this.state.accounts[0]})
                    break;
                case 2:
                    const result = await ipfs.files.add(this.state.buffer)
                    await this.state.contract.methods.quality_check(this.props.batch.uid, result[0].hash).send({from: this.state.accounts[0]})
                    break
                case 3:
                    await this.state.contract.methods.pack_batch(this.props.batch.uid).send({from: this.state.accounts[0]})
                    break

            }
            
        }catch(err){
            alert(err)
        }
        
        this.props.updateUI(this.props.batch.uid)
        this.setState({loading: false}) 
    }

    render(){
        {
            if(this.props.batch.cur_step == 0){
                return(
                    <Row className="justify-content-center mt-3">
                        <h6>Transfer To Tanning</h6>
                        <Col lg={12}>
                            <Form onSubmit={this.handleSubmit} >
                                <Form.Row>
                                    <Col lg={8}>
                                    <Form.Control type="number" placeholder="Enter Area in m sq." value={this.state.area} onChange={this.handleChange} />
                                    </Col>
                                    <Col lg={4}>
                                    {
                                        this.state.loading? 
                                        <Button variant="primary" type="submit" className="mb-3" block>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            ></Spinner>Loading</Button>: <Button variant="primary" type="submit" className="mb-3" block>Submit</Button>
                                    }
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                
                    </Row>
                )
            }else if(this.props.batch.cur_step == 1){
                return(
                    <Row className="justify-content-center mt-3">
                        <h6>Transfer To Quality Check</h6>
                        <Col lg={12}>
                            <Form onSubmit={this.handleSubmit} >
                                
                                    <Col>
                                    {
                                        this.state.loading? 
                                        <Button variant="primary" type="submit" className="mb-3" block>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            ></Spinner>Loading</Button>: <Button variant="primary" type="submit" className="mb-3" block>Submit</Button>
                                    }
                                    </Col>
                                
                            </Form>
                        </Col>
                
                    </Row>
                )
            }else if (this.props.batch.cur_step == 2){
                return(
                    <Row className="justify-content-center">
                        <h6>Transfer to packing</h6>
                        
                            <Col lg = {12}>
                                <Form onSubmit={this.handleSubmit} className="mt-3">
                                    <Form.Row>
                                    <Col lg={8}>
                                        <Form.Group controlId="img">
                                            <Form.File 
                                            required
                                            label={this.state.file}
                                            custom
                                            onChange={this.captureFile}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={4}>
                                    {
                                        this.state.loading? 
                                        <Button variant="primary" type="submit" className="mb-3" block>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            ></Spinner>Loading</Button>: <Button variant="primary" type="submit" className="mb-3" block>Submit</Button>
                                    }
                                    </Col>
                                    </Form.Row>
                                </Form>
                            </Col>
                    </Row>
                )
            }else if(this.props.batch.cur_step == 3){
                return(
                    <Row className="justify-content-center mt-3">
                        <h6>Complete Batch</h6>
                        <Col lg={12}>
                            <Form onSubmit={this.handleSubmit} >
                                
                                    <Col>
                                    {
                                        this.state.loading? 
                                        <Button variant="primary" type="submit" className="mb-3" block>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            ></Spinner>Loading</Button>: <Button variant="primary" type="submit" className="mb-3" block>Submit</Button>
                                    }
                                    </Col>
                                
                            </Form>
                        </Col>
                
                    </Row>
                )
            }
            else return null;
        }
    }
}

export default BatchProgressForm