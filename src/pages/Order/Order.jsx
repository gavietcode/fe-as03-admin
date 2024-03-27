import React, { useEffect, useState } from "react";
import "./Order.css";
import { useParams } from "react-router-dom";

const token = localStorage.getItem("token");

const Order = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token ? token : ""}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          ` http://localhost:5000/api/orders/getorderbyid/${id}`,
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

  return (
    <>
      <div className="orders">
        <div className="info">
          <h1>INFORMATION ORDER</h1>
          <div>ID USER: {data.user?._id}</div>
          <div>FULL NAME: {data.user?.fullname}</div>
          <div>PHONE: {data.user?.phone}</div>
          <div>ADDRESS: {data.user?.address}</div>
          <div>TOTAL: {data.totalPrice}</div>
        </div>
        <div>
          <table style={{ width: "80%" }}>
            <thead>
              <tr>
                <th>ID PRODUCT</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {data.products?.map((items) => (
                <tr key={items.id}>
                  <td>{items.id}</td>
                  <td>
                    <img src={items.img1} alt="img" />
                  </td>
                  <td>{items.name}</td>
                  <td>{items.price}</td>
                  <td>{items.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Order;
