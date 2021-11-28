const endpoint = process.env.REACT_APP_API_ENDPOINT;

export const getDonationsAPI = () => {
  const source = new EventSource(`${endpoint}/dashboard`);

  return source;
};
