// Pasta responsavem em armazenar qualquer arquivo que fará comuniçãoo com algum serviço 
//externa
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;