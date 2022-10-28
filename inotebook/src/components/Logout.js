import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

var Logout = () => {
  var navigate = useNavigate();
  var { state, dispatch } = useContext(UserContext);
  try {
    useEffect(() => {
      var getResponse = async () => {
        var res = await fetch("/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        var responce = await res.json();
        dispatch({ type: "USER", payload: false });
        console.log("responce", responce);

        if (responce) {
          alert("successfully Logout..");
          navigate("/login");
        }
      };
      getResponse();
    }, []);
  } catch (err) {
    alert("Error Occured while Logout from website");
  }
  return <></>;
};

export default Logout;
