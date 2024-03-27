import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export const DataRooms = () => {
  const location = useLocation();
  const roomID = location.pathname.split("/")[3];
  const { data } = useFetch(`/rooms/${roomID}`);
  return data;
};
