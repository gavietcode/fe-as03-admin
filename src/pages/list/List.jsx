import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Datatable from "../../components/datatable/Datatable"
import Products from "../products/Products";

const List = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Products columns={columns} />
      </div>
    </div>
  );
};

export default List;
