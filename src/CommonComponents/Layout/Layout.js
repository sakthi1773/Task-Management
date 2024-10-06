
import React, { useState } from "react";
import SideNav from "../../screens/SideNav/SideNav";
import TaskList from "../../screens/TaskList/TaskList";
import "./Layout.css";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../../screens/DashBoard/DashBoard";
import { MenuOutlined } from "@ant-design/icons"; 

const Layout = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="layout">
      <button className="hamburger-btn" onClick={toggleNavVisibility}>
        <MenuOutlined />
      </button>

      <div className={`navs ${isNavVisible ? "visible" : ""}`}>
        <SideNav />
      </div>

      <div className="body">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/task-list" element={<TaskList />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
