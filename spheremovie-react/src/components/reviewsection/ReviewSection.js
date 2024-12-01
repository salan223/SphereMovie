import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue }) => {
  const [rating, setRating] = useState(0);

  // Handles the rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Handles form submission
  const onSubmit = (event) => {
    event.preventDefault(); // Prevents the default form behavior (reloading)
    const reviewText = revText.current.value; // Gets the review text
    handleSubmit({ reviewText, rating }); // Passes the review text and rating to the parent function
  };

  return (
    <Form onSubmit={onSubmit}> {/* Attach onSubmit to the form */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{labelText}</Form.Label>
        <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
      </Form.Group>
      {/* Star rating component */}
      <ReactStars
        count={5}
        size={30}
        activeColor="#ffd700"
        value={rating}
        onChange={handleRatingChange}
      />
      <Button variant="outline-info" type="submit">Submit</Button> {/* Set button type to submit */}
    </Form>
  );
};

export default ReviewForm;
