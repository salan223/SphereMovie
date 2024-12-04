import { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from '../reviewsection/ReviewForm';
import api from '../../api/axiosConfig';
import React from 'react';

const Reviews = () => {
    const [movie, setMovie] = useState(null); // State for the selected movie
    const [reviews, setReviews] = useState([]); // State for reviews
    const [averageRating, setAverageRating] = useState(0); // State for average rating
    const [editingIndex, setEditingIndex] = useState(null); // State to track editing review index
    const revText = useRef(); // Reference for review text input
    const { movieId } = useParams(); // Get movie ID from the route params
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await api.get(`/api/v1/movies/${movieId}`);
                setMovie(response.data);
                const fetchedReviews = response.data.reviews || [];
                setReviews(fetchedReviews);
                calculateAverageRating(fetchedReviews); // Calculate the initial average rating
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchMovieData();
    }, [movieId]);

    const addReview = (e, rating) => {
        e.preventDefault();

        const reviewText = revText.current.value;
        if (!reviewText || !rating) return; // Avoid empty reviews or ratings

        const newReview = {
            body: reviewText,
            rating: rating,
        };

        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews); // Update reviews state
        calculateAverageRating(updatedReviews); // Recalculate the average rating
        revText.current.value = ''; // Clear input
    };

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
            setAverageRating(0);
            return;
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        setAverageRating(avgRating.toFixed(1));
    };

    const deleteReview = (index) => {
        const updatedReviews = reviews.filter((_, i) => i !== index);
        setReviews(updatedReviews); // Update reviews state
        calculateAverageRating(updatedReviews); // Recalculate the average rating
    };

    const startEditingReview = (index) => {
        setEditingIndex(index); // Set the index of the review being edited
        revText.current.value = reviews[index].body; // Pre-fill the text area with the existing review
    };

    const saveEditedReview = (e, rating) => {
        e.preventDefault();

        const updatedReviews = [...reviews];
        updatedReviews[editingIndex] = {
            body: revText.current.value,
            rating: rating || updatedReviews[editingIndex].rating,
        };

        setReviews(updatedReviews); // Update reviews state
        calculateAverageRating(updatedReviews); // Recalculate the average rating
        setEditingIndex(null); // Reset editing state
        revText.current.value = ''; // Clear input
    };

    const goToTrailer = () => {
        if (movie?.trailerLink) {
            const trailerId = movie.trailerLink.substring(movie.trailerLink.length - 11);
            navigate(`/Trailer/${trailerId}`);
        }
    };

    return (
        <Container style={{ maxWidth: '1200px', padding: '20px' }}>
            {movie ? (
                <>
                    <Row>
                        <Col md={4}>
                            <img
                                src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                                alt={movie.title || 'No Title'}
                                style={{
                                    width: '100%',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            />
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
                        <Col>
                            <h3>{movie.title}</h3>
                            <p><strong>Average Rating:</strong> {averageRating} ⭐</p>
                            <Row>
                                <Col>
                                    <ReviewForm
                                        handleSubmit={editingIndex !== null ? saveEditedReview : addReview}
                                        revText={revText}
                                        labelText={editingIndex !== null ? 'Edit your Review' : 'Write a Review'}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <React.Fragment key={index}>
                                        <Row>
                                            <Col>
                                                <p><strong>Review:</strong> {review.body}</p>
                                            </Col>
                                            <Col>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => startEditingReview(index)}
                                                    style={{ marginRight: '10px' }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => deleteReview(index)}
                                                >
                                                    Delete
                                                </Button>
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
                </>
            ) : (
                <Row>
                    <Col>
                        <h3>Loading...</h3>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Reviews;
