import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { updateBalance } from "../services/AccountService";

const UpdateBalancePage = () => {
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { customerId, accountId, action } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    let amountToSend = Number(amount);

    if (action === "withdraw") {
      amountToSend = amountToSend * -1;
    }

    updateBalance(customerId, accountId, amountToSend)
      .then(() => {
        if (action === "deposit") {
          setSuccessMessage("Deposit completed successfully!");
        } else {
          setSuccessMessage("Withdraw completed successfully!");
        }

        setAmount("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something went wrong. Balance was not updated.");
      });
  };

  return (
    <Card className="shadow p-4">
      <h1 className="mb-4">
        {action === "deposit" ? "Deposit" : "Withdraw"}
      </h1>

      {successMessage !== "" && (
        <Alert variant="success">{successMessage}</Alert>
      )}

      {errorMessage !== "" && (
        <Alert variant="danger">{errorMessage}</Alert>
      )}

      <p>
        Customer ID: {customerId}
        <br />
        Account ID: {accountId}
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Submit
          </Button>

          <Button variant="secondary" onClick={() => navigate("/accounts")}>
            Back to Accounts
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateBalancePage;