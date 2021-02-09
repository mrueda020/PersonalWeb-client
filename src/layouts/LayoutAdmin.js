import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";
import "./LayoutAdmin.scss";

function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const user = null;
  if (!user) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  return (
    <div>
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            {/* <LoadRoutes routes={routes} /> */}
          </Content>
          <Footer className="layout-admin__footer"> Footer </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

function LoadRoutes(props) {
  const { routes } = props;
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
}

export default LayoutAdmin;
