import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  // const [info, setInfo] = useState({});
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [short_desc, setShortdesc] = useState("");
  const [long_desc, setLongdesc] = useState("");
  const [img1, setImg1] = useState("");

  // const handleChange = (e) => {
  //   setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dnlbxxyzs/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const response = await axios.post("http://localhost:5000/api/products", {
        name: name,
        category: category,
        short_desc: short_desc,
        long_desc: long_desc,
        img1: "",
      });
      console.log(response.data); // In ra thông tin sản phẩm đã được tạo mới
      // Có thể thực hiện các hành động khác ở đây sau khi tạo mới thành công
    } catch (error) {
      console.log(error.response.data.message); // Hiển thị lỗi từ phản hồi của API
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const list = await Promise.all(
  //       Object.values(files).map(async (file) => {
  //         const data = new FormData();
  //         data.append("file", file);
  //         data.append("upload_preset", "upload");
  //         const uploadRes = await axios.post(
  //           "https://api.cloudinary.com/v1_1/dnlbxxyzs/image/upload",
  //           data
  //         );

  //         const { url } = uploadRes.data;
  //         return url;
  //       })
  //     );

  //     const newProduct = {
  //       ...info,
  //       img1: list,
  //     };

  //     const myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     const raw = JSON.stringify({
  //       name: e.target.name?.value,
  //       category: e.target.category?.value,
  //       short_desc: e.target.hort_desc?.value,
  //       long_desc: e.target.long_desc?.value,
  //     });

  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     await axios
  //       .post("http://localhost:5000/api/products", newProduct)
  //       .then((response) => response.json())
  //       .then((result) => result)
  //       .catch((error) => console.error(error));
  //     navigate("/products");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
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
            <form onSubmit={handleSubmit}>
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
                />
              </div>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="formInput">
                <label>Category</label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter Category"
                />
              </div>
              <div className="formInput">
                <label>Short Description</label>
                <input
                  type="text"
                  id="short_desc"
                  value={short_desc}
                  onChange={(e) => setShortdesc(e.target.value)}
                  placeholder="Enter Short Description"
                />
              </div>
              <div className="formInput">
                <label>Long Description</label>
                <input
                  type="text"
                  id="long_desc"
                  value={long_desc}
                  onChange={(e) => setLongdesc(e.target.value)}
                  placeholder="Enter Long Description"
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
