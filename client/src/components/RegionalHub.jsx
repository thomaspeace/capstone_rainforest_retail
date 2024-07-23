import { Col, Container, Row } from "react-bootstrap"
import Map from './Map'

const RegionalHub = ({clusteredOrders}) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Map clusteredOrders = {clusteredOrders}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default RegionalHub;