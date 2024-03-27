import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import TransactionLatest from "../transactionlatest/TransactionLatest";
import Chat from "../chat/Chat";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const Home = () => {
  console.log(user.role);
  return (
    <>
      {user?.role === "admin" ? (
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
            <div className="widgets">
              <Widget type="user" />
              <Widget type="order" />
              <Widget type="earning" />
              <Widget type="balance" />
            </div>

            <div className="listContainer">
              <TransactionLatest />
              <div className="listTitle">
                <Chat />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="listContainer">
          <div className="listTitle">
            <Chat />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
