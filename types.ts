
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  TRANSPORTER = 'TRANSPORTER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  rating?: number;
  reviewCount?: number;
  isVerified: boolean;
  location?: string;
  bio?: string;
}

export interface PetListing {
  id: string;
  customerId: string;
  petName: string;
  petType: 'Dog' | 'Cat' | 'Bird' | 'Exotic';
  origin: string;
  destination: string;
  date: string;
  budget?: number;
  description: string;
  status: 'OPEN' | 'PENDING_PAYMENT' | 'ACTIVE' | 'COMPLETED';
  bidCount: number;
  // Added image property to match mock data and component usage
  image: string;
}

export interface Bid {
  id: string;
  transporterId: string;
  transporterName: string;
  transporterAvatar: string;
  amount: number;
  estimatedArrival: string;
  message: string;
  rating: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isFlagged?: boolean;
}
