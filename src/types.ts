export interface Product {
  id: string;
  name: string;
  category: "Necklaces" | "Earrings" | "Rings" | "Bracelets" | "Custom Pieces";
  price: number;
  description: string;
  image: string;
  materials: string[];
  dimensions: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface CustomInquiry {
  name: string;
  email: string;
  phone: string;
  pieceType: string;
  materialPreference: string;
  budget: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}
