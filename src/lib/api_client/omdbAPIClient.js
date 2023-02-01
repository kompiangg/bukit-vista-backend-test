import axios from 'axios';

export default function initOMDBAPIClient(accessKey) {
  const omdbClient = axios.create({
    baseURL: 'http://www.omdbapi.com',
    params: {
      apikey: accessKey,
    },
  });

  return omdbClient;
}
