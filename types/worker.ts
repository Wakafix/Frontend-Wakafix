export type Worker = {
  id: string;
  name: string;
  skill: string;
  location: string;
  priceRange: string;
  rating: number;
  available: boolean;
  profileImage: string;
  aiRecommended?: boolean; // Optional field for AI recommendations
};