
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  to?: string; // Add optional route path for navigation
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  to,
  ...props
}: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none btn-hover-effect";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizes = {
    sm: "h-9 px-3 rounded-md text-sm",
    md: "h-10 py-2 px-4",
    lg: "h-12 px-8 rounded-md text-lg"
  };
  
  // If to is provided, render a Link, otherwise render a button
  if (to) {
    return (
      <Link
        to={to}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
