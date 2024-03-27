import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./login.scss";
import useFetch from "../../hooks/useFetch";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { data } = useFetch("http://localhost:5000/api/users");
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    ///

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      ...credentials,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    ///
    dispatch({ type: "LOGIN_START" });
    try {
      fetch("http://localhost:5000/api/auth/admin/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const { userId, token, role } = result;
          JSON.stringify(localStorage.setItem("token", token));
          const findUser = data.filter((item) => {
            if (item._id === userId) {
              return item;
            }
          });
          console.log(findUser[0]);
          if (role === "admin" || role === "consultant") {
            dispatch({ type: "LOGIN_SUCCESS", payload: findUser[0] });
            alert("You are loggined!.");
            navigate("/");
          } else {
            dispatch({
              type: "LOGIN_FAILURE",
              payload: { message: "You are not allowed!" },
            });
            alert("You are not allowed!");
            navigate("/login");
          }
        });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
