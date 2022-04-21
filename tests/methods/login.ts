import axios from 'axios';
import { config } from '../../config';

export const loginByApi = async (username: string, password: string): Promise<string> => {
  const response = await axios.get(`${config.baseUrl}/loginaction`, {
    headers: {
      username,
      password
    }
  });

  return response.data;
}
