import React from 'react';
import dayjs from 'dayjs';

const formatDate = (dateObject) => dateObject.format('DD/MM/YYYY HH:mm:ss');

const FastingItem = ({ ongoing, startDate, finishedDate }) => {
  const startDateObject = dayjs(startDate);
  const finishedDateObject = dayjs(finishedDate);

  return (
    <li style={{ display: 'flex', flexDirection: 'column' }}>
      <span>Started: {formatDate(startDateObject)}</span>
      <span>Finished: {ongoing ? '-' : formatDate(finishedDateObject)}</span>
      <span>Ongoing: {ongoing ? "Yep" : "Nope"}</span>
    </li>
  );
}

export default FastingItem
