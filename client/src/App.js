import React, { useContext, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import authContext from "./context/auth/authContext";
import NavigationBar from "./components/Navbar";
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { loading, loadUser } = useContext(authContext);

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route>
          <PrivateRoute path="/" exact >
            <Dashboard />
          </ PrivateRoute>
          <Route path="/login" exact >
            <Login />
          </Route>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
