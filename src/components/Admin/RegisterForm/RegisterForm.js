import React from "react";
import { Form, Input, Button, Checkbox, notifications } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./RegisterForm.scss";
function RegisterForm() {
  const { Item } = Form;
  return (
    <Form className="register-form">
      <Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="email"
          name="email"
          placeholder="email"
          className="register-form__input"
        ></Input>
      </Item>
      <Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="password"
          placeholder="password"
          className="register-form__input"
        ></Input>
      </Item>
      <Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          className="register-form__input"
        ></Input>
      </Item>
      <Item>
        <Button className="register-form__button" htmlType="submit">
          Create Account
        </Button>
      </Item>
    </Form>
  );
}

export default RegisterForm;
