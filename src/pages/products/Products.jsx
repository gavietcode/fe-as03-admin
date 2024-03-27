import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const productId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  console.log("productId", productId);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/all",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => result)
          .catch((error) => console.error(error));
        setData(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  function SearchForm({ data }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle search term change
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
        <>
          {searchResults.map((result, index) => (
            <ul key={index} style={{ backgroundColor: "gray", color: "white" }}>
              <li>{result.name}</li>{" "}
            </ul>
          ))}
        </>
      </div>
    );
  }

  const handleDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error(error));
    window.location.reload();
    navigate("/products");
  };

  return (
    <>
      <div>
        <h1>Search Products</h1>
        <SearchForm data={data} />
        <br />
        <br />
        <hr />
      </div>
      <Link to={`/products/new`}>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add New
        </button>
      </Link>
      <div className="orders">
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>IMAGE</th>
              <th>CATEGORY</th>
              <th>EDIT</th>
              <th>STAUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <img src={item.img1} alt={item.name} />
                </td>
                <td>{item.category}</td>
                <td>
                  <Link to={`/products/edit/${item._id}`}>
                    <button
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Update
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ backgroundColor: "pink", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
