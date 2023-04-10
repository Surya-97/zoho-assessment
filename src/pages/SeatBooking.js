import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../styles/SeatBooking.css'
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SeatBooking = ({ selectedShow }) => {
    const [alertShow, setAlertShow] = useState(false);
    const [bookingResponse, setBookingResponse] = useState("");

    const navigate = useNavigate()
    const rows = 10;
    const cols = 10;
    const [seats, setSeats] = useState(
        Array(rows)
            .fill()
            .map(() => Array(cols).fill(false))
    );
    const unavailableSeats = []
    const desiredDate = selectedShow.bookingDate;

    if (selectedShow?.booked_seats?.booked_seats !== undefined) {
        for (const booking of selectedShow?.booked_seats?.booked_seats) {
            if (booking.date === desiredDate) {
                if (booking.show1_time === selectedShow.time) {
                    unavailableSeats.push(...JSON.parse(booking.show1_booked_seats));
                }
                if (booking.show2_time === selectedShow.time) {
                    unavailableSeats.push(...JSON.parse(booking.show2_booked_seats));
                }
                if (booking.show3_time === selectedShow.time) {
                    unavailableSeats.push(...JSON.parse(booking.show3_booked_seats));
                }
                if (booking.show4_time === selectedShow.time) {
                    unavailableSeats.push(...JSON.parse(booking.show4_booked_seats));
                }
            }
        }
    }
    unavailableSeats.forEach(seatIndex => {
        const rowIndex = Math.floor(seatIndex / cols);
        const colIndex = seatIndex % cols;
        seats[rowIndex][colIndex] = 'unavailable';
    });
    const [unavailableIndices, setUnavailableIndices] = useState([]);

    const toggleSeat = (rowIndex, colIndex) => {
        const newSelectedSeats = [...seats];
        newSelectedSeats[rowIndex] = newSelectedSeats[rowIndex] || [];
        newSelectedSeats[rowIndex][colIndex] = !newSelectedSeats[rowIndex][colIndex];
        setSeats(newSelectedSeats);
    };

    useEffect(() => {
        const newUnavailableIndices = [];
        seats.forEach((row, rowIndex) => {
            row.forEach((status, colIndex) => {
                if (status === 'unavailable') {
                    newUnavailableIndices.push(rowIndex * cols + colIndex);
                }
            });
        });
        setUnavailableIndices(newUnavailableIndices);
    }, [seats, bookingResponse]);

    const getSelectedSeats = () => {
        const selected = [];
        seats.forEach((row, rowIndex) => {
            row.forEach((isSelected, colIndex) => {
                if (isSelected === true) {
                    selected.push(rowIndex * cols + colIndex);
                }
            });
        });
        return selected;
    };

    const handleSubmit = (() => {
        const selectedSeats = getSelectedSeats();
        let bookSeats = {
            show_time: selectedShow.time,
            movie_name: selectedShow.movie,
            theatre_name: selectedShow.theatre_name,
            booked_seats: selectedSeats,
            date: desiredDate,
            user_mail_id: "suryaer97@gmail.com"
        }

        axios.post(`https://zincubate.in/api/MovieTicketChecker?action=bookSeats`, bookSeats).then((response) => {
            console.log(response.data.message)
            setBookingResponse(response.data.message)
            setAlertShow(true)
            setTimeout(() => {
             navigate('/')
            }, 4000);
        })
    })

    return (
        <div>
            <ToastContainer position="top-end" className="p-3">
                <Toast show={alertShow} onClose={() => setAlertShow(false)} delay={3000} autohide bg="success">
                    <Toast.Body>{bookingResponse}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="select-ticket">
                Select your seats
            </div>


            <div className="seating-chart">
                {seats.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        <div className="row-label">{String.fromCharCode(65 + rowIndex)}</div>
                        {row.map((isSelected, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`seat ${isSelected === 'unavailable' ? 'unavailable' : ''}`}
                                onClick={() => {
                                    if (isSelected !== 'unavailable') {
                                        toggleSeat(rowIndex, colIndex);
                                    }
                                }}
                            // onClick={() => toggleSeat(rowIndex, colIndex)}
                            >
                                <div className="item">
                                    {isSelected == 'unavailable' ? (
                                        <FontAwesomeIcon icon={faTimesCircle} className="icon unavailable" />
                                    ) : isSelected ? <FontAwesomeIcon icon={faCheckSquare} className="icon selected" />
                                        :
                                        (
                                            <FontAwesomeIcon icon={faSquare} className="icon" />
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="row">
                    <div className="row-label"></div>
                    {seats.length > 0 && seats[0].map((_, colIndex) => (
                        <div key={`col-${colIndex}`} className="col-label">
                            {colIndex + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div class="screen">
                <span style={{ color: "rgb(245, 166, 35)", fontSize: "16px" }}>Screen this way</span>
            </div>
            <div className="legend">
                <div className="item">
                    <FontAwesomeIcon icon={faSquare} className="icon" />
                    <span className="ml">Available</span>
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faCheckSquare} className="icon selected" />
                    <span className="ml">Selected</span>
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faTimesCircle} className="icon unavailable" />
                    <span className="ml">Unavailable</span>
                </div>
            </div>

            <div className="buy-ticket">
                <button onClick={handleSubmit} disabled={!seats.some(row => row.some(isSelected => isSelected))}>
                    Buy Tickets
                </button>
            </div>
        </div>
    );
};

export default SeatBooking;
