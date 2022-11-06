import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var About = () => {
  var navigate = useNavigate();
  var [userState, setUserState] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Profession: "",
  });
  var getAboutPage = async () => {
    try {
      var getpage = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      var res = await getpage.json();
      //when we fetch the data through authentication in nodejs after we send the data from nodejs to reactjs by using {res.send()}....that that particular result will be reflect in this res variable

      setUserState({
        Name: res.Name,
        Email: res.Email,
        Mobile: res.Mobile,
        Profession: res.Profession,
      });
      // console.log("responce is", res);
    } catch (err) {
      toast.warn("Please login first..after using about page");
      navigate("/login");
    }
  };
  useEffect(() => {
    getAboutPage();
  }, []);

  return (
    <>
      <div className="About_container">
        <div style={{ color: "blue", fontWeight: "bold" }}>Welcome</div>
        <h2>about</h2>
        <ul>
          <li>{userState.Name}</li>
          <li>{userState.Email}</li>
          <li>{userState.Mobile}</li>
          <li>{userState.Profession}</li>
        </ul>
        <ToastContainer />
      </div>
    </>
  );
};

export default About;
