export type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  bid?: string;
  image: string;
};

export const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Dubai",
    price: "$900,000",
    bid: "$950,000",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
];