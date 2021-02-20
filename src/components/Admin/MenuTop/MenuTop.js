import React from "react";
import Logo from "../../../assets/img/png/logo192.png";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { logOut } from "../../../api/auth";

import "./MenuTop.scss";
function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img src={Logo} alt="" className="menu-top__left-logo" />
        <Button
          onClick={() => {
            setMenuCollapsed(!menuCollapsed);
          }}
          type="link"
        >
          {menuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button
          onClick={() => {
            logOut();
            window.location.reload();
          }}
          type="link"
        >
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}

export default MenuTop;
