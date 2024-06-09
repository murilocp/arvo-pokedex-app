import React from 'react';
import { Progress } from './ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StatBarProps {
  label: React.ReactNode;
  value: number;
}

export default function StatBar({ label, value }: StatBarProps) {
  return (
    <div className='flex items-center justify-between'>
      <span className='mr-3 font-bold w-1/4'>{label}</span>

      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <span className='w-3/4 flex items-center hover:cursor-pointer'>
              <Progress value={value / 2} />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
