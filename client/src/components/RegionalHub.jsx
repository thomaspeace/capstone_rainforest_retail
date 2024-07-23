import { Col, Container, Row } from "react-bootstrap"
import Map from './Map'

const RegionalHub = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Map />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default RegionalHub;