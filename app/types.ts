export interface Player {
  id: number;
  name: string;
}

export interface Statistic {
  description: string;
  player: string;
  count: number;
}

export interface Category {
  type: string;
  name: string;
  description: string;
}
