import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { createCustomer } from "../services/CustomerService";

const AddCustomerPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    streetNumber: "",
    postalCode: "",
    type: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomer({
      ...customer,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    createCustomer(customer)
      .then((response) => {
        setSuccessMessage("Customer added successfully!");

        setCustomer({
          name: "",
          streetNumber: "",
          postalCode: "",
          type: ""
        });
      })
      .catch((error) => {
        console.log(error);

        if (error.response && error.response.status === 400) {
          setErrorMessage("Invalid postal code. Please enter a valid postal code in the form A1B2C3.");
        } else {
          setErrorMessage("Something went wrong. Customer was not added.");
        }
      });
  };

  return (
    <Card className="shadow p-4">
      <h1 className="mb-4">New Customer</h1>

      {successMessage !== "" && (
        <Alert variant="success">
          {successMessage}
        </Alert>
      )}

      {errorMessage !== "" && (
        <Alert variant="danger">
          {errorMessage}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Customer Type</Form.Label>
          <Form.Select
            name="type"
            value={customer.type}
            onChange={handleChange}
            required
          >
            <option value="">Select customer type</option>
            <option value="PERSON">Person</option>
            <option value="COMPANY">Company</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Street Number</Form.Label>
          <Form.Control
            type="text"
            name="streetNumber"
            value={customer.streetNumber}
            onChange={handleChange}
            placeholder="Enter street number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={customer.postalCode}
            onChange={handleChange}
            placeholder="Enter postal code"
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Submit
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/customers")}
          >
            Back to Customers
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default AddCustomerPage;