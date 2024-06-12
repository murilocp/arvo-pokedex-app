import Image from 'next/image';
import PokemonInfo from '@/components/PokemonInfo';
import { Suspense } from 'react';
import SearchBar from '@/components/SearchBar';
import { PokemonInfoSkeleton } from '@/components/PokemonInfoSkeleton';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    name?: string;
  };
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-[#E3350D] text-white py-4 px-6'>
        <h1 className='text-2xl font-bold flex'>
          My Pokédex{' '}
          <Image
            src='/types/pokeballs.png'
            width={30}
            height={30}
            alt='Pokemon'
            className='ml-3'
          />
        </h1>
      </header>
      <main className='flex-1 bg-gray-100 dark:bg-gray-800 px-2 pt-4 xs:px-6 xs:py-6'>
        <div className='max-w-2xl mx-auto'>
          <SearchBar />
          <Suspense key={searchParams?.name} fallback={<PokemonInfoSkeleton />}>
            <PokemonInfo name={searchParams?.name || ''} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
