import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var Login = () => {
  var { state, dispatch } = useContext(UserContext);
  var navigate = useNavigate();
  var [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  var inputEvent = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  //login form validation

  //when user click on login button logic
  var PostData = async (e) => {
    try {
      e.preventDefault();
      var { email, password } = loginState;
      console.log(`${email}\n${password}`);

      const responce = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      var ress = await responce.json();
      console.log("responce of post login deatils", ress);
      console.log("asdfaklsjdfa", ress.status);

      if (ress.status === 500 || !ress) {
        console.log("asdfaklsjdfa", ress.status);
        toast.error("Your Login Not Done Yet..PLease Try Again Later");
      } else {
        dispatch({ type: "USER", payload: true });
        toast.success("Login Successfully");
      }
    } catch (err) {
      toast.error("Please Check your Login Details", {
        theme: "colored",
      });
      console.log("Error occured while post logindata into login page", err);
    }
  };

  return (
    <>
      <div id="register_container">
        <div className="login_semicontainer">
          <div className="login_image_container">
            <img
              className="login_image"
              src="./image/login.jpg"
              alt="login"
            ></img>
          </div>
          <div className="login_form">
            <h1>Sign In</h1>
            <form method="POST" className="register_form_input">
              <input
                name="email"
                value={loginState.email}
                type="email"
                onChange={inputEvent}
                placeholder="Your Email"
                required
              ></input>
              <input
                name="password"
                value={loginState.password}
                type="password"
                onChange={inputEvent}
                placeholder="Your Password"
                required
              ></input>
              <input
                type="submit"
                id="register_login_submit"
                onClick={PostData}
                value="LogIn"
              ></input>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
