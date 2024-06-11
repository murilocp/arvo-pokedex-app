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
