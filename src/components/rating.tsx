import React from "react";

interface RatingStarsProps {
  rating: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div>
      <div className="relative inline-block text-[20px] leading-none">
        <div className="text-md text-gray-300">★★★★★</div>
        <div
          className="text-md absolute top-0 left-0 overflow-hidden whitespace-nowrap text-yellow-400"
          style={{ width: `${(rating / 5) * 100}%` }}
        >
          ★★★★★
        </div>
      </div>
    </div>
  );
};
