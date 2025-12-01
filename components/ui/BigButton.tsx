import React from 'react';

interface BigButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'jidou' | 'neutral' | 'danger';
  className?: string;
  icon?: React.ReactNode;
}

export const BigButton: React.FC<BigButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  icon
}) => {
  let baseStyles = "w-full min-h-[70px] rounded-xl shadow-md flex items-center justify-center text-lg-large font-bold active:scale-95 transition-transform p-4 border-2";
  
  const variants = {
    primary: "bg-blue-600 text-white border-blue-700 active:bg-blue-700",
    secondary: "bg-green-600 text-white border-green-700 active:bg-green-700",
    jidou: "bg-pink-600 text-white border-pink-700 active:bg-pink-700",
    neutral: "bg-white text-gray-800 border-gray-300 active:bg-gray-100",
    danger: "bg-red-100 text-red-700 border-red-300 active:bg-red-200"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  );
};
