import { Skeleton } from '@/components/ui/skeleton';

export function PokemonInfoSkeleton() {
  return (
    <div className='mt-6 bg-white dark:bg-gray-950 rounded-md shadow-md p-6'>
      <div className='flex flex-col space-y-3'>
        <Skeleton className='h-4 w-full' />
        <div className='flex flex-col xs:flex-row justify-around items-center'>
          <Skeleton className='h-40 w-40 rounded-full mb-2 xs:mb-0' />
          <Skeleton className='h-[250px] w-full xs:w-[60%] rounded-xl' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
        </div>
      </div>
    </div>
  );
}
