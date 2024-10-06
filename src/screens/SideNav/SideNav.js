import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SideNav.css";
import { PieChartOutlined } from "@ant-design/icons";

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const navigate = useNavigate();
  const navList = [
    { name: "Dashboard", path: "/" },
    { name: "Task list", path: "/task-list" },
  ];

  useEffect(() => {
    navigate(navList[0].path); 
  }, []); 

  const handleOnclickActiveTab = (path, index) => {
    setActiveIndex(index); 
    navigate(path); 
  };

  return (
    <div className="side-nav">
      <div className="logo">
        <PieChartOutlined />
        <span  className="text-primary title" onClick={()=>navigate("/")}> {"Task Manager"}</span>
      </div>
      <ul>
        {navList.map((item, i) => (
          <li
            key={i}
            onClick={() => handleOnclickActiveTab(item.path, i)}
            className={activeIndex === i ? "active" : ""}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
