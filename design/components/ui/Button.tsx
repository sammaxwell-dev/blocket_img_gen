import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-3 px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 border-2 border-charcoal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none";
  
  const variants = {
    primary: "bg-intl-orange text-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:bg-[#E04500]",
    secondary: "bg-transparent text-charcoal shadow-[4px_4px_0px_0px_#1A1A1A] hover:bg-white",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon ? icon : <ArrowRight className="w-5 h-5 stroke-[2.5px]" />}
    </button>
  );
};