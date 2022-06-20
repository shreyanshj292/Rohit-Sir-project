import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainPage from './pages/Main';
import SearchPage from './pages/Search';
import SearchForm from './components/SearchForm';
import DetailsPage from './pages/Details';
import WatchListPage from './pages/WatchList';
import ProvidersPage from './pages/Providers';

function App() {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem('watch list')) || []
  );

  useEffect(() => {
    localStorage.setItem('watch list', JSON.stringify(watchList));
  }, [watchList]);

  const handleToggle = (titleToToggle) => {
    setWatchList((prevState) => {
      return prevState.findIndex((title) => title.id === titleToToggle.id) ===
        -1
        ? [...prevState, titleToToggle]
        : prevState.filter((title) => title.id !== titleToToggle.id);
    });
  };

  return (
    <Router>
      <Header>
        <SearchForm />
      </Header>
      <Routes>
        <Route
          path="/"
          element={<MainPage watchList={watchList} toggle={handleToggle} />}
        />
        <Route
          path="/search"
          element={<SearchPage watchList={watchList} toggle={handleToggle} />}
        />
        <Route
          path="/details/:id"
          element={<DetailsPage watchList={watchList} toggle={handleToggle} />}
        />
        <Route
          path="/my-watch-list"
          element={
            <WatchListPage watchList={watchList} toggle={handleToggle} />
          }
        />
        

        <Route 
          path='/providers'
          element={
            <ProvidersPage />
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
