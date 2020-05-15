import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-a70ef.firebaseio.com/',
});

export default instance;