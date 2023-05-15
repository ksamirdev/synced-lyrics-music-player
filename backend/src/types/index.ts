export interface Color {
  type: string;
  value: number[] | null;
}

export interface Music {
  id: string;
  name: string;
  thumbnail: string;
  color?: Color[];
}
