import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./LayoutAdmin.scss";

function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  return (
    <div>
      <Layout>
        <h2>Menu sidebar</h2>
        <Header>Header...</Header>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>Footer </Footer>
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
