import React from 'react'
import {Container,Row,Button} from 'react-bootstrap'
import CreateDesign from './CreateDesign'

class AdminCatalogue extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show: false,
            address: ''
        }
    }

    componentDidMount = async() => {
        const {address} = this.props.match.params
        this.setState({address})
    }

    showModal = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }
    render(){
        return(
            <Container className="mt-3 pr-3 pl-3">
                <CreateDesign show={this.state.show} onHide={this.handleClose} address={this.state.address} />
                <Row className="justify-content-between pl-3 pr-3">
                    <h3>Designs</h3>
                    <Button variant="primary" onClick={this.showModal}>Add Design</Button>
                </Row>
                <hr/>
            </Container>
        )
    }
}

export default AdminCatalogue