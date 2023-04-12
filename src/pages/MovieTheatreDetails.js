import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/MovieTheaterDetails.css';
import screen from '../assets/images/logo.jpg'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TheatreActions } from '../actions/TheaterActions';
import MovieCarousel from './MovieCarousel';

function MovieTheatreDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState();

  useEffect(() => {
    axios.post(`https://zincubate.in/api/MovieTicketChecker?action=getAllDetails`, { user_mail_id: "suryaer97@gmail.com" }).then((response) => {
      console.log(response)
      setTheatres(response?.data?.theatre)
    })
  }, []);

  const onSelectTheater = (theater)=>{
    dispatch(TheatreActions(theater));
    navigate('/MovieTicketAvailablity')
  }

  return (
    <>
      <MovieCarousel></MovieCarousel>
      <div className='tn-main-content'>
        <div className='tn-main-inner-content'>
          <div className="tn-section-title title">
            <h2>Theatres</h2>
          </div>

          {theatres.map((theatre, index) => (
            <div className='tn-entity-list tn-theatres' id='theatres'>
              <div className="tn-block tn-entity" data-filter="F&amp;B|Metro Train|Social Seating|RGB Laser|Dolby Atmos|4K|Sofa|3D">
                <div className="tn-theatre-icon">
                  <img src={screen} width="80px" height="80px" /></div>
                <div className="tn-entity-details">
                  <h5>{theatre.theatre_name}</h5>
                  <div className="tn-services">
                    <span className="tn-servicee">{theatre.address}</span>
                  </div>                  
                  <div class="movie-rating">
                    <span class="rating-icon"></span>
                    <span class="rating-value">{theatre.customer_rating}</span>
                  </div>
                  
                </div>
                <div className="tn-entity-book">
                  <a onClick={()=>{onSelectTheater(theatre); setSelectedTheatre(theatre)}}>Book</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="container">
        <h1>Movie & Theatre Details</h1>
        <div className="theatres-list">
          {theatres.map((theatre, index) => (
            <div className="theatre-card" key={index}>
              <div className="theatre-header">
                <h2 className="theatre-name">{theatre.theatre_name}</h2>
              </div>
              <p className="movie-name">Current movie running: {theatre.show1_movie}</p>
              <div className="show-timings">
                <div className="show-time">
                  <p>{theatre.show1_time}</p>
                  <p>Show 1</p>
                </div>
              </div>

              <p className="movie-name">Current movie running: {theatre.show2_movie}</p>
              <div className="show-timings">
                <div className="show-time">
                  <p>{theatre.show2_time}</p>
                  <p>Show 2</p>
                </div>
              </div>

              <p className="movie-name">Current movie running: {theatre.show3_movie}</p>
              <div className="show-timings">
                <div className="show-time">
                  <p>{theatre.show3_time}</p>
                  <p>Show 3</p>
                </div>
              </div>

              <p className="movie-name">Current movie running: {theatre.show4_movie}</p>
              <div className="show-timings">
                <div className="show-time">
                  <p>{theatre.show4_time}</p>
                  <p>Show 4</p>
                </div>
              </div>
              <p className="seats-available">{theatre.availableSeats} seats available</p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default MovieTheatreDetails;
