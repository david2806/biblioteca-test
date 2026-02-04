import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, onClick, variant = 'default' }) => {
  const variants = {
    default: 'card p-6',
    glass: 'card-glass p-6',
    gradient: 'bg-gradient-to-br from-white to-warm-50 rounded-2xl shadow-elegant p-6',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { 
        y: -6, 
        boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.2)',
        transition: { duration: 0.2 }
      } : {}}
      className={`${variants[variant]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
