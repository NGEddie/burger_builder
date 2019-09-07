import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-778f4.firebaseio.com/'
});

export default instance;
