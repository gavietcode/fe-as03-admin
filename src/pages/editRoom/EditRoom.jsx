import "./editRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchRooms from "../../hooks/useFetchRooms";

const EditRoom = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [roomId, setroomId] = useState(undefined);

  const location = useLocation();
  const roomID = location.pathname.split("/")[3];
  const { dataRooms } = useFetchRooms(`/rooms/${roomID}`);
  const { data, loading, error } = useFetch("/hotels");

  const getIdHotel = data.filter((item) => {
    if (item.rooms.find((idRoom) => idRoom === roomID))
      return item.name !== undefined;
  });

  // const dataRoomNumbers = roomNumbers.map((number) => number.number).join(",");
  const nameOfHotel = getIdHotel.map((item) => item.name).join(",");

  // const handleChange = (e) => {
  //   setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  const handleClick = async (e) => {
    e.preventDefault();

    const updateRoom = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      price: e.target.price.value,
      maxPeople: e.target.maxPeople.value,
      roomNumbers: e.target.rooms.value
        .split(",")
        .map((room) => ({ number: room })),
    };
    try {
      await axios.put(`/rooms/${roomID}`, updateRoom);
      navigate("/rooms");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label>Title</label>
                <input type="text" defaultValue={dataRooms.title} id="title" />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input type="text" defaultValue={dataRooms.desc} id="desc" />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input defaultValue={dataRooms.price} id="price" />
              </div>
              <div className="formInput">
                <label>Max People</label>
                <input defaultValue={dataRooms.maxPeople} id="maxPeople" />
              </div>
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  id="rooms"
                  placeholder="give comma between room numbers."
                  defaultValue={dataRooms?.roomNumbers
                    ?.map((item) => item.number)
                    .join(",")}
                />
              </div>
              <div className="formInput">
                <label>The Hotel</label>
                <input
                  type="text"
                  id="existedHotel"
                  disabled
                  defaultValue={nameOfHotel}
                />
                {/* <select
                  id="hotelId"
                  onChange={(e) => setroomId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select> */}
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
