import React, { useContext, useEffect } from "react";

import FastingsForm from "../FastingsForm";
import FastingItem from "../FastingItem";

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
      <button onClick={() => logout()}>
        Logout
      </button>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h1>Fastings</h1>
          Your last fastings were:
          <ol>
            {fastings.map(
              ({ id, ongoing, createdAt, updatedAt }) =>
                <FastingItem key={id} ongoing={ongoing} startDate={createdAt} finishedDate={updatedAt} />
            )}
          </ol>
        </div>
        <div>
          <h1>Last Fast</h1>
          <FastingItem ongoing={lastFast.ongoing} startDate={lastFast.createdAt} finishedDate={lastFast.updatedAt} />
        </div>
      </div>
      <FastingsForm />
    </div>
  );
};

export default Dashboard;
