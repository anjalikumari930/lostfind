import React, { useState } from "react";
import "../css/newSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Spinner } from "react-bootstrap";

function Login() {
  const [loading, setloading] = useState(false);
  const [info, setinfo] = useState("");
  const history = useNavigate();

  function login() {
    setloading(true);
    const payload = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    axios
      .post("http://localhost:5000/login", payload)
      .then((response) => {
        console.log("Response is:", response);
        if (response.data.user) {
          setinfo("");
          localStorage.setItem("token", response.data.jwt_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          //history.push({ pathname: "/feed", user: response.data.user });
          history("/feed", response.data.user);
        } else {
          setinfo(response.data);
        }
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
        console.log("Error occurred");
      });
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <form className="Box-1 login">
          <h1>Log in</h1>
          <p style={{ color: "white" }}>{info}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email id"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          />
          <button type="button" className="submit" onClick={login}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>Submit</>
            )}
          </button>
          <p style={{ color: "white" }}>
            Don't have an account?{" "}
            <a style={{ color: "black" }} href="/sign-up">
              Click here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
