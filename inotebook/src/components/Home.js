import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

var Home = () => {
  var [userState, setUserState] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Profession: "",
  });
  var getUserData = async () => {
    try {
      var getuser = await fetch("/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", //jab hum cookie ya token generate krte h to ye code likhne se hamara yha store ho jayega
      });
      var res = await getuser.json();
      setUserState({
        Name: res.Name,
        Email: res.Email,
        Mobile: res.Mobile,
        Profession: res.Profession,
      });
    } catch (err) {
      console.log("Error occure while display home page");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <div className="home_container">
        <div style={{ color: "blue", fontWeight: "bold" }}>Welcome</div>
        {userState.Name !== "" ? (
          <h2>Welcome {userState.Name}</h2>
        ) : (
          <h2>We Are The MERN Stack Web Developers</h2>
        )}
      </div>
    </>
  );
};

export default Home;
