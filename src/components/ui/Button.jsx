import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent-500 hover:bg-accent-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-primary-500 hover:bg-primary-600 text-white',
    outline: 'border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white',
    ghost: 'text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/20',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
