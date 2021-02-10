import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";
import "./RegisterForm.scss";

function RegisterForm() {
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    // e.preventDefault();
    const { email, password, repeatPassword } = formValid;
    const passwordVal = user.password;
    const repeatPasswordVal = user.repeatPassword;
    const emailVal = user.email;
    if (!emailVal || !repeatPasswordVal || !passwordVal) {
      notification["error"]({ message: "Fill all the data" });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({ message: "Passwords must match!" });
      } else {
        const result = await signUpApi(user);
        if (result.ok) {
          notification["success"]({ message: result.message });
        } else {
          notification["error"]({ message: result.message });
        }
      }
    }
    resetForm();
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;
    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }

    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 8),
      });
    }
  };

  const resetForm = () => {
    const input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
      input[i].classList.remove("success");
      input[i].classList.remove("error");
    }
    setUser({ email: "", password: "", repeatPassword: "" });
    setFormValid({ email: false, password: false, repeatPassword: false });
  };

  return (
    <Form onFinish={submitForm} onChange={onChange} className="register-form">
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="email"
          name="email"
          placeholder="email"
          className="register-form__input"
          value={user.email}
          onChange={inputValidation}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="password"
          placeholder="password"
          className="register-form__input"
          value={user.password}
          onChange={inputValidation}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          className="register-form__input"
          value={user.repeatPassword}
          onChange={inputValidation}
        ></Input>
      </Form.Item>

      <Button className="register-form__button" htmlType="submit">
        Create Account
      </Button>
    </Form>
  );
}

export default RegisterForm;
