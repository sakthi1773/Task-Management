import React from "react";
import { Dropdown as ADDropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./DropDown.css";

const Dropdown = ({ options, onSelect, trigger, text, type, placement,className }) => {
  const handleMenuClick = (e) => {
    const selectedOption = options.find((option) => option.value === e.key);
    if (selectedOption && onSelect) {
      onSelect(selectedOption);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {options?.map((option) => (
        <Menu.Item key={option.value}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <ADDropdown overlay={menu} trigger={trigger} className={className} placement={placement}>
      <span
        className="dropdownBtn"
        style={{ cursor: "pointer" }}
        onClick={(e) => e.preventDefault()}
      >
        {text}{" "}
        <span >
          <DownOutlined style={{width:"10px",height:"7px"}}/>
        </span>
      </span>
    </ADDropdown>
  );
};

export default Dropdown;
