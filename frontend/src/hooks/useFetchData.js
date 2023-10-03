import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (endPoint, initialHeader) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState(initialHeader)
  const [refetchIndex, setRefetchIndex] = useState(0)

  const refetch = () => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(endPoint, header);
        setData(response);
      } catch (error) {
        alert('Failed to fetch data')
      }
      setLoading(false);
    };
    fetchData();
  }, [header, refetchIndex]);

  return {
    data,
    loading,
    setHeader,
    header,
    refetch
  };
};

export default useFetchData;
