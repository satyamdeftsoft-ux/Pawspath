
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Calendar, ChevronRight, Dog, Cat, Heart, Star, Search } from 'lucide-react';
import { PetListing } from '../types';
import { MOCK_LISTINGS } from '../constants';

interface ListingCardProps {
  listing: PetListing;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, isFavorited, onToggleFavorite }) => (
  <div className="card-3d-wrap group">
    <div className="card-3d bg-white rounded-[2.5rem] border border-[#E6E0D8] overflow-hidden hover:shadow-2xl hover:shadow-[#0B1020]/5 transition-all flex flex-col md:flex-row relative">
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite(listing.id);
        }}
        className={`absolute top-6 right-6 z-20 w-11 h-11 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-90 ${isFavorited ? 'bg-[#C86B4A] text-[#F7F1E8] shadow-lg shadow-[#C86B4A]/30' : 'bg-white/90 text-[#2A3346] opacity-40 hover:opacity-100 shadow-sm'}`}
      >
        <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
      </button>

      <div className="md:w-72 h-64 md:h-auto relative overflow-hidden">
        <img src={listing.image} alt={listing.petName} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.2s]" />
        <div className="absolute bottom-6 left-6">
          <span className="bg-[#0B1020]/80 backdrop-blur text-white px-4 py-2 rounded-xl text-small font-bold flex items-center gap-2">
            {listing.petType === 'Dog' ? <Dog className="w-4 h-4" /> : <Cat className="w-4 h-4" />}
            {listing.petType}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-8 lg:p-10 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="pr-12">
            <h3 className="text-h4 mb-2 group-hover:text-[#C86B4A] transition-colors">{listing.petName}’s first class journey</h3>
            <p className="text-body text-[#2A3346] opacity-60 line-clamp-2">{listing.description}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-[#2A3346] opacity-40 uppercase tracking-widest font-bold mb-1">Est. Budget</p>
            <p className="text-2xl font-serif font-bold text-[#6B8F71]">${listing.budget}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#F7F1E8] flex items-center justify-center text-[#C86B4A] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-[#2A3346] opacity-40 uppercase font-bold tracking-widest mb-0.5">Route</p>
              <p className="text-body font-bold truncate max-w-[120px]">{listing.origin.split(',')[0]} to {listing.destination.split(',')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#F7F1E8] flex items-center justify-center text-[#C86B4A] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-[#2A3346] opacity-40 uppercase font-bold tracking-widest mb-0.5">Pickup</p>
              <p className="text-body font-bold">{listing.date}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-8 border-t border-[#E6E0D8] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-lg border-2 border-white bg-[#E6E0D8] overflow-hidden shadow-sm">
                  <img src={`https://picsum.photos/seed/bid${listing.id}${i}/50/50`} alt="Bidder" />
                </div>
              ))}
            </div>
            <p className="text-small font-bold text-[#2A3346] opacity-40 uppercase tracking-widest">{listing.bidCount} active bids</p>
          </div>
          <Link to={`/listing/${listing.id}`} className="bg-[#0B1020] text-[#F7F1E8] px-8 py-3 rounded-xl font-bold text-body hover:bg-[#C86B4A] transition-all flex items-center gap-2 shadow-xl shadow-[#0B1020]/10">
            View details <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default function Marketplace({ favorites, toggleFavorite }: { favorites: string[], toggleFavorite: (id: string) => void }) {
  const [filter, setFilter] = useState('All');

  return (
    <div className="min-h-screen bg-[#F7F1E8] pb-32">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <nav className="text-small font-bold uppercase tracking-widest text-[#C86B4A]">Marketplace / Active listings</nav>
            <h1 className="text-h2 text-[#0B1020]">Find premium <span className="text-[#C86B4A]">listings</span>.</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex bg-white p-2 rounded-2xl border border-[#E6E0D8] shadow-sm">
              {['All', 'Dogs', 'Cats', 'Birds'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-3 rounded-xl text-small font-bold transition-all uppercase tracking-widest ${filter === f ? 'bg-[#C86B4A] text-[#F7F1E8] shadow-lg shadow-[#C86B4A]/20' : 'text-[#2A3346] opacity-40 hover:opacity-100'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-3 bg-white px-8 py-4 rounded-xl border border-[#E6E0D8] font-bold text-small uppercase tracking-widest shadow-sm hover:border-[#C86B4A] hover:text-[#C86B4A] transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16">
          <aside className="lg:col-span-3 space-y-12">
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#E6E0D8] shadow-sm sticky top-28">
              <h3 className="text-h4 mb-8 flex items-center gap-3">
                <Search className="w-5 h-5 text-[#C86B4A]" /> Route search
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-small font-bold uppercase text-[#2A3346] opacity-40 tracking-widest mb-2.5 block">From location</label>
                  <input type="text" placeholder="Enter city..." className="w-full bg-[#F7F1E8] border-none rounded-xl px-5 py-4 text-body font-semibold focus:ring-2 focus:ring-[#C86B4A]" />
                </div>
                <div>
                  <label className="text-small font-bold uppercase text-[#2A3346] opacity-40 tracking-widest mb-2.5 block">To location</label>
                  <input type="text" placeholder="Enter city..." className="w-full bg-[#F7F1E8] border-none rounded-xl px-5 py-4 text-body font-semibold focus:ring-2 focus:ring-[#C86B4A]" />
                </div>
                <button className="btn-primary w-full py-5 rounded-2xl text-body shadow-xl shadow-[#C86B4A]/10 mt-4">
                  Update search
                </button>
              </div>
            </div>
            
            <div className="bg-[#C86B4A] p-10 rounded-[2.5rem] text-[#F7F1E8] shadow-2xl shadow-[#C86B4A]/20 floating">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <h4 className="text-h4 mb-4">Pro driver tip</h4>
              <p className="text-body text-[#F7F1E8] opacity-80 leading-relaxed font-medium">
                Add multiple clear photos of your pet and crate to build trust faster with top drivers.
              </p>
            </div>
          </aside>

          <main className="lg:col-span-9">
            <div className="flex items-center justify-between mb-12">
              <p className="text-body font-medium text-[#2A3346] opacity-50">Showing <span className="text-[#0B1020] font-bold">{MOCK_LISTINGS.length}</span> verified journeys</p>
              <div className="flex items-center gap-3">
                <span className="text-small text-[#2A3346] opacity-40 font-bold uppercase tracking-widest">Sort by:</span>
                <select className="bg-transparent border-none text-body font-bold text-[#0B1020] focus:ring-0 cursor-pointer">
                  <option>Newest first</option>
                  <option>Budget: high to low</option>
                  <option>Distance</option>
                </select>
              </div>
            </div>

            <div className="space-y-10">
              {MOCK_LISTINGS.map(listing => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  isFavorited={favorites.includes(listing.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            <div className="mt-20 text-center">
              <button className="bg-white border-2 border-[#E6E0D8] px-14 py-5 rounded-2xl font-bold text-small uppercase tracking-widest hover:border-[#C86B4A] hover:text-[#C86B4A] transition-all shadow-sm">
                Load more listings
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
