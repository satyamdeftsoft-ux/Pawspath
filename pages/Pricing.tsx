
import React from 'react';
import { Check, Shield, Zap, Heart } from 'lucide-react';

const PricingCard = ({ title, price, features, highlighted, type }: { title: string, price: string, features: string[], highlighted?: boolean, type: string }) => (
  <div className={`relative p-8 lg:p-12 rounded-[3rem] border transition-all duration-500 flex flex-col h-full ${highlighted ? 'bg-[#0F172A] text-white border-[#CB9173] scale-105 shadow-2xl shadow-[#CB9173]/20 z-10' : 'bg-white text-slate-900 border-slate-100 hover:border-[#CB9173]/30'}`}>
    {highlighted && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#CB9173] text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Recommended</div>}
    <div className="mb-8">
      <h3 className="font-display font-bold text-2xl mb-2">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-display font-bold">{price}</span>
        {price !== 'Free' && <span className="text-sm opacity-60 font-medium">/{type === 'transporter' ? 'mo' : 'one-time'}</span>}
      </div>
    </div>
    <ul className="space-y-4 mb-12 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex gap-3 text-sm font-medium">
          <Check className={`w-5 h-5 shrink-0 ${highlighted ? 'text-[#CB9173]' : 'text-[#5F7161]'}`} />
          <span className={highlighted ? 'text-slate-300' : 'text-slate-500'}>{f}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-2xl font-bold transition-all ${highlighted ? 'bg-[#CB9173] text-white hover:bg-[#B37A5C]' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
      Get Started
    </button>
  </div>
);

export default function Pricing() {
  return (
    <div className="bg-[#FDFCFB] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8">Transparent <span className="text-[#CB9173]">Pricing</span></h1>
          <p className="text-lg text-slate-500">Whether you're moving a pet or building a transport business, we have the right tools to keep you moving securely.</p>
        </div>

        <div className="mb-32">
          <div className="flex items-center gap-3 justify-center mb-12">
            <span className="w-12 h-[1px] bg-slate-200"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">For Transporters</span>
            <span className="w-12 h-[1px] bg-slate-200"></span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            <PricingCard 
              type="transporter"
              title="Individual"
              price="$29"
              features={["Submit up to 10 bids/mo", "Basic Profile Verification", "Email Support", "Standard Listings Access"]}
            />
            <PricingCard 
              type="transporter"
              title="Professional"
              price="$79"
              highlighted
              features={["Unlimited Bidding", "Premium Profile Badge", "Priority Listing Alerts", "Direct Chat History", "Insurance Verification"]}
            />
            <PricingCard 
              type="transporter"
              title="Fleet"
              price="$199"
              features={["Up to 5 Sub-drivers", "Team Dashboard", "API Access", "White-glove Support", "Featured Transporter Status"]}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 justify-center mb-12">
            <span className="w-12 h-[1px] bg-slate-200"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">For Pet Owners</span>
            <span className="w-12 h-[1px] bg-slate-200"></span>
          </div>
          <div className="bg-white rounded-[4rem] border border-slate-100 p-12 lg:p-20 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-display font-bold">One Simple Fee to <span className="text-[#CB9173]">Unlock Success</span></h2>
              <p className="text-slate-500 leading-relaxed text-lg">
                Listing your pet's journey is always 100% free. You only pay a small connection fee once you've found the perfect transporter and are ready to finalize the booking.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Zap, title: "Instant Access", desc: "Unlock phone & email immediately." },
                  { icon: Shield, title: "PawsPath Protect", desc: "Payment protection & mediation." },
                  { icon: Heart, title: "Vet Coverage", desc: "Incidental medical assistance." },
                  { icon: Check, title: "No Subscription", desc: "Pay only when you book." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#CB9173]/10 flex items-center justify-center text-[#CB9173] shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-96 text-center">
              <div className="bg-[#0F172A] p-12 rounded-[3rem] text-white">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Flat Connection Fee</p>
                <h3 className="text-6xl font-display font-bold text-[#CB9173] mb-8">$35</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">Unlock verified contact details and secure your booking for any trip distance.</p>
                <button className="w-full bg-white text-[#0F172A] py-5 rounded-2xl font-bold hover:bg-[#CB9173] hover:text-white transition-all">Post For Free</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
