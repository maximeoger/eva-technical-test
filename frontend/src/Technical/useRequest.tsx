import { useState, useEffect } from 'react';

interface ApiOptions {
  baseUrl?: string,
  endpoint: string
}

const useRequest = ({ baseUrl='http://localhost:3000', endpoint }: ApiOptions) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const makeApiCall = async () => {
    try {
      const response : Response = await fetch(baseUrl + endpoint);
      const data = await response.json();
      setData(data);
    } catch(err) {
      setError(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    makeApiCall();
  }, [])

  return { error, data, loading }
}

export default useRequest;