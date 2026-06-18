import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/customers";

const getAllCustomers = () => {
  return axios.get(BASE_URL);
};


const getCustomerById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

const createCustomer = (customer) => {
  return axios.post(BASE_URL, customer);
};

const updateCustomer = (id, customer) => {
  return axios.put(`${BASE_URL}/${id}`, customer);
};

const deleteCustomer = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export { getAllCustomers, getCustomerById, deleteCustomer, createCustomer, updateCustomer };