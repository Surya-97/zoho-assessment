import React, { useEffect, useState } from 'react';
import '../styles/MovieList.css'
import axios from 'axios';
import MovieCarousel from './MovieCarousel';

function MovieList() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.post(`https://zincubate.in/api/MovieTicketChecker?action=getAllDetails`, { user_mail_id: "suryaer97@gmail.com" }).then((response) => {
            console.log(response)
            setMovies(response?.data?.movies)
        })
    }, [])

    return (
        <div className="container">
            <MovieCarousel></MovieCarousel>
            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card">
                            {/* <div className="card-header">
                                <span className="badge badge-primary">{movie.imdb_rating}</span>
                            </div> */}
                            <img className="card-img-top" src={movie.thumbnail_url} alt={movie.movie_name} />
                            <div class="movie-info">
                                <h5 class="movie-title">{movie.movie_name}</h5>
                                <p class="movie-genre">{movie.tags}</p>
                                <div class="movie-rating ml">
                                    <span class="rating-icon"></span>
                                    <span class="rating-value">{movie.imdb_rating} / 10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default MovieList;
