import React, { useState } from 'react';
import PropTypes from 'prop-types';

function StarRating({ rating, onChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starIndex) => {
    onChange(starIndex);
  };

  const handleStarMouseEnter = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex pb-9 pr-60">
      {Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;
        return (
          <div
            key={starIndex}
            className={`star text-2xl ${
              starIndex <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
            } cursor-pointer transition-colors duration-200`}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleStarMouseEnter(starIndex)}
            onMouseLeave={handleStarMouseLeave}
          >
            ★
          </div>
        );
      })}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StarRating;
