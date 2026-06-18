import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { getCustomerById, updateCustomer } from "../services/CustomerService";

const EditCustomerPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    streetNumber: "",
    postalCode: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { customerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCustomerById(customerId)
      .then((response) => {
        setCustomer({
          name: response.data.name,
          streetNumber: response.data.address.streetNumber,
          postalCode: response.data.address.postalCode
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Could not load customer details.");
      });
  }, [customerId]);

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

    updateCustomer(customerId, customer)
      .then((response) => {
        setSuccessMessage("Customer updated successfully!");
      })
      .catch((error) => {
        console.log(error);

        if (error.response && error.response.status === 400) {
          setErrorMessage("Invalid postal code. Please enter a valid postal code.");
        } else {
          setErrorMessage("Something went wrong. Customer was not updated.");
        }
      });
  };

  return (
    <Card className="shadow p-4">
      <h1 className="mb-4">Edit Customer</h1>

      {successMessage !== "" && (
        <Alert variant="success">{successMessage}</Alert>
      )}

      {errorMessage !== "" && (
        <Alert variant="danger">{errorMessage}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
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
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>

          <Button variant="secondary" onClick={() => navigate("/customers")}>
            Back to Customers
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EditCustomerPage;