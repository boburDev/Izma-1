import axios from 'axios';

const request = axios.create({
   baseURL: 'http://192.168.43.112:1000',
   headers: {
      'Content-Type': 'application/json'
   }
})

export default request;