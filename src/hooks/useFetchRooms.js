import { useEffect, useState } from "react";
import axios from "axios";

const useFetchRooms = (url) => {
  const [dataRooms, setDataRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setDataRooms(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setDataRooms(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { dataRooms, loading, error, reFetch };
};

export default useFetchRooms;
