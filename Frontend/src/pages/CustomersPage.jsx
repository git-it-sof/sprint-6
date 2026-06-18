import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { getAllCustomers, deleteCustomer } from "../services/CustomerService";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    streetNumber: "",
    city: "",
    province: "",
    postalCode: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    getAllCustomers()
      .then((response) => {
        console.log("CUSTOMERS FROM BACKEND:", response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log("ERROR LOADING CUSTOMERS:", error);
      });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters({
      ...filters,
      [name]: value
    });
  };

const handleDeleteCustomer = (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this customer?"
  );

  if (confirmed) {
    deleteCustomer(id)
      .then(() => {
        loadCustomers();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      customer.address.streetNumber.toString().includes(filters.streetNumber) &&
      customer.address.city.toLowerCase().includes(filters.city.toLowerCase()) &&
      customer.address.province.toLowerCase().includes(filters.province.toLowerCase()) &&
      customer.address.postalCode.toLowerCase().includes(filters.postalCode.toLowerCase())
    );
  });

  const top50Customers = filteredCustomers.slice().reverse().slice(0, 50);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Customers</h1>

        <Button variant="primary" onClick={() => navigate("/customers/new")}>
          New Customer
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Customer ID</th>

            <th>
              Name
              <Form.Control
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Filter name"
                className="mt-2"
              />
            </th>

            <th>
              Street Number
              <Form.Control
                type="text"
                name="streetNumber"
                value={filters.streetNumber}
                onChange={handleFilterChange}
                placeholder="Filter street"
                className="mt-2"
              />
            </th>

            <th>
              City
              <Form.Control
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Filter city"
                className="mt-2"
              />
            </th>

            <th>
              Province
              <Form.Control
                type="text"
                name="province"
                value={filters.province}
                onChange={handleFilterChange}
                placeholder="Filter province"
                className="mt-2"
              />
            </th>

            <th>
              Postal Code
              <Form.Control
                type="text"
                name="postalCode"
                value={filters.postalCode}
                onChange={handleFilterChange}
                placeholder="Filter postal"
                className="mt-2"
              />
            </th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {top50Customers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.customerId}</td>
              <td>{customer.name}</td>
              <td>{customer.address.streetNumber}</td>
              <td>{customer.address.city}</td>
              <td>{customer.address.province}</td>
              <td>{customer.address.postalCode}</td>

              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2 mb-1"
                  onClick={() => navigate(`/customers/${customer.customerId}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant="info"
                  size="sm"
                  className="me-2 mb-1"
                  onClick={() => navigate(`/customers/${customer.customerId}/accounts`)}
                >
                  See Accounts
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="mb-1"
                  onClick={() => handleDeleteCustomer(customer.customerId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomersPage;