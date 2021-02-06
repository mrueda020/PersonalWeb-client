import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          Header...
          {routes.map((route, index) => {
            return (
              <RouteWithSubRoutes key={index} {...route}></RouteWithSubRoutes>
            );
          })}
        </Switch>
      </Router>
    </div>
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
