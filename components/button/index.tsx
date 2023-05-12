'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'flex cursor-pointer items-center justify-center  font-medium text-white active:opacity-80',
  variants: {
    color: {
      primary:
        'background: rgba(4, 7, 11, 0.7) rounded-full border border-white text-white backdrop-blur-[14px]',
      secondary: 'bg-purple3 text-white'
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg'
    }
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
});

interface ButtonProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md';
  color?: 'primary' | 'secondary' | undefined;
  onclick?: any;
}

export const Button = ({
  size,
  color,
  children,
  className,
  onClick
}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={button({
        size,
        color,
        class: className
      })}
    >
      {children}
    </div>
  );
};
