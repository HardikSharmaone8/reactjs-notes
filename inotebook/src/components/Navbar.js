import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

var Navbar = () => {
  var { state, dispatch } = useContext(UserContext);
  console.log("State value", state);

  var addsidebars = (e) => {
    e.preventDefault();
    document.getElementById("sidebar").style.marginLeft = "0px";
    document.querySelector(".fa-bars").style.display = "none";
    document.querySelector(".fa-square-xmark").style.display = "block";
  };

  var removesidebars = (e) => {
    e.preventDefault();
    document.getElementById("sidebar").style.marginLeft = "-1500px";
    document.querySelector(".fa-bars").style.display = "block";
    document.querySelector(".fa-square-xmark").style.display = "none";
  };

  var Nav = () => {
    if (state) {
      return (
        <>
          <NavLink className="navlink" to="/" end>
            Home
          </NavLink>
          <NavLink className="navlink" to="/about">
            About
          </NavLink>
          <NavLink className="navlink" to="/notes">
            Notes
          </NavLink>
          <NavLink className="navlink" to="/signout">
            Logout
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink className="navlink" to="/" end>
            Home
          </NavLink>
          <NavLink className="navlink" to="/about">
            About
          </NavLink>
          <NavLink className="navlink" to="/notes">
            Notes
          </NavLink>
          <NavLink className="navlink" to="/signup">
            Register
          </NavLink>
          <NavLink className="navlink" to="/login">
            Login
          </NavLink>
        </>
      );
    }
  };
  return (
    <>
      <div id="navbar">
        <div className="logo">HS NOTES</div>
        <div className="navlinks">
          <Nav />
        </div>

        {/* start of responsive header */}
        <i className="fa-solid fa-bars" onClick={addsidebars}></i>
        <i class="fa-solid fa-square-xmark" onClick={removesidebars}></i>
        {/* end of responsive header */}
      </div>
      {state ? (
        <div id="sidebar">
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/" end>
              Home
            </NavLink>
          </div>
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/about">
              About
            </NavLink>
          </div>
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/notes">
              Notes
            </NavLink>
          </div>
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/signout">
              LogOut
            </NavLink>
          </div>
        </div>
      ) : (
        <div id="sidebar">
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/" end>
              Home
            </NavLink>
          </div>
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/about">
              About
            </NavLink>
          </div>
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/notes">
              Notes
            </NavLink>
          </div>
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/signup">
              Register
            </NavLink>
          </div>
          <div className="sidebar_navlink">
            <NavLink className="navlink" to="/login">
              Login
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
