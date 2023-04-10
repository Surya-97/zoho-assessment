import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MovieList from './pages/MovieList';
import MovieTheatreDetails from './pages/MovieTheatreDetails';
import MovieTicketAvailablity from './pages/MovieTicketAvailablity';

import Navbar from './pages/Navbar';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import SeatBooking from './pages/SeatBooking';

const initialState = {};
const store = configureStore(initialState);

function App() {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/MovieTheatreDetails" element={<MovieTheatreDetails />} />
        <Route path="/MovieTicketAvailablity" element={<MovieTicketAvailablity />} />
        <Route path="/SeatBooking" element={<SeatBooking />} />
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
