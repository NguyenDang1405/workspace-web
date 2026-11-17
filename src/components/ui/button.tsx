import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default: 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-xs active:scale-[0.99]',
        destructive: 'bg-[#BE123C] text-white hover:bg-[#9F1239] shadow-xs active:scale-[0.99]',
        outline:
          'border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F1F5F9] hover:border-[#CBD5E1] shadow-xs',
        secondary: 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]',
        ghost: 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]',
        link: 'text-[#4F46E5] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-9 px-3.5 py-1.5',
        sm: 'h-7 rounded-md px-2.5 text-xs',
        lg: 'h-10 rounded-md px-5 text-sm',
        icon: 'h-8 w-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
