import React from "react";

interface RatingStarsProps {
  rating: number;
}

const totalStars = 5;

export const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex py-1">
      {Array.from({ length: totalStars }).map((_, i) => {
        const starValue = i + 1;
        let fillPercent = 0;

        if (rating >= starValue) {
          fillPercent = 100;
        } else if (rating + 1 > starValue) {
          fillPercent = (rating % 1) * 100;
        }

        return (
          <div key={i} className="relative h-4 w-4">
            <Star className="text-gray-300" />

            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star className="text-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Star: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`h-4 w-4 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21c.63.36 1.4-.2 1.26-.9l-1.63-7.03 5.19-4.51c.53-.46.24-1.35-.48-1.42l-6.84-.59-2.65-6.3c-.27-.64-1.19-.64-1.45 0l-2.65 6.3-6.84.59c-.72.06-1.01.96-.48 1.42l5.19 4.51L4.56 20.1c-.14.7.63 1.26 1.26.9L12 17.27z" />
  </svg>
);
