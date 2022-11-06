import React, { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Notes from "./components/Notes";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import { initialState, reducer } from "../src/reducer/UseReducer";

export const UserContext = createContext();

const App = () => {
  var [state, dispatch] = useReducer(reducer, initialState);

  var Routing = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signout" element={<Logout />}></Route>
      </Routes>
    );
  };

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
