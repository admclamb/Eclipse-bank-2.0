import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const CONFIG = {
  headers: {
    "Content-Type": "application/json"
  }
};
/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function readCustomer(data) {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`, data, CONFIG);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createCustomer(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers`, data, CONFIG);
    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();
    return payload;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
  }
}

export async function getCustomer(username) {}
