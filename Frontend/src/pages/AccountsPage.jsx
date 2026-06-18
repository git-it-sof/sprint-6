import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { getAllAccounts, deleteAccount } from "../services/AccountService";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);

  const [filters, setFilters] = useState({
    customerName: "",
    balanceGreaterThan: "",
    balanceLessThan: "",
    accountType: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    getAllAccounts()
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters({
      ...filters,
      [name]: value
    });
  };

const handleDeleteAccount = (customerId, accountId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this account?"
  );

  if (confirmed) {
    deleteAccount(customerId, accountId)
      .then(() => {
        loadAccounts();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const filteredAccounts = accounts.filter((account) => {
  const customerNameMatches = account.customerName
    .toLowerCase()
    .includes(filters.customerName.toLowerCase());

  const accountTypeMatches = account.accountType
    .toLowerCase()
    .includes(filters.accountType.toLowerCase());

  let balanceGreaterThanMatches = true;
  let balanceLessThanMatches = true;

  if (filters.balanceGreaterThan !== "") {
    balanceGreaterThanMatches =
      account.balance >= Number(filters.balanceGreaterThan);
  }

  if (filters.balanceLessThan !== "") {
    balanceLessThanMatches =
      account.balance <= Number(filters.balanceLessThan);
  }

  return (
    customerNameMatches &&
    accountTypeMatches &&
    balanceGreaterThanMatches &&
    balanceLessThanMatches
  );
});

  const top50Accounts = filteredAccounts.slice(0, 50);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Accounts</h1>

        <Button variant="primary" onClick={() => navigate("/accounts/new")}>
          New Account
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Account ID</th>

            <th>
              Customer Name
              <Form.Control
                type="text"
                name="customerName"
                value={filters.customerName}
                onChange={handleFilterChange}
                placeholder="Filter name"
                className="mt-2"
              />
            </th>

            <th>
              Balance
              <Form.Control
                type="number"
                name="balanceGreaterThan"
                value={filters.balanceGreaterThan}
                onChange={handleFilterChange}
                placeholder="Greater than"
                className="mt-2"
              />

              <Form.Control
                type="number"
                name="balanceLessThan"
                value={filters.balanceLessThan}
                onChange={handleFilterChange}
                placeholder="Less than"
                className="mt-2"
              />
            </th>

            <th>
              Account Type
              <Form.Select
                name="accountType"
                value={filters.accountType}
                onChange={handleFilterChange}
                className="mt-2"
              >
                <option value="">All</option>
                <option value="SAVINGS">Savings</option>
                <option value="CHECKING">Checking</option>
              </Form.Select>
            </th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {top50Accounts.map((account) => (
            <tr key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.customerName}</td>
              <td>${account.balance}</td>
              <td>{account.accountType}</td>

              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2 mb-1"
                  onClick={() => navigate(`/customers/${account.customerId}/accounts/${account.accountId}/deposit`)}
                >
                  Deposit
                </Button>

                <Button
                  variant="warning"
                  size="sm"
                  className="me-2 mb-1"
                  onClick={() => navigate(`/customers/${account.customerId}/accounts/${account.accountId}/withdraw`)}
                >
                  Withdraw
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="mb-1"
                  onClick={() => handleDeleteAccount(account.customerId, account.accountId)}
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

export default AccountsPage;