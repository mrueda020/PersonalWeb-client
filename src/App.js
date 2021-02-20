import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./provider/AuthProvider";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Router>
          <Switch>
            {routes.map((route, index) => {
              return (
                <RouteWithSubRoutes key={index} {...route}></RouteWithSubRoutes>
              );
            })}
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
