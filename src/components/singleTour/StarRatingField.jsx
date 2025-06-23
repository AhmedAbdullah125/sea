import  { useState } from 'react';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';

const StarRatingField = ({ value = 0, onChange, totalStars = 5 }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1" >
      {Array.from({ length: totalStars }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          className="text-2xl text-yellow-500"
        >
          {star <= (hover ?? value) ? <TiStarFullOutline /> : <TiStarFullOutline className='text-gray-400' />}
        </button>
      ))}
    </div>
  );
};

export default StarRatingField;
