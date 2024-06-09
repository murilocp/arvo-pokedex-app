type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type PokemonType = {
  slot: number;
  type: { name: string };
};

type PokemonAbility = {
  slot: number;
  ability: { name: string };
};

export interface PokemonAPIResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      dream_world: { front_default: string };
    };
  };
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
}

export interface PokemonInfoResponse {
  id: number;
  name: string;
  image: string;
  weight: number;
  height: number;
  abilities: string[];
  types: string[];
  stats: {
    label: string;
    value: number;
  }[];
}
