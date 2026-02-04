import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Rating = ({ rating, onRate, readonly = false, size = 20 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <motion.button
          key={star}
          whileHover={!readonly ? { scale: 1.2 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          onClick={() => !readonly && onRate && onRate(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} transition-colors`}
          type="button"
        >
          <Star
            size={size}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
          />
        </motion.button>
      ))}
    </div>
  );
};

export default Rating;
