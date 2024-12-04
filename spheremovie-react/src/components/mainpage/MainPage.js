
import './MainPage.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Hero = ({ movies }) => {
    const [watchlist, setWatchlist] = useState([]); // Watchlist state
    const navigate = useNavigate();

    // Add movie to watchlist
    const addToWatchlist = (movie) => {
        if (!watchlist.find((m) => m.imdbId === movie.imdbId)) {
            setWatchlist([...watchlist, movie]);
        }
    };

    // Remove movie from watchlist
    const removeFromWatchlist = (movieId) => {
        setWatchlist(watchlist.filter((movie) => movie.imdbId !== movieId));
    };

    // Navigate to reviews
    const goToReviews = (movieId) => {
        navigate(`/Reviews/${movieId}`);
    };

    return (
        <div className="movie-carousel-container">
            <Carousel>
                {movies?.map((movie) => (
                    <Paper key={movie.imdbId}>
                        <div className="movie-card-container">
                            <div
                                className="movie-card"
                                style={{ '--img': `url(${movie.backdrops[0]})` }}
                            >
                                <div className="movie-detail">
                                    {}
                                    <div className="movie-poster" onClick={() => goToReviews(movie.imdbId)} style={{ cursor: 'pointer' }}>
                                        <img src={movie.poster} alt={movie.title} />
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon
                                                    className="play-button-icon"
                                                    icon={faCirclePlay}
                                                />
                                            </div>
                                        </Link>
                                        <div className="movie-review-button-container" style={{ marginRight: '40px' }}>
                                            <Button
                                                variant="info"
                                                onClick={() => goToReviews(movie.imdbId)}
                                            >
                                                Reviews
                                            </Button>
                                        </div>
                                        {}
                                        <div className="movie-watchlist-button-container">
                                            <Button
                                                variant="primary"
                                                onClick={() => addToWatchlist(movie)}
                                            >
                                                Add to Watchlist
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                ))}
            </Carousel>

            {}
            <div className="watchlist-section">
                <h3>Watchlist</h3>
                <div className="watchlist-container">
                    {watchlist.length > 0 ? (
                        watchlist.map((movie, index) => (
                            <div
                                key={movie.imdbId}
                                className="watchlist-item"
                                style={{ cursor: 'pointer' }}
                                onClick={() => goToReviews(movie.imdbId)}
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    style={{
                                        width: '120px',
                                        borderRadius: '5px',
                                        marginBottom: '10px',
                                    }}
                                />
                                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {movie.title}
                                </p>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering navigation
                                        removeFromWatchlist(movie.imdbId);
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No movies in the watchlist yet!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
