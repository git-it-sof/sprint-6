import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/accounts";
const CUSTOMER_BASE_URL = "http://localhost:8080/api/v1/customers";

const getAllAccounts = () => {
  return axios.get(BASE_URL);
};

const getAccountsByCity = (city) => {
  return axios.get(`${BASE_URL}?city=${city}`);
};

const createAccount = (customerId, account) => {
  return axios.post(`${CUSTOMER_BASE_URL}/${customerId}/accounts`, account);
};

const deleteAccount = (customerId, accountId) => {
  return axios.delete(`${CUSTOMER_BASE_URL}/${customerId}/accounts/${accountId}`);
};

const updateBalance = (customerId, accountId, amount) => {
  return axios.put(
    `${CUSTOMER_BASE_URL}/${customerId}/accounts/${accountId}?amount=${amount}`
  );
};

export { getAllAccounts, getAccountsByCity, createAccount, deleteAccount, updateBalance };