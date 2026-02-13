
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck, DollarSign, Star, Clock, AlertCircle, ChevronRight, MapPin, Heart, Trash2, Dog, Cat } from 'lucide-react';
import { User } from '../types';
import { MOCK_LISTINGS } from '../constants';

const data = [
  { name: 'Mon', bids: 4, earnings: 400 },
  { name: 'Tue', bids: 7, earnings: 800 },
  { name: 'Wed', bids: 5, earnings: 600 },
  { name: 'Thu', bids: 8, earnings: 1100 },
  { name: 'Fri', bids: 12, earnings: 1400 },
  { name: 'Sat', bids: 10, earnings: 1000 },
  { name: 'Sun', bids: 6, earnings: 700 },
];

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white`} style={{ backgroundColor: color }}>
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <h3 className="text-2xl font-display font-bold text-slate-900">{value}</h3>
    </div>
  </div>
);

export default function TransporterDashboard({ user, favorites, toggleFavorite }: { user: User | null, favorites: string[], toggleFavorite: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<'stats' | 'saved'>('stats');
  
  const savedListings = MOCK_LISTINGS.filter(l => favorites.includes(l.id));

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-bold text-[#0B1020]">Driver <span className="text-[#C86B4A]">Dashboard</span></h1>
            <p className="text-slate-500 font-medium">Welcome back{user?.name ? `, ${user.name}` : ''}. Here's your weekly performance.</p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm self-start md:self-auto">
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-[#0B1020] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'saved' ? 'bg-[#C86B4A] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Heart className={`w-3.5 h-3.5 ${activeTab === 'saved' ? 'fill-current' : ''}`} /> Saved ({favorites.length})
            </button>
          </div>
        </header>

        {activeTab === 'stats' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={DollarSign} label="Total Earnings" value="$4,820" color="#6B8F71" />
              <StatCard icon={Truck} label="Active Trips" value="3" color="#C86B4A" />
              <StatCard icon={Clock} label="Pending Bids" value="12" color="#0B1020" />
              <StatCard icon={Star} label="Avg Rating" value="4.9" color="#E6E0D8" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-display font-bold text-xl text-[#0B1020]">Earnings Insights</h3>
                    <select className="bg-slate-50 border-none rounded-lg text-[10px] font-bold uppercase tracking-widest p-2 focus:ring-2 focus:ring-[#C86B4A]">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C86B4A" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#C86B4A" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="earnings" stroke="#C86B4A" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h3 className="font-display font-bold text-xl mb-8 text-[#0B1020]">Active Bid Status</h3>
                  <div className="space-y-4">
                    {[
                      { id: '1', pet: 'Max', route: 'NY to SF', bid: '$850', status: 'Leading' },
                      { id: '2', pet: 'Daisy', route: 'TX to WA', bid: '$1200', status: 'Outbid' },
                      { id: '3', pet: 'Cooper', route: 'FL to GA', bid: '$300', status: 'Won' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-[#C86B4A]/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#C86B4A] font-bold shadow-sm">
                            {item.pet[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#0B1020]">{item.pet}'s Journey</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {item.route}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8 md:gap-12">
                          <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-[#0B1020]">{item.bid}</p>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Your Bid</p>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.status === 'Won' ? 'bg-green-100 text-green-600' : item.status === 'Outbid' ? 'bg-red-100 text-red-600' : 'bg-[#C86B4A]/10 text-[#C86B4A]'}`}>
                            {item.status}
                          </span>
                          <button className="p-2 bg-white rounded-lg border border-slate-100 hover:text-[#C86B4A] transition-colors shadow-sm">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="space-y-8">
                <div className="bg-[#C86B4A] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#C86B4A]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <h3 className="font-display font-bold text-xl mb-4 relative z-10">Subscription Plan</h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-6 relative z-10">You are currently on the <span className="font-bold text-white">Professional Plan</span>.</p>
                  <div className="space-y-3 mb-8 relative z-10">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span>Monthly Bids</span>
                      <span>Unlimited</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="w-full h-full bg-white rounded-full"></div>
                    </div>
                  </div>
                  <button className="w-full bg-[#0B1020] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all relative z-10">Manage Billing</button>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2 text-[#0B1020]">
                    <AlertCircle className="w-5 h-5 text-[#C86B4A]" /> Notifications
                  </h3>
                  <div className="space-y-6">
                    {[
                      "Someone outbid you on Luna's SF trip.",
                      "New trip request matched your route preference.",
                      "Review received from Sarah Mitchell."
                    ].map((note, i) => (
                      <div key={i} className="flex gap-4 text-sm pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="w-2 h-2 rounded-full bg-[#C86B4A] mt-1.5 shrink-0"></div>
                        <p className="text-slate-600 font-medium">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {savedListings.length > 0 ? (
              savedListings.map(listing => (
                <div key={listing.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 relative overflow-hidden">
                  <div className="md:w-32 h-32 md:h-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={`https://picsum.photos/seed/${listing.petName}/300/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={listing.petName} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-[#0B1020]">{listing.petName}'s Journey</h4>
                        <span className="text-sm font-bold text-[#6B8F71]">${listing.budget}</span>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C86B4A]" /> {listing.origin} → {listing.destination}
                      </p>
                      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed font-medium">{listing.description}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <Link to={`/listing/${listing.id}`} className="bg-[#0B1020] text-white px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                         Place Bid <ChevronRight className="w-3 h-3" />
                      </Link>
                      <button 
                        onClick={() => toggleFavorite(listing.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 bg-[#C86B4A]/10 flex items-center justify-center rounded-bl-[2rem]">
                     {listing.petType === 'Dog' ? <Dog className="w-4 h-4 text-[#C86B4A]" /> : <Cat className="w-4 h-4 text-[#C86B4A]" />}
                  </div>
                </div>
              ))
            ) : (
              <div className="lg:col-span-2 text-center py-20 bg-white rounded-[4rem] border border-dashed border-slate-200">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Heart className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-display font-bold text-[#0B1020] mb-2">No Saved Listings</h3>
                 <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Items you heart in the marketplace will appear here for quick access later.</p>
                 <Link to="/marketplace" className="bg-[#C86B4A] text-white px-10 py-4 rounded-full font-bold hover:bg-[#B37A5C] transition-all inline-block shadow-lg shadow-[#C86B4A]/20">
                    Browse Marketplace
                 </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
