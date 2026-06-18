import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, ListGroup } from "react-bootstrap";
import { getAllCustomers } from "../services/CustomerService";
import { createAccount } from "../services/AccountService";

const AddAccountPage = () => {
  const [customers, setCustomers] = useState([]);

  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [account, setAccount] = useState({
    balance: "",
    type: "",
    interestRate: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Could not load customers.");
      });
  }, []);

  const handleAccountChange = (event) => {
    const { name, value } = event.target;

    setAccount({
      ...account,
      [name]: value
    });
  };

  const handleCustomerSearchChange = (event) => {
    setCustomerSearch(event.target.value);
    setSelectedCustomer(null);
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerSearch(`${customer.customerId} - ${customer.name}`);
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.customerId.toString().includes(customerSearch)
    );
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (selectedCustomer === null) {
      setErrorMessage("Please select a customer.");
      return;
    }

    let accountToCreate = {
      balance: account.balance,
      type: account.type
    };

    if (account.type === "SAVINGS") {
      accountToCreate = {
        ...accountToCreate,
        interestRate: account.interestRate
      };
    }

    createAccount(selectedCustomer.customerId, accountToCreate)
      .then((response) => {
        setSuccessMessage("Account added successfully!");

        setCustomerSearch("");
        setSelectedCustomer(null);

        setAccount({
          balance: "",
          type: "",
          interestRate: ""
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something went wrong. Account was not added.");
      });
  };

  return (
    <Card className="shadow p-4">
      <h1 className="mb-4">New Account</h1>

      {successMessage !== "" && (
        <Alert variant="success">{successMessage}</Alert>
      )}

      {errorMessage !== "" && (
        <Alert variant="danger">{errorMessage}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Search Customer</Form.Label>
          <Form.Control
            type="text"
            value={customerSearch}
            onChange={handleCustomerSearchChange}
            placeholder="Search by customer name or ID"
            required
          />

          {customerSearch !== "" && selectedCustomer === null && (
            <ListGroup className="mt-2">
              {filteredCustomers.slice(0, 5).map((customer) => (
                <ListGroup.Item
                  key={customer.customerId}
                  action
                  onClick={() => handleSelectCustomer(customer)}
                >
                  {customer.customerId} - {customer.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form.Group>

        {selectedCustomer !== null && (
          <Alert variant="info">
            Selected customer: {selectedCustomer.customerId} - {selectedCustomer.name}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Account Type</Form.Label>
          <Form.Select
            name="type"
            value={account.type}
            onChange={handleAccountChange}
            required
          >
            <option value="">Select account type</option>
            <option value="CHECKING">Checking</option>
            <option value="SAVINGS">Savings</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Balance</Form.Label>
          <Form.Control
            type="number"
            name="balance"
            value={account.balance}
            onChange={handleAccountChange}
            placeholder="Enter starting balance"
            required
          />
        </Form.Group>

        {account.type === "SAVINGS" && (
          <Form.Group className="mb-3">
            <Form.Label>Interest Rate</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="interestRate"
              value={account.interestRate}
              onChange={handleAccountChange}
              placeholder="Enter interest rate"
              required
            />
          </Form.Group>
        )}

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

export default AddAccountPage;