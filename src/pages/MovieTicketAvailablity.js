import React, { useEffect, useState } from "react";
import '../styles/MovieTicketAvailablity.css'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SeatBooking from "./SeatBooking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieTicketAvailablity = () => {
    let theatreData = useSelector(state => state.SelectedTheatreReducer);
    const [showsData, setShowsData] = useState([]);
    const [selectedShow, setSelectedShow] = useState([]);
    const [bookingDate, setBookingDate] = useState(new Date());

    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const handleOpenModal = (show, showTime, theater) => {
        show = { movie: show.movie, time: showTime, theatre_name: theater.theatre_name, booked_seats: theater, bookingDate:bookingDate }
        setShowModal(true);
        setSelectedShow(show)
    };

    useEffect(() => {
        const shows = {};
        for (let i = 1; i <= 4; i++) {
            const movieKey = `show${i}_movie`;
            const timeKey = `show${i}_time`;

            if (theatreData[movieKey] && theatreData[timeKey]) {
                if (!shows[theatreData[movieKey]]) {
                    shows[theatreData[movieKey]] = {
                        movie: theatreData[movieKey],
                        times: []
                    };
                }
                shows[theatreData[movieKey]].times.push(theatreData[timeKey]);
            }
        }

        setShowsData(Object.values(shows))
    }, [])

    return (
        <>
            <div id="divTheatreInfo" className="theatre-details tn-entity-details" style={{ width: "100%" }}>
                <h2 style={{ color: "rgb(221 119 36)" }}>{theatreData.theatre_name}</h2>
                <h5 style={{ color: "white" }}>{theatreData.address}</h5>
                <div className="tn-services">
                    <span className="tn-service">RGB Laser</span>
                    <span className="tn-service">F&amp;B</span> <span className="tn-service">4K</span>
                    <span className="tn-service">Dolby Atmos</span> <span className="tn-service">3D</span>
                    <span className="tn-service">Metro Train</span> <span className="tn-service">Parking</span>
                    <span className="tn-service">Sofa</span>
                </div>
            </div>

            <div className="movie-list-container">
                <div className="theater-container">
                    <div className="tn-section-title title">
                    <h2>{theatreData.theatre_name}</h2>
                    </div>
                    <div className="date-picker">
                    <span style={{ color: "#f5a623", fontSize: "16px", fontWeight: "bold", width: "auto",minWidth: "100px" }}>Select Date:</span>
                    <DatePicker
                        selected={bookingDate}
                        onChange={(date) => setBookingDate(date)}
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 5)}
                        placeholderText="Select a date between today and 5 days in the future"
                    /></div>
                    {showsData.map(movie => (
                        <div className="movie-container">
                            <h3 className="movie-title">{movie.movie}</h3>
                            <ul className="time-list">
                                {movie.times.map(time => (
                                    <li key={time} onClick={() => handleOpenModal(movie, time, theatreData)}>{time}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={showModal} fullscreen={true} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <div className="theatre-details tn-entity-details" style={{ width: "100%" }}>
                        <h4 style={{ color: "rgb(221 119 36)" }}>{selectedShow.theatre_name} - <span style={{ color: "white" }}>{selectedShow.movie}</span></h4>
                        <h6 style={{ color: "white" }}>{new Date().toLocaleDateString("en-US", options)} - {selectedShow.time} </h6>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <SeatBooking selectedShow={selectedShow}></SeatBooking>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MovieTicketAvailablity;
