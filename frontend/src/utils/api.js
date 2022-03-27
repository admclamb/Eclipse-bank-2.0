import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function readCustomer(data, signal) {
  const url = new URL(`${API_BASE_URL}/customers/login`);
  const response = await axios.post(url, data, headers);
  return response.data;
}

export async function createCustomer(data, signal) {
  const url = new URL(`${API_BASE_URL}/customers`);
  const response = await axios.post(url, data, headers);
  return response.data;
}

export async function createBankAccount(data, signal) {
  console.log(data);
  const url = new URL(`${API_BASE_URL}/bank_accounts`);
  const response = await axios.post(`${API_BASE_URL}/bank_accounts`, { data }, headers);
  return response;
}
