import axios from 'axios';
import { config } from '../config';

describe('LoginAction', () => {
  test('headers with username and password should return valid token', async () => {
    const response = await axios.post(`${config.baseUrl}/loginaction`, {}, {
      headers: {
        username: 'bob',
        password: 'P@55w0rd',
      }
    });

    expect(response.data).toBe('G7T0K3N');
    expect(response.status).toBe(200);
  });

  test('empty headers should return unauthorized', async () => {
    const response = await axios.post(`${config.baseUrl}/loginaction`, {}, {
      headers: {}
    });

    expect(response.status).toBe(401);
  });

  test('ISSUE HERE ===> headers with username only shouldn\'t return valid token', async () => {
    const response = await axios.post(`${config.baseUrl}/loginaction`, {}, {
      headers: {
        username: 'bob',
      }
    });

    expect(response.status).toBe(401);
  });

  test('wrong headers should return unauthorized', async () => {
    const response = await axios.post(`${config.baseUrl}/loginaction`, {}, {
      headers: {
        username: "John",
        password: "I'mJohnTrustMe"
      }
    });

    expect(response.status).toBe(401);
  });
});
