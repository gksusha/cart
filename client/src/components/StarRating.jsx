import { Star } from "lucide-react";

function StarRating({ rating, reviews }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={14} className="fill-yellow-400 text-yellow-400" />
        ))}

        {hasHalfStar && (
          <div className="relative">
            <Star size={14} className="text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={14} className="text-gray-300" />
        ))}
      </div>

      <span className="text-sm text-gray-500">{reviews} reviews</span>
    </div>
  );
}

export default StarRating;