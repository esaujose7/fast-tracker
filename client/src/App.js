import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import authContext from "./context/auth/authContext";
import NavigationBar from "./components/Navbar";
import PrivateRoute from './components/PrivateRoute';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

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
          <Route path="/register" exact >
            <Register />
          </Route>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
