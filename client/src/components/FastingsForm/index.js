import React, { useContext } from "react";

import FastingContext from "../../context/fastings/context";

const FastingsForm = () => {
  const { startFasting, stopFasting, lastFast } = useContext(FastingContext);

  const isLastFastingOngoing = () => lastFast && lastFast.ongoing || false;

  const onClick = (e) => {
    e.preventDefault();

    if (isLastFastingOngoing()) {
      return stopFasting(lastFast.id);
    }

    return startFasting();
  }

  return (
    <form>
      <button type="submit" onClick={onClick}>
        {isLastFastingOngoing() ? "Stop Fasting" : "Start Fasting"}
      </button>
    </form>
  );
};

export default FastingsForm;
