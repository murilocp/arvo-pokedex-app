import { capitalize } from '@/helpers';
import { PokemonAPIResponse, PokemonInfoResponse } from '@/types/pokemon';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { pokemonName: string } },
) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (res.status === 404) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const data = (await res.json()) as PokemonAPIResponse;

  const returnData: PokemonInfoResponse = {
    id: data.id,
    height: data.height / 10,
    weight: data.weight / 10,
    name: capitalize(data.name),
    abilities: data.abilities.map(item => capitalize(item.ability.name)),
    types: data.types.map(typeItem => capitalize(typeItem.type.name)),
    image: data.sprites.other.dream_world.front_default,
    stats: data.stats.map(stat => ({
      label: capitalize(stat.stat.name),
      value: stat.base_stat,
    })),
  };

  console.log({ returnData });

  return NextResponse.json({ ok: true, data: returnData });
}
