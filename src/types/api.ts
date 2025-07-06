export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt?: string | null;
  originPlanet?: Planet;
  transformations?: Transformation[];
}

export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt?: string | null;
  characters?: Character[];
}

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt?: string | null;
}

export interface ApiResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous?: string;
    next?: string;
    last: string;
  };
}

export interface ApiParams {
  page?: number;
  limit?: number;
  name?: string;
  race?: string;
  gender?: string;
  affiliation?: string;
}
