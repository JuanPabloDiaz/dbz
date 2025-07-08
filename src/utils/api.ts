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

    // The transformations API returns a direct array, not an ApiResponse structure
    const transformationsArray = await this.fetchData<Transformation[]>(endpoint);
    
    // Apply client-side filtering and pagination since the API doesn't support it
    let filteredTransformations = transformationsArray;
    
    // Apply name filter if provided
    if (params?.name) {
      filteredTransformations = transformationsArray.filter(transformation =>
        transformation.name.toLowerCase().includes(params.name!.toLowerCase())
      );
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTransformations = filteredTransformations.slice(startIndex, endIndex);
    
    // Create ApiResponse structure for compatibility
    const totalItems = filteredTransformations.length;
    const totalPages = Math.ceil(totalItems / limit);
    
    return {
      items: paginatedTransformations,
      meta: {
        totalItems,
        itemCount: paginatedTransformations.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
      links: {
        first: `/transformations?page=1&limit=${limit}`,
        last: `/transformations?page=${totalPages}&limit=${limit}`,
        ...(page > 1 && { previous: `/transformations?page=${page - 1}&limit=${limit}` }),
        ...(page < totalPages && { next: `/transformations?page=${page + 1}&limit=${limit}` }),
      },
    };
  }

  async getTransformationById(id: number): Promise<Transformation> {
    return this.fetchData<Transformation>(`/transformations/${id}`);
  }
}

export const dragonBallApi = new DragonBallApi();
