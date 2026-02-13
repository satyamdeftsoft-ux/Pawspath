
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, ShieldCheck, Star, MessageCircle, DollarSign, Clock, Info, CheckCircle, Lock, Heart, Plus, PhoneCall, Sparkles } from 'lucide-react';
import { User, Bid } from '../types';
import { GoogleGenAI } from "@google/genai";

/**
 * Enhanced component that generates unique AI-powered block avatars 
 * if the provided source is missing or fails to load.
 */
const TransporterAvatar = ({ src, name }: { src?: string; name: string }) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiFailed, setAiFailed] = useState(false);
  const [hasAttemptedAi, setHasAttemptedAi] = useState(false);

  // Colors for the ultimate fallback if AI fails
  const fallbackColors = ['#C86B4A', '#6B8F71', '#0B1020', '#2A3346'];
  const getFallbackColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return fallbackColors[Math.abs(hash) % fallbackColors.length];
  };

  const generateAiAvatar = async () => {
    if (hasAttemptedAi || isAiGenerating) return;
    
    setIsAiGenerating(true);
    setHasAttemptedAi(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ 
            text: `Create a unique, minimalist, professional abstract geometric block avatar for a pet transporter named "${name}". 
            Style: high-end, clean, premium. 
            Palette: Use exactly these brand colors: Midnight Blue (#0B1020), Warm Clay (#C86B4A), and Sage Green (#6B8F71). 
            Composition: Abstract geometric shapes, sharp lines, modern aesthetic. 1:1 aspect ratio.` 
          }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          setCurrentSrc(`data:image/png;base64,${part.inlineData.data}`);
          setIsAiGenerating(false);
          return;
        }
      }
      throw new Error("No image data returned");
    } catch (error) {
      console.error("Gemini AI Avatar generation failed:", error);
      setAiFailed(true);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // If initial src is missing, trigger AI immediately
  useEffect(() => {
    if (!src) {
      generateAiAvatar();
    }
  }, [src]);

  const handleImgError = () => {
    // If the primary image fails and we haven't tried AI yet, try AI
    if (!hasAttemptedAi) {
      generateAiAvatar();
    } else {
      // If AI image also fails, show fallback initials
      setAiFailed(true);
    }
  };

  // 1. Loading State (AI Generation in progress)
  if (isAiGenerating) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#F7F1E8]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#C86B4A] to-[#6B8F71] animate-pulse opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#C86B4A] animate-spin duration-3000" />
        </div>
      </div>
    );
  }

  // 2. Fallback State (AI failed or initials fallback)
  if (aiFailed || (!currentSrc && hasAttemptedAi)) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-white font-bold uppercase select-none transition-all duration-700"
        style={{ backgroundColor: getFallbackColor(name), fontSize: '1.5rem' }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  // 3. Render Image (Original or AI-generated)
  return (
    <img
      src={currentSrc}
      alt={name}
      className={`w-full h-full object-cover transition-opacity duration-1000 ${currentSrc ? 'opacity-100' : 'opacity-0'}`}
      onError={handleImgError}
    />
  );
};

const INITIAL_BIDS: Bid[] = [
  {
    id: 'b1',
    transporterId: 't1',
    transporterName: 'Express Pet Movers',
    transporterAvatar: 'https://picsum.photos/seed/express/100',
    amount: 650,
    estimatedArrival: 'Dec 18, 2024',
    message: "We specialize in cross-country trips. Your pet stays in the cabin with AC at all times. Professional vet tech on board.",
    rating: 4.8
  },
  {
    id: 'b2',
    transporterId: 't2',
    transporterName: 'David J.',
    transporterAvatar: 'https://picsum.photos/seed/david/100',
    amount: 500,
    estimatedArrival: 'Dec 16, 2024',
    message: "Driving that route anyway! I'm a dog lover with 10 years of experience. Fully insured and bonded.",
    rating: 5.0
  },
  {
    id: 'b3',
    transporterId: 't3',
    transporterName: 'Reliable Roads',
    transporterAvatar: '', // Missing URL triggers AI generation
    amount: 540,
    estimatedArrival: 'Dec 17, 2024',
    message: "Clean, reliable, and prompt. I've been transporting pets since 2012. Competitive rates for mid-west routes.",
    rating: 4.5
  }
];

