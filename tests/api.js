const fetch = require('isomorphic-fetch');

const API_URL = 'http://localhost:3001';

describe('Timestamp enpoint', () => {
  it('returns unix and natural from unix', async () => {
    const unix = 1450137600;
    const expectedResult = { "unix": 1450137600, "natural": "December 15, 2015" };
    const url = `${API_URL}/${unix}`;
    const data = await fetch(url)
      .then(response => response.json());
    expect(data).toEqual(expectedResult);
  });

  it('return unix and natural from natural', async () => {
    const natural = 'December%2015,%202015';
    const expectedResult = { "unix": 1450134000, "natural": "December 15, 2015" };
    const url = `${API_URL}/${natural}`;
    const data = await fetch(url)
      .then(response => response.json());
    expect(data).toEqual(expectedResult);
  });

  it('returns null when something strange passed', async () => {
    const somethingStrange = 'boo';
    const expectedResult = { "unix": null, "natural": null };
    const url = `${API_URL}/${somethingStrange}`;
    const data = await fetch(url)
      .then(response => response.json());
    expect(data).toEqual(expectedResult);
  });
  it('returns null when date is incorrect', async () => {
    const incorectDate = 'December%2045,%202003';
    const expectedResult = { "unix": null, "natural": null };
    const url = `${API_URL}/${incorectDate}`;
    const data = await fetch(url)
      .then(response => response.json());
    expect(data).toEqual(expectedResult);
  });
  it('returns null when timestamp is incorrect', async () => {
    const incorectTimestamp = '-23';
    const expectedResult = { "unix": null, "natural": null };
    const url = `${API_URL}/${incorectTimestamp}`;
    const data = await fetch(url)
      .then(response => response.json());
    expect(data).toEqual(expectedResult);
  });
});
