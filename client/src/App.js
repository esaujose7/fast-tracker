import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './style.scss';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { FastingContextProvider } from "./context/fastings/context";
import AuthContext from "./context/auth/context";
import NavigationBar from "./components/Navbar";
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { loading, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <FastingContextProvider>
          <PrivateRoute path="/">
            <Dashboard />
          </PrivateRoute>
        </FastingContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
