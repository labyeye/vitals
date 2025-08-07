export interface Hero {
  _id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: {
    url: string;
    alt: string;
  };
  ctaButton: {
    text: string;
    link: string;
    enabled: boolean;
  };
  backgroundColor?: string;
  textColor?: string;
  animationDuration?: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class HeroService {
  private baseURL = 'http://localhost:3500/api/heroes';

  async getActiveHeroes(): Promise<Hero[]> {
    try {
      const response = await fetch(this.baseURL);

      if (!response.ok) {
        throw new Error('Failed to fetch heroes');
      }

      const data = await response.json();
      return data.data.heroes;
    } catch (error) {
      console.error('Error fetching heroes:', error);
      throw error;
    }
  }
}

export default new HeroService();
