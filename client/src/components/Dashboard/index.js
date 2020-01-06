import React, { useContext, useEffect } from "react";

import FastingContext from "../../context/fastings/fastingContext";

const Dashboard = () => {
  const { fastings, loading, lastFast, getFastings } = useContext(
    FastingContext
  );

  useEffect(() => {
    getFastings();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <h1>Fastings</h1>
        {fastings.map(fasting => {
          return <h3>{JSON.stringify(fasting, null, 2)}</h3>;
        })}
      </div>
      <div>
        <h1>Last Fast</h1>
        {JSON.stringify(lastFast)}
      </div>
    </div>
  );
};

export default Dashboard;
