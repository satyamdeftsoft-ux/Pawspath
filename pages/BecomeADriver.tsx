
import React from 'react';
import { Truck, DollarSign, Clock, ShieldCheck, Star, ArrowRight, CheckCircle2, Award, Briefcase } from 'lucide-react';

export default function BecomeADriver() {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1020] skew-y-3 origin-top-right -translate-y-24 z-0"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#C86B4A]/20 border border-[#C86B4A]/30">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F7F1E8]">Drivers needed nationwide</span>
              </div>
              <h1 className="text-h1 text-[#F7F1E8]">Earn more by <br /> bringing <span className="text-[#C86B4A]">family</span> home.</h1>
              <p className="text-body-l text-[#E6E0D8] opacity-70 leading-relaxed max-w-lg">
                Join the most trusted pet transport marketplace. Choose your routes, set your own bids, and build a rewarding business doing what you love.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="btn-primary px-10 py-5 rounded-2xl text-[17px] shadow-2xl shadow-[#C86B4A]/20 transform hover:scale-105 active:scale-95 transition-all">
                  Get Started Today
                </button>
                <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-[17px] hover:bg-white/10 transition-all">
                  View Earnings Guide
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000">
              <div className="card-3d-wrap">
                <div className="card-3d bg-white p-4 rounded-[3rem] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800" className="w-full h-[500px] object-cover rounded-[2.5rem]" alt="Happy dog in transport" />
                  <div className="absolute -bottom-10 -left-10 bg-[#F7F1E8] p-8 rounded-[2.5rem] shadow-2xl border border-[#E6E0D8] max-w-xs">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#6B8F71] flex items-center justify-center text-white">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-[#2A3346] opacity-40">Avg. Earnings</p>
                        <p className="text-h3 text-[#0B1020]">$2,400<span className="text-body opacity-30">/wk</span></p>
                      </div>
                    </div>
                    <p className="text-small text-[#2A3346] opacity-60 leading-relaxed">Top transporters earn consistent high margins on long-distance routes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-h2 text-[#0B1020] mb-6">Built for your growth.</h2>
            <p className="text-body-l text-[#2A3346] opacity-60">We provide the platform, the protection, and the premium leads. You provide the heart.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Briefcase, title: "Be your own boss", desc: "Set your own schedule, choose the jobs you want, and bid the prices you deserve." },
              { icon: Clock, title: "Flexible routes", desc: "Optimize your travel by picking up multiple pets along your existing cross-country routes." },
              { icon: ShieldCheck, title: "Payment protection", desc: "No more chasing payments. Our secure connection fee system ensures serious inquiries only." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] border border-[#E6E0D8] hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#F7F1E8] flex items-center justify-center text-[#C86B4A] mb-8 group-hover:bg-[#C86B4A] group-hover:text-white transition-all duration-500">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-h4 mb-4 text-[#0B1020]">{benefit.title}</h3>
                <p className="text-body text-[#2A3346] opacity-60 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Start Section */}
      <section className="py-24 bg-[#0B1020] text-[#F7F1E8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-h2">Simple 3-step <br /> onboarding.</h2>
              <div className="space-y-10">
                {[
                  { step: '01', title: 'Create your profile', desc: 'Verify your identity and showcase your experience and specialized equipment.' },
                  { step: '02', title: 'Browse & Bid', desc: 'Find active requests that match your route and submit competitive, transparent bids.' },
                  { step: '03', title: 'Drive & Earn', desc: 'Provide regular updates to pet parents and get paid directly upon successful delivery.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-5xl font-serif font-bold text-white opacity-10 group-hover:text-[#C86B4A] group-hover:opacity-100 transition-all duration-500">{item.step}</div>
                    <div>
                      <h4 className="text-h4 mb-2">{item.title}</h4>
                      <p className="text-body text-[#E6E0D8] opacity-60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#C86B4A] p-16 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <Award className="w-20 h-20 mx-auto mb-8 text-white opacity-30" />
               <h3 className="text-h3 mb-6">Join the elite network</h3>
               <p className="text-body-l text-white opacity-80 mb-10 leading-relaxed">
                 We only accept transporters who pass our rigorous background and equipment checks to maintain our premium marketplace status.
               </p>
               <button className="bg-[#0B1020] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl active:scale-95">
                 Start My Application
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-h2 text-[#0B1020] mb-8">Ready to hit the road?</h2>
          <p className="text-body-l text-[#2A3346] opacity-60 mb-12">Join over 1,200 verified professionals and start growing your business today.</p>
          <div className="flex justify-center gap-4">
            <button className="btn-primary px-12 py-6 rounded-2xl text-lg shadow-xl shadow-[#C86B4A]/20">Sign Up as a Driver</button>
          </div>
        </div>
      </section>
    </div>
  );
}
