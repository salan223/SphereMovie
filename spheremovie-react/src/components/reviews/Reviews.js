/*
import { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewsection/ReviewForm';
import React from 'react';

const Reviews = ({ movie }) => {
    const revText = useRef(); // Reference for review text input
    const [reviews, setReviews] = useState([]); // Local state for reviews

    const addReview = (e, rating) => {
        e.preventDefault();

        const reviewText = revText.current.value;
        if (!reviewText) return; // Avoid empty reviews

        // Add the new review to the local state
        const newReview = {
            body: reviewText,
            rating: rating || 0, // Default rating to 0 if not provided
        };
        setReviews([...reviews, newReview]);

        // Clear the review input
        revText.current.value = '';
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews for {movie?.title}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img
                        src={movie?.poster}
                        alt={movie?.title}
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            marginBottom: '20px',
                        }}
                    />
                </Col>
                <Col>
                    {/* Review Form }
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {/* Display Reviews }
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>
                                        <p><strong>Review:</strong> {review.body}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>
                                            <strong>Rating:</strong>{' '}
                                            {Array(review.rating)
                                                .fill('⭐')
                                                .join('')}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))
                    ) : (
                        <Row>
                            <Col>
                                <p>No reviews yet. Be the first to write one!</p>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews; */
/*
import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewsection/ReviewForm';
import React from 'react';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    const { movieId } = useParams();

    useEffect(() => {
        // Fetch the movie details when the component mounts
        getMovieData(movieId);
    }, [getMovieData, movieId]);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try {
            // Submit the new review
            const response = await api.post('/api/v1/reviews', {
                reviewBody: rev.value,
                imdbId: movieId,
            });

            // Update the reviews state
            const updatedReviews = [...reviews, { body: rev.value }];
            rev.value = '';
            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews for: {movie?.title || 'Loading...'}</h3>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={4}>
                    {}
                    <img
                        src={movie?.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                        alt={movie?.title || 'No Title'}
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                    />
                </Col>
                <Col md={8}>
                    {}
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {}
                    {reviews?.length > 0 ? (
                        reviews.map((review, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>
                                        <p><strong>Review:</strong> {review.body}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))
                    ) : (
                        <Row>
                            <Col>
                                <p>No reviews yet. Be the first to write one!</p>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
*/

import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReviewForm from '../reviewsection/ReviewForm';
import React from 'react';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    const { movieId } = useParams();
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Fetch the movie details when the component mounts
        getMovieData(movieId);
    }, [getMovieData, movieId]);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try {
            // Submit the new review
            const response = await api.post('/api/v1/reviews', {
                reviewBody: rev.value,
                imdbId: movieId,
            });

            // Update the reviews state
            const updatedReviews = [...reviews, { body: rev.value }];
            rev.value = '';
            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
        }
    };

    const goToTrailer = () => {
        // Navigate to the trailer page
        if (movie?.trailerLink) {
            const trailerId = movie.trailerLink.substring(movie.trailerLink.length - 11);
            navigate(`/Trailer/${trailerId}`);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews for: {movie?.title || 'Loading...'}</h3>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={4}>
                    {/* Display the movie poster */}
                    <img
                        src={movie?.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                        alt={movie?.title || 'No Title'}
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                    />
                    {/* Trailer Button */}
                    <div className="trailer-button-container" style={{ marginTop: '15px', textAlign: 'center' }}>
                        <Button
                            variant="primary"
                            onClick={goToTrailer}
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                            }}
                        >
                            Watch Trailer
                        </Button>
                    </div>
                </Col>
                <Col md={8}>
                    {/* Review Form */}
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {/* Display Reviews */}
                    {reviews?.length > 0 ? (
                        reviews.map((review, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>
                                        <p><strong>Review:</strong> {review.body}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))
                    ) : (
                        <Row>
                            <Col>
                                <p>No reviews yet. Be the first to write one!</p>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;

