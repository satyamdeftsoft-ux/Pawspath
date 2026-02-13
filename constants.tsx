
import React from 'react';
import { PetListing } from './types';

export const COLORS = {
  midnight: '#0B1020',
  cream: '#F7F1E8',
  clay: '#C86B4A',
  sage: '#6B8F71',
  slate: '#2A3346',
  fog: '#E6E0D8',
};

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200",
  passion: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800",
  dog1: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=600",
  cat1: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
  dog2: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600",
  cat2: "https://images.unsplash.com/photo-1573865668131-974279243b5a?auto=format&fit=crop&q=80&w=600",
  travel: "https://images.unsplash.com/photo-1591306399172-4d1c2f65c7d7?auto=format&fit=crop&q=80&w=1200",
  categoryPet: "https://images.unsplash.com/photo-1527362950785-f487a7c1fe48?auto=format&fit=crop&q=80&w=800",
  categoryDog: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
  categoryCat: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800"
};

export const BRAND_ASSETS = {
  logo: (className?: string) => (
    <div className={`flex items-center gap-3 font-sans font-extrabold text-xl tracking-tight ${className || 'text-[#0B1020]'}`}>
      <div className="w-9 h-9 rounded-xl bg-[#C86B4A] flex items-center justify-center text-[#F7F1E8] rotate-2 shadow-lg shadow-[#C86B4A]/20">
        <span className="italic transform -rotate-2">P</span>
      </div>
      <span>Paws<span className="text-[#C86B4A]">Path</span></span>
    </div>
  ),
};

export const MOCK_SHIPMENTS = [
  { id: 1, pet: "Vizsla", to: "Northbrook, IL", miles: 840, price: 620, img: IMAGES.dog1 },
  { id: 2, pet: "Min Pin", to: "Apopka, FL", miles: 1240, price: 890, img: IMAGES.dog2 },
  { id: 3, pet: "American Longhair", to: "Tularosa, NM", miles: 450, price: 340, img: IMAGES.cat1 },
];

export const MOCK_TRANSPORTERS = [
  { 
    id: 't1', 
    name: 'Sarah Mitchell', 
    business: 'Mitchell Pet Logistics', 
    rating: 4.9, 
    trips: 124, 
    quote: "I treat every traveler as if they were my own. Safety is non-negotiable.",
    avatar: 'https://picsum.photos/seed/sarah/200'
  },
  { 
    id: 't2', 
    name: 'James Rodriguez', 
    business: 'Coastal Pet Express', 
    rating: 5.0, 
    trips: 89, 
    quote: "Specializing in anxious pets. We find the calmest routes for a peaceful journey.",
    avatar: 'https://picsum.photos/seed/james/200'
  },
  { 
    id: 't3', 
    name: 'Wanda Chen', 
    business: 'PawsFirst Transport', 
    rating: 4.8, 
    trips: 215, 
    quote: "Cross-country experts with over 15 years of animal handling experience.",
    avatar: 'https://picsum.photos/seed/wanda/200'
  },
];

export const MOCK_LISTINGS: PetListing[] = [
  {
    id: 'l1',
    customerId: 'c1',
    petName: 'Luna',
    petType: 'Dog',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    date: 'Dec 15, 2024',
    budget: 850,
    description: 'Sweet Golden Retriever needs a gentle ride across the country. She\'s very friendly and loves car rides.',
    status: 'OPEN',
    bidCount: 4,
    image: IMAGES.dog1
  },
  {
    id: 'l2',
    customerId: 'c2',
    petName: 'Oliver',
    petType: 'Cat',
    origin: 'Austin, TX',
    destination: 'Chicago, IL',
    date: 'Jan 5, 2025',
    budget: 400,
    description: 'Anxious indoor cat. Requires quiet environment and AC.',
    status: 'OPEN',
    bidCount: 2,
    image: IMAGES.cat1
  },
  {
    id: 'l3',
    customerId: 'c3',
    petName: 'Bella',
    petType: 'Dog',
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    date: 'Dec 20, 2024',
    budget: 300,
    description: 'Short trip for a senior pug. No special medical needs.',
    status: 'OPEN',
    bidCount: 7,
    image: IMAGES.dog2
  }
];
