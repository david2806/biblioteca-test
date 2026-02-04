import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      className={`card p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