const NEW_BID_POOL: Partial<Bid>[] = [
  {
    transporterName: 'Sarah’s Safe Travels',
    transporterAvatar: 'https://picsum.photos/seed/sarah/100',
    amount: 580,
    message: "I'm passing through NY on Tuesday. I have a specialized pet van with individual climate control. I can offer door-to-door service.",
    rating: 4.9
  },
  {
    transporterName: 'Global Pet Transit',
    transporterAvatar: 'https://picsum.photos/seed/global/100',
    amount: 720,
    message: "Premium service for your Golden Retriever. We provide hourly photo updates and a dedicated handler for the entire trip.",
    rating: 4.7
  },
  {
    transporterName: 'Anonymous Specialist',
    transporterAvatar: 'https://invalid-url-testing.com/not-found.png', // Invalid URL triggers AI generation after failure
    amount: 450,
    message: "Affordable and reliable. I've moved over 50 dogs this year alone. Check out my recent reviews for this specific route!",
    rating: 4.6
  }
];

export default function ListingDetail({ user, isFavorited, toggleFavorite }: { user: User | null, isFavorited: (id: string | undefined) => boolean, toggleFavorite: (id: string) => void }) {
  const { id } = useParams();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);
  const [bidCountPulse, setBidCountPulse] = useState(false);
  const [isListingFeePaid, setIsListingFeePaid] = useState(false);

  const simulateNewBid = () => {
    const randomTemplate = NEW_BID_POOL[Math.floor(Math.random() * NEW_BID_POOL.length)];
    const newBid: Bid = {
      id: 'b-new-' + Date.now(),
      transporterId: 't-new-' + Date.now(),
      transporterName: randomTemplate.transporterName || 'New Transporter',
      transporterAvatar: randomTemplate.transporterAvatar || '',
      amount: randomTemplate.amount || 600,
      estimatedArrival: 'Dec 20, 2024',
      message: randomTemplate.message || 'I would love to transport your pet.',
      rating: randomTemplate.rating || 4.5
    };

    setBids(prev => [newBid, ...prev]);
    setBidCountPulse(true);
    setTimeout(() => setBidCountPulse(false), 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      simulateNewBid();
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectBid = (bid: Bid) => {
    setSelectedBid(bid);
    setShowPayment(true);
  };

  const handleConfirmPayment = () => {
    // Simulate successful payment
    setIsListingFeePaid(true);
    setShowPayment(false);
  };

  const activeFavorited = isFavorited(id);

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      {/* Listing Header */}
      <section className="bg-white border-b border-[#E6E0D8] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:w-96 aspect-square rounded-[3rem] overflow-hidden border-8 border-[#F7F1E8] shadow-inner relative group">
              <img src="https://picsum.photos/seed/Luna/800" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt="Pet" />
              <button 
                onClick={() => id && toggleFavorite(id)}
                className={`absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl z-20 ${activeFavorited ? 'bg-[#C86B4A] text-[#F7F1E8]' : 'bg-white/90 text-[#2A3346] opacity-40 hover:opacity-100 shadow-sm'}`}
              >
                <Heart className={`w-7 h-7 ${activeFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <span className="bg-[#6B8F71]/10 text-[#6B8F71] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">Active Request</span>
                   <span className="text-[#2A3346] opacity-40 text-small">Posted 2 hours ago</span>
                 </div>
                 <div className="hidden md:block">
                   <button 
                    onClick={simulateNewBid}
                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#C86B4A] hover:opacity-80 transition-opacity bg-[#C86B4A]/5 px-4 py-2 rounded-xl"
                   >
                     <Plus className="w-3 h-3" /> Simulate bid
                   </button>
                 </div>
              </div>
              <h1 className="text-h1 text-[#0B1020]">Luna's journey <span className="text-[#E6E0D8] font-serif font-light">#12934</span></h1>
              <div className="flex flex-wrap gap-10 text-[#2A3346]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] flex items-center justify-center text-[#C86B4A]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#2A3346] opacity-40 tracking-widest">From</p>
                    <p className="text-body font-bold">New York, NY</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] flex items-center justify-center text-[#2A3346]">
                    <MapPin className="w-5 h-5 opacity-40" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#2A3346] opacity-40 tracking-widest">To</p>
                    <p className="text-body font-bold">Los Angeles, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] flex items-center justify-center text-[#C86B4A]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#2A3346] opacity-40 tracking-widest">Pick up date</p>
                    <p className="text-body font-bold">Dec 15, 2024</p>
                  </div>
                </div>
              </div>
              <p className="text-body-l text-[#2A3346] opacity-70 leading-relaxed max-w-3xl">
                Sweet Golden Retriever needs a gentle ride across the country. She's 3 years old, very friendly, and loves car rides. We need someone who can provide regular walks and photo updates every 4 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bids Section */}
      <section className="section-padding max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-h2 text-[#0B1020]">Available bids</h2>
              <div className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white border border-[#E6E0D8] transition-all duration-500 ${bidCountPulse ? 'scale-110 border-[#C86B4A] shadow-xl shadow-[#C86B4A]/10' : ''}`}>
                <span className={`text-h3 text-[#C86B4A] transition-all ${bidCountPulse ? 'scale-125' : ''}`}>{bids.length}</span>
                <span className="text-small font-bold text-[#2A3346] opacity-40 uppercase tracking-widest">Total bids received</span>
              </div>
            </div>

            <div className="space-y-8">
              {bids.map((bid, index) => (
                <div 
                  key={bid.id} 
                  className={`bg-white p-8 lg:p-10 rounded-[2.5rem] border border-[#E6E0D8] hover:border-[#C86B4A]/30 transition-all flex flex-col md:flex-row gap-10 relative group ${index === 0 && bid.id.includes('new') ? 'animate-in fade-in slide-in-from-top-12 duration-1000' : ''}`}
                >
                  <div className="md:w-24 shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#E6E0D8] shadow-sm group-hover:scale-105 transition-transform bg-[#F7F1E8]">
                      <TransporterAvatar src={bid.transporterAvatar} name={bid.transporterName} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-h4 text-[#0B1020] group-hover:text-[#C86B4A] transition-colors">{bid.transporterName}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-[#C86B4A]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-body font-bold text-[#0B1020]">{bid.rating}</span>
                          </div>
                          <span className="text-small text-[#2A3346] opacity-30 font-bold ml-1">(48 reviews)</span>
                          <span className="w-1 h-1 rounded-full bg-[#E6E0D8] mx-1"></span>
                          <div className="flex items-center gap-1.5 text-blue-500">
                             <ShieldCheck className="w-4 h-4" />
                             <span className="text-[11px] font-bold uppercase tracking-widest">Verified pro</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-h3 text-[#6B8F71]">${bid.amount}</p>
                        <p className="text-[11px] font-bold text-[#2A3346] opacity-20 uppercase tracking-widest">All-inclusive bid</p>
                      </div>
                    </div>
                    <p className="text-body text-[#2A3346] opacity-60 leading-relaxed font-medium line-clamp-3">"{bid.message}"</p>
                    <div className="flex flex-wrap items-center gap-4 lg:gap-8 pt-8 border-t border-[#F7F1E8]">
                      
                      <div className="relative group/tooltip">
                        <Link 
                          to={isListingFeePaid ? `/messages/${bid.id}` : '#'} 
                          className={`flex items-center gap-2 text-small font-bold transition-all px-4 py-2 rounded-xl ${isListingFeePaid ? 'text-[#C86B4A] bg-[#C86B4A]/5 hover:bg-[#C86B4A]/10' : 'text-slate-300 bg-slate-50 cursor-not-allowed pointer-events-none'}`}
                        >
                          {isListingFeePaid ? <PhoneCall className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          Contact Transporter
                        </Link>
                        {!isListingFeePaid && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-[#0B1020] text-white p-4 rounded-2xl text-[11px] leading-relaxed font-medium opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none shadow-2xl z-30">
                            Payment of connection fee required to unlock direct phone and email contact with transporters.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#0B1020]"></div>
                          </div>
                        )}
                      </div>

                      <Link to={`/messages/${bid.id}`} className="flex items-center gap-2 text-small font-bold text-[#2A3346] opacity-40 hover:opacity-100 hover:text-[#C86B4A] transition-all">
                        <MessageCircle className="w-4 h-4" /> Message
                      </Link>

                      {!isListingFeePaid && (
                        <button 
                          onClick={() => handleSelectBid(bid)}
                          className="btn-primary px-10 py-3.5 rounded-xl text-small shadow-lg shadow-[#C86B4A]/10 ml-auto"
                        >
                          Select this bid
                        </button>
                      )}
                      
                      {isListingFeePaid && selectedBid?.id === bid.id && (
                        <div className="ml-auto flex items-center gap-2 text-[#6B8F71] font-bold text-small uppercase tracking-widest">
                           <CheckCircle className="w-5 h-5" /> Selected Winner
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {index === 0 && bid.id.includes('new') && (
                    <div className="absolute -top-3 -right-3 bg-[#6B8F71] text-white px-5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl animate-pulse">
                      New Bid Received
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-10">
            <div className={`p-10 rounded-[3rem] transition-all duration-700 shadow-2xl sticky top-28 ${isListingFeePaid ? 'bg-[#F7F1E8] border-2 border-[#6B8F71]' : 'bg-[#0B1020] text-[#F7F1E8]'}`}>
              <h3 className={`text-h4 mb-8 ${isListingFeePaid ? 'text-[#6B8F71]' : 'text-[#C86B4A]'}`}>
                {isListingFeePaid ? 'Booking confirmed' : 'Booking summary'}
              </h3>
              
              <div className="space-y-6 mb-10">
                <div className={`flex justify-between items-center pb-6 border-b ${isListingFeePaid ? 'border-[#6B8F71]/10' : 'border-white/10'}`}>
                  <span className={`${isListingFeePaid ? 'text-[#2A3346] opacity-50' : 'text-[#E6E0D8] opacity-50'} text-body font-medium`}>Marketplace Fee</span>
                  <span className={`text-h4 ${isListingFeePaid ? 'text-[#2A3346]' : 'text-[#C86B4A]'}`}>$35.00</span>
                </div>
                <div className={`flex justify-between items-center pb-6 border-b ${isListingFeePaid ? 'border-[#6B8F71]/10' : 'border-white/10'}`}>
                  <span className={`${isListingFeePaid ? 'text-[#2A3346] opacity-50' : 'text-[#E6E0D8] opacity-50'} text-body font-medium`}>Bids received</span>
                  <span className={`text-h4 transition-all duration-300 ${bidCountPulse ? 'scale-125 text-[#C86B4A]' : ''}`}>{bids.length}</span>
                </div>
              </div>

              {isListingFeePaid ? (
                <div className="bg-white/50 p-6 rounded-2xl border border-[#6B8F71]/20 mb-8 space-y-4">
                   <div className="flex items-center gap-3 text-[#6B8F71]">
                     <ShieldCheck className="w-6 h-6" />
                     <span className="font-bold text-body">PawsPath Protection Active</span>
                   </div>
                   <p className="text-small text-[#2A3346] opacity-70 leading-relaxed font-medium">
                     Your connection fee has been processed. You can now contact your transporter directly via phone or email.
                   </p>
                </div>
              ) : (
                <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
                  <Info className="w-5 h-5 text-[#C86B4A] shrink-0 mt-0.5" />
                  <p className="text-small text-[#E6E0D8] opacity-60 leading-relaxed font-medium">
                    The connection fee unlocks direct contact with the transporter and secures your booking with PawsPath Protection.
                  </p>
                </div>
              )}

              {!isListingFeePaid && (
                <button 
                  onClick={() => bids[0] && handleSelectBid(bids[0])}
                  className="w-full btn-primary py-5 rounded-2xl text-body shadow-xl shadow-[#C86B4A]/20"
                >
                  Securely Book Selected
                </button>
              )}
              
              {isListingFeePaid && (
                <div className="w-full bg-[#6B8F71] text-white py-5 rounded-2xl text-body font-bold text-center shadow-xl shadow-[#6B8F71]/20">
                   Booking Secured
                </div>
              )}
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-[#E6E0D8] shadow-sm">
              <h3 className="text-h4 mb-6 text-[#0B1020]">How bidding works</h3>
              <ul className="space-y-6">
                {[
                  "Transporters review your requirements",
                  "Receive competitive, all-inclusive bids",
                  "Compare ratings and past trip history",
                  "Select a winner and pay connection fee"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 text-body text-[#2A3346] opacity-60">
                    <CheckCircle className="w-5 h-5 text-[#6B8F71] shrink-0 mt-0.5" />
                    <span className="font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Payment Overlay/Modal */}
      {showPayment && selectedBid && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0B1020]/90 backdrop-blur-xl" onClick={() => setShowPayment(false)}></div>
          <div className="bg-[#F7F1E8] w-full max-w-xl rounded-[4rem] p-12 lg:p-16 relative z-10 animate-in zoom-in-95 duration-500 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-[#C86B4A]/10 rounded-[2rem] flex items-center justify-center text-[#C86B4A] mx-auto mb-8 shadow-inner">
                <Lock className="w-10 h-10" />
              </div>
              <h3 className="text-h2 mb-4 text-[#0B1020]">Connection fee</h3>
              <p className="text-body-l text-[#2A3346] opacity-70">Pay the $35 connection fee to finalize your booking with <span className="font-bold text-[#0B1020]">{selectedBid.transporterName}</span>.</p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] mb-12 border border-[#E6E0D8]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-body font-bold text-[#2A3346] opacity-50 uppercase tracking-widest">Total to pay now</span>
                <span className="text-h2 text-[#6B8F71]">$35.00</span>
              </div>
              <p className="text-[11px] text-[#2A3346] opacity-30 font-black uppercase tracking-[0.3em]">Secure checkout standard</p>
            </div>

            <div className="space-y-6">
              <button 
                className="w-full btn-primary py-6 rounded-3xl text-[17px] font-bold shadow-2xl shadow-[#C86B4A]/30 flex items-center justify-center gap-3 transform active:scale-95 transition-all"
                onClick={handleConfirmPayment}
              >
                Pay & Unlock Direct Contact
              </button>
              <button onClick={() => setShowPayment(false)} className="w-full text-small font-bold text-[#2A3346] opacity-40 uppercase tracking-widest hover:opacity-100 transition-opacity">Cancel for now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
