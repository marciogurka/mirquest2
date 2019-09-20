// client.js
import axios from 'axios';

var client = axios.create({
    baseURL: 'http://54.85.174.85:8000',
    // baseURL: 'http://localhost:8000'
  });

export default client;
