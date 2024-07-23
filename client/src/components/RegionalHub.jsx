import { Col, Container, Row } from "react-bootstrap"
import Map from './Map'

const RegionalHub = ({handleGetCluster, clusteredOrders}) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Map handleGetCluster = {handleGetCluster}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default RegionalHub;