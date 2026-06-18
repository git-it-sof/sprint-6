import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Card className="text-center shadow p-4">
        <Card.Body>
          <h1>Welcome Teller!</h1>
          <p className="fs-5">What would you like to do today?</p>

          <Row className="mt-4 g-3">
            <Col md={3}>
              <Button className="w-100" onClick={() => navigate("/customers/new")}>
                New Customer
              </Button>
            </Col>

            <Col md={3}>
              <Button className="w-100" onClick={() => navigate("/accounts/new")}>
                New Account
              </Button>
            </Col>

            <Col md={3}>
              <Button className="w-100" onClick={() => navigate("/customers")}>
                Edit Customer Info
              </Button>
            </Col>

            <Col md={3}>
              <Button className="w-100" onClick={() => navigate("/deposit-withdraw")}>
                Deposit/Withdraw
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WelcomePage;