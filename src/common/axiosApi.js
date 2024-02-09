// common.js
import axios from 'axios';

const BASE_URL = 'https://widget-cms.adstudio.cloud/api';

const instance = axios.create({
  baseURL: BASE_URL,
});

const makeApiCall = async (method, endpoint, data) => {
  try {
    console.log("kkk", method, endpoint, data);
    const apiUrl = `${BASE_URL}/${endpoint}`;
    const response = await instance[method](apiUrl, data);

    // Check if response status is 200 and return the entire response
    if (response.status === 200) {
      console.log("lll", response.data);
      return response;
    } else {
      // If the status is not 200, throw an error
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const get = (endpoint, params) => makeApiCall('get', endpoint, { params });

export const post = (endpoint, data) => makeApiCall('post', endpoint, data);
