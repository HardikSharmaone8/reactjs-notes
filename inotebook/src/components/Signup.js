import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Spinner from "./Spinner";

var Signup = () => {
  var navigate = useNavigate();
  var { state, dispatch } = useContext(UserContext);
  var [process, setProcess] = useState(false);
  var [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    mobile: "",
    profession: "",
    password: "",
    confirmpassword: "",
  });

  var [validationErr, setValidationErr] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });

  var [submitStatus, setSubmitStatus] = useState(false);
  var inputEvent = (e) => {
    var value = e.target.value;
    var name = e.target.name;

    setRegisterState({
      ...registerState,
      [name]: value,
    });
  };

  //when use click on register button logic
  var submitRegister = async (e) => {
    try {
      e.preventDefault();
      setValidationErr(validation());

      var { name, email, mobile, profession, password, confirmpassword } =
        registerState;

      console.log("submit ", submitStatus);

      //if validation is ok at the time of  registration then we post data into database
      if (submitStatus) {
        setProcess(true);
        var ress = await fetch("/checkemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerState.email,
          }),
        });

        var email_responce = await ress.json();
        console.log("Email", email_responce);

        var resss = await fetch("/checkmobile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: registerState.mobile,
          }),
        });

        var mobile_responce = await resss.json();
        // console.log("Mobile", mobile_responce);

        //when email or mobile present in database then user will not register his data into database
        if (mobile_responce || email_responce) {
          alert("Email or Phone Number Already Present in our database");
        } else {
          var getRegisterData = await fetch("/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              mobile,
              profession,
              password,
              confirmpassword,
            }),
          });

          var res = await getRegisterData.json();
          console.log("after fetching", res);

          setProcess(false);

          if (!res) {
            alert(
              "Your Registration Not Done Yet.......PLease Try Again Later"
            );
            navigate("/signup");
          } else {
            dispatch({ type: "USER", payload: true });
            alert("Registration Done Succesfully");
            navigate("/");
          }
        }
      }
    } catch (err) {
      alert("Your Registration Not Done Yet..PLease Try Again Later");
      navigate("/signup");
      console.log("Error Occured while post the data to register page", err);
    }
  };

  //signup form validation

  var validation = () => {
    var errors = {};

    if (registerState.name.length <= 1) {
      errors.name = "Name Must be greater than 2 charactors";
    } else if (!registerState.name.match(/^[a-zA-Z" "]+$/)) {
      errors.name = "Please Enter Charactors Only in Name Field";
      console.log("hello");
    } else {
      errors.name = true;
    }

    if (registerState.email.search("@") === -1) {
      errors.email = "Please Check Your Email Id";
    } else {
      errors.email = true;
    }

    if (registerState.mobile.length !== 10) {
      errors.mobile = "Mobile Must be 10 Digits";
    } else {
      errors.mobile = true;
    }

    if (registerState.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (registerState.password.match(/^[a-zA-z" "0-9]+$/) != null) {
      errors.password =
        "Password must contain special Charactors like !,@,#,$,%,^,&,* ";
    } else {
      errors.password = true;
    }

    if (registerState.confirmpassword !== registerState.password) {
      errors.confirmpassword =
        "Confirm Password must be matched with original password";
    } else {
      errors.confirmpassword = true;
    }
    return errors;
  };

  useEffect(() => {
    if (validationErr.name === true && validationErr.email === true) {
      if (validationErr.mobile === true && validationErr.password === true) {
        if (validationErr.confirmpassword === true) {
          setSubmitStatus(true);
        }
      }
    }
  }, [validationErr]);

  return (
    <>
      {process ? (
        <center>
          <h1 style={{ marginTop: "auto" }}>
            <Spinner />
          </h1>
        </center>
      ) : (
        <div id="register_container">
          <div className="register_semicontainer">
            <div className="register_form">
              <h1>Sign up</h1>

              <form method="POST" className="register_form_input">
                <input
                  type="text"
                  name="name"
                  value={registerState.name}
                  onChange={inputEvent}
                  placeholder="Your name"
                  required
                ></input>
                <p
                  style={{ color: "red", fontSize: "10px", marginTop: "-1px" }}
                >
                  {validationErr.name}
                </p>
                <input
                  type="email"
                  name="email"
                  value={registerState.email}
                  onChange={inputEvent}
                  placeholder="Your email"
                  required
                ></input>
                <p
                  style={{ color: "red", fontSize: "10px", marginTop: "-1px" }}
                >
                  {validationErr.email}
                </p>
                <input
                  type="number"
                  name="mobile"
                  value={registerState.mobile}
                  onChange={inputEvent}
                  placeholder="mobile Number"
                  required
                ></input>
                <p
                  style={{ color: "red", fontSize: "10px", marginTop: "-1px" }}
                >
                  {validationErr.mobile}
                </p>
                <input
                  type="text"
                  name="profession"
                  value={registerState.profession}
                  onChange={inputEvent}
                  placeholder="Your profession"
                  required
                ></input>
                <input
                  type="password"
                  name="password"
                  value={registerState.password}
                  onChange={inputEvent}
                  placeholder="Your password"
                  required
                ></input>
                <p
                  style={{ color: "red", fontSize: "10px", marginTop: "-1px" }}
                >
                  {validationErr.password}
                </p>

                <input
                  type="password"
                  name="confirmpassword"
                  value={registerState.confirmpassword}
                  onChange={inputEvent}
                  placeholder="confirm Your password"
                  required
                ></input>
                <p
                  style={{ color: "red", fontSize: "10px", marginTop: "-1px" }}
                >
                  {validationErr.confirmpassword}
                </p>

                <input
                  type="submit"
                  value="Register"
                  id="register_register_submit"
                  onClick={submitRegister}
                ></input>
              </form>
            </div>

            <div>
              <img
                className="register_image"
                src="./image/register.jpg"
                alt="register"
              ></img>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
