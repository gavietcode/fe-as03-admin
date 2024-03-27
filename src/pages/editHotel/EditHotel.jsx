import "./editHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditHotel = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const hotelId = location.pathname.split("/")[3];
  const token = localStorage.getItem("accessToken");
  const { data, loading, error } = useFetch("/rooms");

  const dataHotels = useFetch(`/hotels/find/${hotelId}`);

  const singleHotel = dataHotels.data;

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault(singleHotel.photos);
    setFiles();
    const updatHotel = {
      name: e.target.name.value,
      type: e.target.type.value,
      city: e.target.city.value,
      address: e.target.address.value,
      distance: e.target.distance.value,
      title: e.target.title.value,
      desc: e.target.desc.value,
      cheapestPrice: e.target.cheapestPrice.value,
      featured: e.target.featured.value === "true" ? true : false,
      photos: singleHotel.photos,
      rooms: rooms,
    };
    try {
      await axios
        .put(`/hotels/${hotelId}`, updatHotel, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data;
        });
      navigate("/hotels");
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
          <h1>Edit Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                  disabled
                />
              </div>

              <div className="formInput">
                <label>Name</label>
                <input type="text" defaultValue={singleHotel.name} id="name" />
              </div>
              <div className="formInput">
                <label>Type</label>
                <input type="text" defaultValue={singleHotel.type} id="type" />
              </div>
              <div className="formInput">
                <label>City</label>
                <input type="text" defaultValue={singleHotel.city} id="city" />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  defaultValue={singleHotel.address}
                  id="address"
                />
              </div>
              <div className="formInput">
                <label>Distance from City Center</label>
                <input
                  type="text"
                  defaultValue={singleHotel.distance}
                  id="distance"
                />
              </div>
              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  defaultValue={singleHotel.title}
                  id="title"
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input type="text" defaultValue={singleHotel.desc} id="desc" />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  defaultValue={singleHotel.cheapestPrice}
                  id="cheapestPrice"
                />
              </div>

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" defaultValue={singleHotel.featured}>
                  <option value={!singleHotel.featured}>No</option>
                  <option value={singleHotel.featured}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option
                          key={room._id}
                          value={room._id}
                          defaultValue={singleHotel.rooms}
                        >
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
