import React from 'react';
import Image from 'next/image';

import InfoItem from './InfoItem';
import StatBar from './StatBar';
import { PokemonInfoResponse } from '@/types/pokemon';
import { PokemonInfoSkeleton } from './PokemonInfoSkeleton';

interface PokemonInfoProps {
  name?: string;
}

export default async function PokemonInfo({ name }: PokemonInfoProps) {
  if (name === '')
    return (
      <div className='mt-6 bg-white dark:bg-gray-950 rounded-md shadow-md p-6'>
        <h2>Enter the name of a Pokémon to search for!</h2>
      </div>
    );

  const response = await fetch(`${process.env.BFF_URL}pokemon/${name}`, {
    next: { revalidate: 0 },
  });

  if (response.status === 404)
    return (
      <div className='mt-6 bg-white dark:bg-gray-950 rounded-md shadow-md p-6'>
        <h2>No Pokémon found! Please, try again.</h2>
      </div>
    );

  const data = (await response.json()) as PokemonInfoResponse;

  return data ? (
    <div className='mt-6 bg-white dark:bg-gray-950 rounded-md shadow-md p-3 xs:p-6'>
      <div>
        <h2 className='text-4xl font-bold text-center text-gray-900 dark:text-gray-50'>
          {data.name}
        </h2>
        <div className='mb-4 text-center'>Nº {data.id}</div>
      </div>
      <div className='flex flex-col xs:flex-row items-center justify-between'>
        <div className='w-full h-full mb-6 xs:mb-0 xs:max-w-[40%] flex justify-center'>
          <Image
            src={data.image}
            width={200}
            height={300}
            alt='Pokemon Image'
          />
        </div>

        <div className='rounded-xl xs:ml-6 h-full w-full px-6 py-4 bg-[#DFDFDF] xs:max-w-[60%]'>
          <ul className='grid grid-cols-2 mb-4'>
            <InfoItem label='Height'>{data.height} m</InfoItem>
            <InfoItem label='Weight'>{data.weight} Kg</InfoItem>
            <InfoItem label='Abilities'>
              {data.abilities?.map(ability => (
                <p key={ability}>{ability}</p>
              ))}
            </InfoItem>
          </ul>
          <div className='types'>
            <p className='mb-1 text-xl font-bold'>Types</p>
            <ul className='flex'>
              {data.types?.map(type => (
                <li key={type} className='mr-1'>
                  <Image
                    src={`/types/${type}.png`}
                    alt='electric type'
                    width={100}
                    height={50}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='mt-6 max-w-[90%] mx-auto rounded-lg'>
        <h3 className='text-2xl mb-4 font-bold text-gray-900 dark:text-gray-50'>
          Stats
        </h3>

        <ul>
          {data.stats?.map(stat => (
            <li key={stat.label} className='mb-2'>
              <StatBar label={stat.label} value={stat.value} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <PokemonInfoSkeleton />
  );
}
