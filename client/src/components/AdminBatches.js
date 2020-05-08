import React from 'react'
import {Container, Button, Row, Col} from 'react-bootstrap'

class AdminBatches extends React.Component{

    showModal = () => {

    }

    render(){
        return(
            <Container className="mt-3 pr-3 pl-3">
            
            <Row className="justify-content-between pl-3 pr-3">
                <h3>Batches</h3>
                <Button variant="primary" onClick={this.showModal}>Create Batch</Button>
            </Row>
            <hr/>
            <Row className="justify-content-center">
                
            </Row>
        </Container>
        )
    }
}

export default AdminBatches