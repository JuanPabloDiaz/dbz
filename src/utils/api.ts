import type { Character, Planet, Transformation, ApiResponse, ApiParams } from '../types/api';

const BASE_URL = 'https://dragonball-api.com/api';

class DragonBallApi {
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  // Characters
  async getAllCharacters(params?: ApiParams): Promise<ApiResponse<Character>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.name) searchParams.append('name', params.name);
    if (params?.race) searchParams.append('race', params.race);
    if (params?.gender) searchParams.append('gender', params.gender);
    if (params?.affiliation) searchParams.append('affiliation', params.affiliation);

    const queryString = searchParams.toString();
    const endpoint = `/characters${queryString ? `?${queryString}` : ''}`;

    return this.fetchData<ApiResponse<Character>>(endpoint);
  }

  async getCharacterById(id: number): Promise<Character> {
    return this.fetchData<Character>(`/characters/${id}`);
  }

  // Planets
  async getAllPlanets(params?: ApiParams): Promise<ApiResponse<Planet>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.name) searchParams.append('name', params.name);

    const queryString = searchParams.toString();
    const endpoint = `/planets${queryString ? `?${queryString}` : ''}`;

    return this.fetchData<ApiResponse<Planet>>(endpoint);
  }

  async getPlanetById(id: number): Promise<Planet> {
    return this.fetchData<Planet>(`/planets/${id}`);
  }

  // Transformations
  async getAllTransformations(params?: ApiParams): Promise<ApiResponse<Transformation>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.name) searchParams.append('name', params.name);

    const queryString = searchParams.toString();
    const endpoint = `/transformations${queryString ? `?${queryString}` : ''}`;

    return this.fetchData<ApiResponse<Transformation>>(endpoint);
  }

  async getTransformationById(id: number): Promise<Transformation> {
    return this.fetchData<Transformation>(`/transformations/${id}`);
  }
}

export const dragonBallApi = new DragonBallApi();
