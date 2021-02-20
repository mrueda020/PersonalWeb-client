import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import "./LoginForm.scss";

function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });

  const { Item } = Form;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    const result = await signInApi(user);
    if (result.message) {
      notification["error"]({ message: result.message });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      notification["success"]({ message: "Login correcto" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <Form className="login-form" onFinish={submitForm} onChange={onChange}>
      <Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="email"
          name="email"
          placeholder="email"
          className="login-form__input"
          value={user.email}
        />
      </Item>
      <Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="password"
          placeholder="password"
          className="login-form__input"
          value={user.password}
        />
      </Item>
      <Button className="login-form__button" htmlType="submit">
        Enter
      </Button>
    </Form>
  );
}

export default LoginForm;
