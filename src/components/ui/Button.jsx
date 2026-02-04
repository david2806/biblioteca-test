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
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-primary text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-gradient-secondary text-neutral-800 dark:text-neutral-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    accent: 'bg-gradient-accent text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    outline: 'border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:text-white',
    ghost: 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20',
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
