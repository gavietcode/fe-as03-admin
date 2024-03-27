import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
  const dataProducts = useFetch(`http://localhost:5000/api/products/all`);

  console.log("dataProducts.data", dataProducts.data);
  console.log("path", path);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    const getIdProducts = dataProducts.map((item) => {
      return item._id;
    });

    const getSingleProduct = getIdProducts.filter(
      (hotelId) => hotelId !== undefined
    );

    try {
      path === "users" || path === "hotels"
        ? await axios.delete(`/${path}/${id}`)
        : await axios.delete(`/${path}/${id}/${getSingleProduct[0]}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            {path === "rooms" || path === "hotels" ? (
              <Link to={`/${path}/edit/${params.row._id}`} className="link">
                <button className="viewButton">Edit</button>
              </Link>
            ) : (
              ""
            )}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
