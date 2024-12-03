import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const ReviewForm = ({ handleSubmit, revText, labelText }) => {
    const [rating, setRating] = useState(0); // State for selected rating
    const [hoveredRating, setHoveredRating] = useState(0); // State for hovered rating

    const handleRatingClick = (value) => {
        setRating(value); // Set selected rating
    };

    const handleRatingHover = (value) => {
        setHoveredRating(value); // Set hovered rating
    };

    const handleRatingLeave = () => {
        setHoveredRating(0); // Reset hovered rating when mouse leaves
    };

    return (
        <Form onSubmit={(e) => handleSubmit(e, rating)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control
                    ref={revText}
                    as="textarea"
                    rows={3}
                    placeholder="Write your review here..."
                />
            </Form.Group>
            <div className="rating" style={{ marginBottom: '20px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${
                            star <= (hoveredRating || rating) ? 'selected' : ''
                        }`}
                        onClick={() => handleRatingClick(star)} // Set rating on click
                        onMouseEnter={() => handleRatingHover(star)} // Set hover state
                        onMouseLeave={handleRatingLeave} // Clear hover state
                        style={{
                            fontSize: '24px',
                            color: star <= (hoveredRating || rating) ? 'gold' : 'gray',
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                        }}
                    >
                        ⭐
                    </span>
                ))}
                {/* Show how many stars are selected */}
                <p style={{ marginTop: '10px' }}>
                    {hoveredRating || rating
                        ? `You selected ${hoveredRating || rating} star${
                              (hoveredRating || rating) > 1 ? 's' : ''
                          }`
                        : 'Click on stars to rate'}
                </p>
            </div>
            <Button variant="outline-info" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default ReviewForm;
