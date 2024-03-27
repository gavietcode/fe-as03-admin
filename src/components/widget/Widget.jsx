import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";

const Widget = ({ type }) => {
  let dataCase;

  const dataCountUsers = useFetch(`http://localhost:5000/api/users/countUsers`);
  const dataCountTRans = useFetch(
    `http://localhost:5000/api/orders/countOrders`
  );
  const dataEarning = useFetch(`http://localhost:5000/api/orders/earning`);
  const dataBalance = useFetch(`http://localhost:5000/api/orders/balance`);

  //temporary
  // const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      dataCase = {
        title: "USERS",
        isMoney: false,
        amount: dataCountUsers.data,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      dataCase = {
        title: "ORDERS",
        isMoney: false,
        amount: dataCountTRans.data,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      dataCase = {
        title: "EARNINGS",
        isMoney: true,
        amount: Math.ceil(dataEarning.data),
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      dataCase = {
        title: "BALANCE",
        isMoney: true,
        amount: Math.ceil(dataBalance.data),
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dataCase.title}</span>
        <span className="counter">
          {dataCase.isMoney && "$"} {dataCase.amount}
        </span>
        <span className="link">{dataCase.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive"></div>
        {dataCase.icon}
      </div>
    </div>
  );
};

export default Widget;
