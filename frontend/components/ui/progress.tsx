// @ts-nocheck


import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef(
  (
    { className, value = 0, max = 100, ...props }: ProgressPrimitive.ProgressProps,
    ref: React.Ref<any>
  ) => {
    // Ensure value is a number, defaulting to 0 if it is null or undefined
    const clampedValue = Math.min(Math.max(value ?? 0, 0), max);
    
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - clampedValue}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
