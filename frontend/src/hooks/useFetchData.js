import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (endPoint, headers) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(endPoint, headers);
        setData(response);
      } catch (error) {
        alert('Failed to fetch data')
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetchData;
