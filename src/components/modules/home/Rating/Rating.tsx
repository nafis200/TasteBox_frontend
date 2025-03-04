import { FaStar, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating}:{rating: number}) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="text-yellow-500" />
      ) : (
        <FaRegStar key={i} className="text-yellow-500" />
      )
    );
  }

  return <div className="flex">{stars}</div>;
};

export default Rating;
