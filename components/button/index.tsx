'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'flex cursor-pointer items-center justify-center  font-medium text-white active:opacity-80',
  variants: {
    color: {
      primary:
        'background: rgba(4, 7, 11, 0.7) rounded-full border border-white text-white backdrop-blur-[14px]',
      secondary: 'bg-gradient-to-b from-[#6E62EE] to-[#3038FA] text-white'
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
  onClick?: any;
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
      className={button({
        size,
        color,
        class: className
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
