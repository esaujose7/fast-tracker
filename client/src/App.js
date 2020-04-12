import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { FastingContextProvider } from "./context/fastings/context";
import AuthContext from "./context/auth/context";

import NavigationBar from "./components/Navbar";
import PrivateRoute from './components/PrivateRoute';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

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
        <Route>
          <FastingContextProvider>
            <PrivateRoute path="/" exact>
              <Dashboard />
            </PrivateRoute>
          </FastingContextProvider>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
