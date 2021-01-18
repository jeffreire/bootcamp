import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

/**
 * IOS com Emulador: localhost
 * IOS com físico: Ip da Máquina
 * 
 * Android com emulador: localhost      --add reverse tcp: ip plicacao tcp: 3000 
 * Android emulador: 10.0.2.2 (android Studio)
 * Android com Emulador: 10.3.0.2(Genymotion) 
 */
