import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Rating = ({ rating, onRate, readonly = false, size = 20 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-0.5">
      {stars.map((star, index) => (
        <motion.button
          key={star}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={!readonly ? { scale: 1.2, rotate: 15 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          onClick={() => !readonly && onRate && onRate(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} transition-colors`}
          type="button"
        >
          <Star
            size={size}
            className={
              star <= rating 
                ? 'fill-secondary-400 text-secondary-500 drop-shadow-sm' 
                : 'text-neutral-300 dark:text-neutral-600'
            }
          />
        </motion.button>
      ))}
    </div>
  );
};

export default Rating;
