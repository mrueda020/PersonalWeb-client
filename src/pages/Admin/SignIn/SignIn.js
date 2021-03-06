import React from "react";
import Logo from "../../../assets/img/png/logo192.png";
import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import { getAccesToken } from "../../../api/auth";
import "./SignIn.scss";
function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccesToken()) {
    return <Redirect to="/admin" />;
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane key="1" tab={<span>Enter</span>}>
              <LoginForm></LoginForm>
            </TabPane>
            <TabPane key="2" tab={<span>Resgister</span>}>
              <RegisterForm></RegisterForm>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}

export default SignIn;
