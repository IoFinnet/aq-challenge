import axios from 'axios';
import { config } from '../config';
import { loginByApi } from './methods/login';

describe('SumAction', () => {
  let token: string;

  // Could be replaced with beforeAll in that case.
  // I prefer to use beforeEach and clean session after each test to have completely fresh runs.
  beforeEach(async () => {
    token = await loginByApi('bob', 'P@55w0rd');
  });

  afterEach(() => {
    token = '';
  })

  const testCases: [any, any, any][] = [
    [1, 2, 3],
    [0, 0, 0],
    [-1, 1, 0],
    [-1, -1, -2],
    ['', '', 'err'],
    [Number.MAX_VALUE, 1, Number.MAX_VALUE],
    [Number.MIN_VALUE, -1, Number.MIN_VALUE]
  ];

  test.each(testCases)('should sum: %s and %s to %s', async (a, b, expected) => {
    const response = await axios.post(`${config.baseUrl}/sumaction`, {
      first: a,
      second: b
    }, {
      headers: {
        token
      },
    });

    expect(response.data).toBe(expected);
  });
});
