import React from "react";
import "./transaction.css";

import useFetch from "../../hooks/useFetch";

const Transaction = () => {
  const { data } = useFetch(`/transactions`);

  return (
    <>
      <div className="tContainer">
        <div className="transactions">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.username}</td>
                  <td>{item.hotel}</td>
                  <td>{item.rooms.join("--")}</td>
                  <td>
                    {item.dateStart}--{item.dateEnd}
                  </td>
                  <td>{item.totalPrice}</td>
                  <td>{item.payment}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Transaction;
