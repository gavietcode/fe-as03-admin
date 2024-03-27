import "./editProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const productId = location.pathname.split("/")[3];
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [short_desc, setShortdesc] = useState("");
  const [long_desc, setLongdesc] = useState("");
  const [img1, setImg1] = useState("");

  const dataProduct = useFetch(
    `http://localhost:5000/api/products/detail/${productId}`
  );

  const singleProduct = dataProduct.data;

  console.log("singleProduct", singleProduct);

  useEffect(() => {
    // Fetch thông tin sản phẩm hiện tại và cập nhật state
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/detail/${productId}`
        );
        console.log("response", response);
        const { name, category, short_desc, long_desc, img1 } = response.data;
        setName(name);
        setCategory(category);
        setShortdesc(short_desc);
        setLongdesc(long_desc);
        setImg1(img1 ? img1 : null);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, {
        name: name,
        category: category,
        short_desc: short_desc,
        long_desc: long_desc,
        img1: img1,
      });
      // Hiển thị thông báo cập nhật thành công hoặc thực hiện các hành động khác
      console.log("You are updated!.");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product </h1>
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
                  disabled
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
                  defaultValue={singleProduct.name}
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
                  defaultValue={singleProduct.category}
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
                  defaultValue={singleProduct.short_desc}
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
                  defaultValue={singleProduct.long_desc}
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

export default EditProduct;
