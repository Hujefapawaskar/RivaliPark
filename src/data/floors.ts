export interface FloorData {
  level: number;
  name: string;
  type: string;
  area: string;
  price: string;
  status: 'Available' | 'Sold' | 'Reserved';
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  layoutId: string;
  pdfPage: number;
}

export const buildingFloors: FloorData[] = Array.from({ length: 15 }, (_, i) => {
  const level = i;
  if (level === 0) {
    return {
      level,
      name: 'Ground Floor',
      type: 'Commercial / Lobby',
      area: '8,500 sqft',
      price: 'N/A',
      status: 'Reserved' as const,
      description: 'Grand lobby, concierge desk, and premium retail spaces.',
      layoutId: 'l_lobby',
      pdfPage: 4,
    };
  }
  if (level === 14) {
    return {
      level,
      name: 'Penthouse',
      type: 'Luxury Penthouse',
      area: '4,500 sqft',
      price: '$8,200,000',
      status: 'Available' as const,
      bedrooms: 5,
      bathrooms: 5.5,
      description: 'Exclusive penthouse with panoramic city views, private pool, and expansive terrace.',
      layoutId: 'l_penthouse',
      pdfPage: 1,
    };
  }
  if (level >= 10) {
    return {
      level,
      name: `Floor ${level}`,
      type: 'Premium Residence',
      area: '2,800 sqft',
      price: `$${(2.5 + level * 0.15).toFixed(1)}M`,
      status: (Math.random() > 0.5 ? 'Available' : 'Sold') as 'Available' | 'Sold',
      bedrooms: 3,
      bathrooms: 3.5,
      description: 'Spacious premium apartment with upgraded finishes, smart home features, and high ceilings.',
      layoutId: 'l_premium',
      pdfPage: 2,
    };
  }
  return {
    level,
    name: `Floor ${level}`,
    type: 'Standard Residence',
    area: '1,800 sqft',
    price: `$${(1.2 + level * 0.08).toFixed(2)}M`,
    status: (Math.random() > 0.3 ? 'Available' : 'Reserved') as 'Available' | 'Reserved',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Modern open-concept living space with floor-to-ceiling windows and designer kitchen.',
    layoutId: 'l_standard',
    pdfPage: 3,
  };
}).reverse(); // Reverse so top floor is first in the array for rendering top-to-bottom
