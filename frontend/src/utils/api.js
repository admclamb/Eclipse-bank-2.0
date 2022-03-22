import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);
    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

export async function readCustomer(data, signal) {
  const url = new URL(`${API_BASE_URL}/customers/login`);
  const response = await axios.post(url, data, headers);
  return response.data;
}

export async function createCustomer(data, signal) {
  const url = new URL(`${API_BASE_URL}/customers`);
  const method = "POST";
  return await fetchJson(url, { headers, body: JSON.stringify({ data }), signal, method });
}

// import axios from "axios";
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// const CONFIG = {
//   headers: {
//     "Content-Type": "application/json"
//   }
// };
// /**
//  * Defines the default headers for these functions to work with `json-server`
//  */
// const headers = new Headers();
// headers.append("Content-Type", "application/json");

// export async function readCustomer(data) {
//   try {
//     console.log(data);
//     const response = await axios.get(`${API_BASE_URL}/customers/login`, data, CONFIG);
//     if (response.status === 204) {
//       return null;
//     }
//     const payload = await response.json();
//     return response;
//   } catch (error) {
//     console.error(error);
//     return Promise.resolve([]);
//   }
// }

// export async function createCustomer(data) {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/customers`, data, CONFIG);
//     if (response.status === 204) {
//       return null;
//     }

//     const payload = await response.json();
//     return payload;
//   } catch (error) {
//     if (error.name !== "AbortError") {
//       throw error.response.data;
//     }
//   }
// }

// export async function getCustomer(username) {}
