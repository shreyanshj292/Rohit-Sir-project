import { useState, useEffect } from 'react';
import TitleList from '../components/TitleList';

const WatchListPage = ({ watchList, toggle }) => {
  let titles = watchList;

  return (
    <>
      {titles ? (
        <TitleList titles={titles} watchList={watchList} toggle={toggle} />
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default WatchListPage;
