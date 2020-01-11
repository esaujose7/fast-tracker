import React, { useContext, useEffect } from "react";

import FastingsForm from "../FastingsForm";

import FastingContext from "../../context/fastings/fastingContext";
import AuthContext from "../../context/auth/authContext";

const Dashboard = () => {
  const { fastings, loading, lastFast, getFastings } = useContext(
    FastingContext
  );
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    getFastings();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <a href="#!" onClick={() => logout()}>
        Logout
      </a>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h1>Fastings</h1>
          {fastings.map(fasting => {
            return <h3 key={fasting.id}>{JSON.stringify(fasting, null, 2)}</h3>;
          })}
        </div>
        <div>
          <h1>Last Fast</h1>
          {JSON.stringify(lastFast)}
        </div>
      </div>
      <FastingsForm />
    </div>
  );
};

export default Dashboard;
