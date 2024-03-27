import React, { useEffect, useState } from "react";
import "./transaction.css";

import { Link } from "react-router-dom";

const token = localStorage.getItem("token");

const TransactionLatest = () => {
  const [data, setData] = useState([]);
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
          "http://localhost:5000/api/orders/getallorder",
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
      <h2>History</h2>
      <div className="orders">
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>ID ORDER</th>
              <th>ID USER</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ADDRES</th>
              <th>TOTAL</th>
              <th>DELIVERY</th>
              <th>STAUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.user._id}</td>
                <td>{item.user.fullname}</td>
                <td>{item.user.phone}</td>
                <td>{item.user.address}</td>
                <td>{item.totalPrice}</td>
                <td>Waiting for delivery...</td>
                <td>{item.status}</td>
                <td>
                  <Link to={`/getorderbyid/${item._id}`}>
                    <button style={{ cursor: "pointer" }}>View &rarr;</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionLatest;
