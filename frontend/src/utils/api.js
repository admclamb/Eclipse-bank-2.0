import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function readCustomer(username) {
  return;
}

export async function createCustomer(data) {
  console.log(API_BASE_URL);
  return axios.post(`${API_BASE_URL}/customers`, { data });
}

export async function getCustomer(username) {}
