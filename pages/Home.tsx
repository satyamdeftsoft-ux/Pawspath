
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Truck, Heart, Star, Search, MapPin, 
  ArrowRight, CheckCircle2, Zap, Shield, Sparkles, 
  ChevronRight, ChevronLeft, Phone, BadgeCheck, Stethoscope,
  Globe, Clock, Award
} from 'lucide-react';
import { IMAGES, MOCK_SHIPMENTS, MOCK_TRANSPORTERS } from '../constants';

const FeatureCard: React.FC<{ icon: any, title: string, description: string }> = ({ icon: Icon, title, description }) => (
  <div className="card-3d-wrap group">
    <div className="card-3d p-10 bg-white rounded-[2.5rem] border border-[#E6E0D8] hover:shadow-2xl hover:shadow-[#C86B4A]/5 flex flex-col items-start text-left h-full">
      <div className="w-14 h-14 rounded-xl bg-[#F7F1E8] flex items-center justify-center text-[#C86B4A] mb-8 group-hover:bg-[#C86B4A] group-hover:text-[#F7F1E8] transition-all duration-500 shadow-sm shrink-0">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-h4 mb-4 text-[#0B1020]">{title}</h3>
      <p className="text-body text-[#2A3346] opacity-70 leading-relaxed">{description}</p>
    </div>
  </div>
);

const StepIndicator: React.FC<{ step: string, title: string, desc: string }> = ({ step, title, desc }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/20 flex items-center justify-center font-serif font-bold text-3xl text-[#C86B4A] mb-8 group-hover:scale-105 transition-transform shadow-2xl relative">
      {step}
      <div className="absolute inset-0 rounded-full border border-[#C86B4A] scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </div>
    <h4 className="text-h4 mb-4 text-[#F7F1E8]">{title}</h4>
    <p className="text-[#E6E0D8] opacity-60 text-body leading-relaxed px-4">{desc}</p>
  </div>
);

const TransporterCard: React.FC<{ transporter: any }> = ({ transporter }) => (
  <div className="card-3d-wrap group">
    <div className="card-3d bg-white p-8 rounded-[2.5rem] border border-[#E6E0D8] hover:border-[#C86B4A]/30 transition-all flex flex-col h-full relative overflow-hidden">
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#E6E0D8] shadow-sm group-hover:scale-105 transition-transform">
          <img src={transporter.avatar} alt={transporter.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl group-hover:text-[#C86B4A] transition-colors">{transporter.name}</h4>
          <p className="text-small font-bold uppercase tracking-widest text-[#2A3346] opacity-50 mb-2">{transporter.business}</p>
          <div className="flex items-center gap-1.5 text-[#C86B4A]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-body font-bold text-[#0B1020]">{transporter.rating}</span>
            <span className="text-small opacity-40 ml-1">({transporter.trips} trips)</span>
          </div>
        </div>
      </div>
      
      <div className="bg-[#F7F1E8] p-6 rounded-2xl mb-8 relative">
        <Sparkles className="absolute top-4 right-4 text-[#C86B4A] opacity-20 w-6 h-6" />
        <p className="text-body text-[#2A3346] italic leading-relaxed font-medium">"{transporter.quote}"</p>
      </div>
      
      <div className="mt-auto flex flex-wrap gap-2.5">
        <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-small font-bold uppercase tracking-widest flex items-center gap-1.5">
          <BadgeCheck className="w-4 h-4" /> Identity verified
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-small font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Shield className="w-4 h-4" /> Insured
        </span>
      </div>
      
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
        <div className="w-12 h-12 bg-[#C86B4A] rounded-xl flex items-center justify-center text-[#F7F1E8] shadow-xl shadow-[#C86B4A]/20">
          <ArrowRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [formData, setFormData] = useState({ origin: '', destination: '', type: 'Pets & animals' });

  return (
    <div className="overflow-hidden bg-[#F7F1E8]">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 md:pb-32">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M50,300 Q250,150 500,450 T950,200" stroke="#C86B4A" strokeWidth="6" fill="none" className="route-line-anim" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-12 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-xl shadow-[#0B1020]/5 border border-[#E6E0D8]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6B8F71] animate-pulse"></div>
                <span className="text-small font-bold uppercase tracking-[0.1em] text-[#2A3346] opacity-60">Trusted by 10,000+ pet parents nationwide</span>
              </div>
              
              <h1 className="text-h1 text-[#0B1020]">
                Safe, caring pet <br /> transport <span className="text-[#C86B4A]">trusted</span> by thousands.
              </h1>
              
              <p className="text-body-l text-[#2A3346] opacity-70 max-w-xl leading-relaxed">
                Pets are family. Connect with verified, loving transporters for a stress-free journey. From boutique local trips to nationwide relocations, we guide them home.
              </p>
              
              {/* Hero Form */}
              <div className="p-3 bg-white/90 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl shadow-[#0B1020]/10 flex flex-col lg:flex-row gap-2 border border-[#E6E0D8] max-w-4xl transform transition-all duration-500">
                <div className="flex-1 px-6 py-4 lg:border-r border-[#E6E0D8]">
                  <label className="text-small font-bold uppercase tracking-widest text-[#2A3346] opacity-40 block mb-1">What are you shipping?</label>
                  <select className="w-full bg-transparent border-none focus:ring-0 font-bold text-[#0B1020] p-0 text-lg">
                    <option>Pets & animals</option>
                    <option>Dogs only</option>
                    <option>Cats only</option>
                  </select>
                </div>
                <div className="flex-1 px-6 py-4 lg:border-r border-[#E6E0D8]">
                  <label className="text-small font-bold uppercase tracking-widest text-[#2A3346] opacity-40 block mb-1">Pickup location</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C86B4A]" />
                    <input type="text" placeholder="City, State" className="w-full bg-transparent border-none focus:ring-0 font-bold p-0 text-lg placeholder:text-slate-300" />
                  </div>
                </div>
                <div className="flex-1 px-6 py-4">
                  <label className="text-small font-bold uppercase tracking-widest text-[#2A3346] opacity-40 block mb-1">Delivery location</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C86B4A]" />
                    <input type="text" placeholder="City, State" className="w-full bg-transparent border-none focus:ring-0 font-bold p-0 text-lg placeholder:text-slate-300" />
                  </div>
                </div>
                <Link to="/marketplace" className="btn-primary px-10 py-5 rounded-[1.75rem] text-[15px] font-bold shadow-xl shadow-[#C86B4A]/30 flex items-center justify-center gap-2 whitespace-nowrap">
                  Find a loving pet transporter
                </Link>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#6B8F71]" />
                  <span className="text-small font-semibold text-[#2A3346] opacity-50">Booking assurance guarantee</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative hidden lg:block animate-in fade-in slide-in-from-right duration-1000">
              <div className="card-3d-wrap">
                <div className="card-3d relative">
                  <img 
                    src={IMAGES.hero} 
                    className="rounded-[4rem] shadow-2xl object-cover w-full h-[680px] border-[14px] border-white" 
                    alt="Caring pet owner with dog" 
                  />
                  <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur p-8 rounded-[2.5rem] shadow-2xl floating border border-[#E6E0D8]">
                    <div className="flex items-center gap-5">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-12 h-12 rounded-xl border-4 border-white overflow-hidden shadow-sm">
                            <img src={`https://picsum.photos/seed/face${i}/100`} alt="Transporter" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-small font-bold text-[#0B1020] uppercase tracking-widest mb-0.5">Verified Experts</p>
                        <div className="flex text-[#C86B4A]">
                          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Row */}
      <section className="py-12 bg-white border-y border-[#E6E0D8]">
        <div className="marquee-container">
          <div className="marquee-content gap-16 md:gap-32 px-12">
            {['USA TODAY', 'YAHOO! FINANCE', 'FORBES', 'CONSUMER AFFAIRS', 'PETS WORLD', 'LOGISTICS NEWS'].map((logo, i) => (
              <span key={i} className="text-2xl font-serif font-bold text-[#0B1020] opacity-10 tracking-[0.2em] uppercase cursor-default">
                {logo}
              </span>
            ))}
            {/* Repeat for seamless loop */}
            {['USA TODAY', 'YAHOO! FINANCE', 'FORBES', 'CONSUMER AFFAIRS', 'PETS WORLD', 'LOGISTICS NEWS'].map((logo, i) => (
              <span key={i + 'copy'} className="text-2xl font-serif font-bold text-[#0B1020] opacity-10 tracking-[0.2em] uppercase cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Passion Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="space-y-10">
              <div className="w-16 h-1.5 bg-[#C86B4A] rounded-full"></div>
              <h2 className="text-h2 text-[#0B1020]">
                Pet transport is our passion. <br />
                <span className="text-[#C86B4A] opacity-50 italic font-medium">Since 2008.</span>
              </h2>
              <p className="text-body-l text-[#2A3346] opacity-70 leading-relaxed max-w-xl">
                Founded by a group of animal lovers who felt traditional shipping was too cold for family members. We only partner with transporters who pass our "caring heart" assessment and background checks.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-2">
                <div className="bg-[#F7F1E8] p-8 rounded-3xl flex-1 border border-[#E6E0D8]">
                  <p className="text-4xl font-serif font-bold text-[#0B1020] mb-1">17+</p>
                  <p className="text-small font-bold uppercase tracking-widest text-[#C86B4A]">Years of reliability</p>
                </div>
                <div className="bg-[#0B1020] p-8 rounded-3xl flex-1 shadow-xl">
                  <p className="text-4xl font-serif font-bold text-[#C86B4A] mb-1">24/7</p>
                  <p className="text-small font-bold uppercase tracking-widest text-white/40">Real-time support</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card-3d-wrap">
                <div className="card-3d">
                  <img src={IMAGES.passion} className="rounded-[3rem] shadow-2xl w-full h-[540px] object-cover border-8 border-[#F7F1E8]" alt="Pet transport moments" />
                  <div className="absolute top-1/2 -right-8 w-20 h-20 bg-[#C86B4A] rounded-2xl flex items-center justify-center text-white shadow-2xl animate-bounce">
                    <Heart className="w-10 h-10 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Benefit Cards */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-h2 text-[#0B1020] mb-6">Designed for peace of mind.</h2>
            <p className="text-body text-[#2A3346] opacity-60 font-medium italic italic">"The gold standard in nationwide animal logistics."</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            <FeatureCard 
              icon={Globe} 
              title="Door-to-door transport" 
              description="No terminals, no stress. We facilitate private pickups and drop-offs directly at your specified locations for a faster reunion."
            />
            <FeatureCard 
              icon={Sparkles} 
              title="Constant updates" 
              description="Receive regular photo and GPS updates through our secure messaging, keeping you connected throughout the entire journey."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Safety & expert care" 
              description="All community transporters undergo rigorous background checks and provide climate-controlled environments for every traveler."
            />
          </div>
        </div>
      </section>

      {/* 4. Recent Shipments Carousel */}
      <section className="section-padding bg-[#0B1020] text-[#F7F1E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <h2 className="text-h2 text-[#F7F1E8]">Successful reunions.</h2>
            <p className="text-body-l text-[#E6E0D8] opacity-60 max-w-lg">Actual case studies facilitated by our marketplace experts (sample data).</p>
          </div>
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#C86B4A] hover:border-transparent transition-all"><ChevronLeft className="w-6 h-6" /></button>
            <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C86B4A] hover:border-transparent transition-all"><ChevronRight className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="flex gap-10 overflow-x-auto px-6 pb-8 no-scrollbar snap-x">
          {MOCK_SHIPMENTS.map((ship, i) => (
            <div key={i} className="min-w-[380px] md:min-w-[440px] bg-white/5 border border-white/10 p-10 rounded-[3rem] snap-center group hover:bg-white/10 transition-all">
              <div className="relative h-64 mb-8 rounded-[2rem] overflow-hidden">
                <img src={ship.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s]" alt={ship.pet} />
                <div className="absolute top-6 left-6 bg-[#C86B4A] text-[#F7F1E8] px-4 py-2 rounded-xl text-small font-bold uppercase tracking-widest shadow-xl">Verified journey</div>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-h4 text-[#F7F1E8] tracking-tight">{ship.pet} to {ship.to.split(',')[0]}</h4>
                    <p className="text-small font-bold uppercase tracking-widest text-white opacity-40 mt-1">{ship.miles} miles traveled</p>
                  </div>
                  <div className="text-right">
                    <p className="text-h3 text-[#C86B4A]">${ship.price}</p>
                    <p className="text-[11px] text-white opacity-20 font-bold uppercase tracking-widest">Example price</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-small font-bold text-white opacity-40 group-hover:opacity-100 transition-opacity">View journey details</span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#C86B4A] transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Band */}
      <section className="py-20 md:py-32 bg-[#C86B4A] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-h1 text-[#F7F1E8] mb-12">Find a loving pet <br className="hidden md:block" /> transporter today.</h2>
          <Link to="/marketplace" className="bg-[#0B1020] text-[#F7F1E8] px-14 py-6 rounded-2xl text-[17px] font-bold hover:scale-105 transition-all shadow-2xl inline-block active:scale-95">
            Get your free bids now
          </Link>
          <p className="mt-10 text-cream opacity-60 text-small font-bold uppercase tracking-widest">Always free to post • No commitment</p>
        </div>
      </section>

      {/* 6. Confidence Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="space-y-10">
              <h2 className="text-h2 text-[#0B1020]">
                Move your pets with <br /> absolute confidence.
              </h2>
              <p className="text-body-l text-[#2A3346] opacity-70 leading-relaxed">We concierge the entire experience from start to finish, ensuring safety protocols are followed on every mile.</p>
              
              <div className="grid sm:grid-cols-2 gap-10 pt-4">
                {[
                  { icon: Phone, title: "Concierge support", desc: "Available 7 days a week via call or chat." },
                  { icon: ShieldCheck, title: "Verified transporters", desc: "Multi-point identity and history vetting." },
                  { icon: Stethoscope, title: "Safety certified", desc: "Providers with animal handling expertise." },
                  { icon: Sparkles, title: "Premium updates", desc: "Live photos and location tracking." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-[#E6E0D8] flex items-center justify-center text-[#2A3346] group-hover:bg-[#C86B4A] group-hover:text-[#F7F1E8] transition-all shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-body font-bold text-[#0B1020] mb-1">{item.title}</h4>
                      <p className="text-small text-[#2A3346] opacity-50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-8 mt-12">
                  <img src={IMAGES.dog2} className="rounded-[3rem] shadow-xl w-full h-[400px] object-cover" />
                  <div className="bg-[#0B1020] p-10 rounded-[3rem] text-white">
                    <h4 className="text-h3 text-[#C86B4A] mb-2">100%</h4>
                    <p className="text-small font-bold uppercase tracking-widest text-white opacity-30">Booking protection</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="bg-[#C86B4A] p-10 rounded-[3rem] text-[#F7F1E8] text-center">
                    <Award className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-h4">Caring heart certified</p>
                  </div>
                  <img src={IMAGES.travel} className="rounded-[3rem] shadow-xl w-full h-[400px] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stats Section */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C86B4A_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-20 text-center">
            <div className="space-y-4">
              <h3 className="text-h1 text-[#0B1020]">10K+</h3>
              <p className="text-small font-bold uppercase tracking-[0.3em] text-[#C86B4A]">Pets safely home</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-h1 text-[#0B1020]">4.8</h3>
              <div className="flex justify-center text-[#C86B4A] mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-7 h-7 fill-current" />)}
              </div>
              <p className="text-small font-bold uppercase tracking-[0.3em] text-[#C86B4A]">Average parent rating</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-h1 text-[#0B1020]">24/7</h3>
              <p className="text-small font-bold uppercase tracking-[0.3em] text-[#C86B4A]">Caring concierge</p>
            </div>
          </div>
          <div className="mt-24 text-center">
            <p className="text-h3 text-[#2A3346] opacity-60 font-medium italic italic max-w-4xl mx-auto">
              "Loved by thousands of pet parents who prioritize safety and love over simple logistics."
            </p>
          </div>
        </div>
      </section>

      {/* 8. Featured Transporters */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
            <div className="max-w-xl space-y-4">
              <h2 className="text-h2 text-[#0B1020]">Top rated professionals.</h2>
              <p className="text-body-l text-[#2A3346] opacity-60">Meet the most requested specialists in our community (sample profiles).</p>
            </div>
            <Link to="/marketplace" className="border-2 border-[#E6E0D8] px-12 py-5 rounded-2xl text-small font-bold uppercase tracking-widest hover:border-[#C86B4A] hover:text-[#C86B4A] transition-all">
              See all active drivers
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            {MOCK_TRANSPORTERS.map((t, i) => (
              <TransporterCard key={i} transporter={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Promise Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#F7F1E8] rounded-[4rem] p-12 md:p-24 border border-[#E6E0D8] relative overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-h2 text-[#0B1020] mb-6">Safe and happy at every step.</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Shield, title: "Protection coverage", desc: "$1K incidental coverage standard." },
                { icon: Stethoscope, title: "TeleVet access", desc: "24/7 virtual veterinary care partner." },
                { icon: ShieldCheck, title: "Booking assurance", desc: "Guaranteed replacement if issues arise." },
                { icon: Heart, title: "Caring transporters", desc: "Passionate animal lovers only." }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#C86B4A] mx-auto shadow-sm mb-6 group-hover:bg-[#C86B4A] group-hover:text-[#F7F1E8] transition-all duration-500">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-h4 mb-2 text-[#0B1020]">{item.title}</h4>
                  <p className="text-small font-bold text-[#2A3346] opacity-40 uppercase tracking-widest leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Category Tiles */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Pet transport", img: IMAGES.categoryPet },
              { title: "Dog shipping", img: IMAGES.categoryDog },
              { title: "Cat shipping", img: IMAGES.categoryCat }
            ].map((cat, i) => (
              <Link key={i} to="/marketplace" className="relative h-[560px] rounded-[3rem] overflow-hidden group shadow-xl">
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt={cat.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-12 left-12 right-12">
                  <h3 className="text-h3 text-white mb-6 tracking-tight">{cat.title}</h3>
                  <div className="flex items-center gap-2 text-[#C86B4A] font-bold uppercase tracking-widest text-small group-hover:gap-4 transition-all">
                    Find a transporter <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. 3-Step Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0B1020] p-16 md:p-32 rounded-[4rem] text-white relative overflow-hidden">
            <div className="text-center max-w-4xl mx-auto mb-24 md:mb-32">
              <h2 className="text-h1 text-white leading-tight">Stress-free transport <br /> starts here.</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-20 relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 hidden lg:block"></div>
              <StepIndicator 
                step="01" 
                title="Tell us about your pet" 
                desc="Outline your pet's personality and travel requirements in minutes." 
              />
              <StepIndicator 
                step="02" 
                title="Choose a passionate driver" 
                desc="Compare verified profiles and select the heart that matches yours." 
              />
              <StepIndicator 
                step="03" 
                title="We help you book" 
                desc="Enjoy live updates as they move toward your happy reunion." 
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
