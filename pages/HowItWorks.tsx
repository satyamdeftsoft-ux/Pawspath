
import React from 'react';
import { Truck, Search, ShieldCheck, Heart, Mail, CheckCircle, CreditCard } from 'lucide-react';

const Step = ({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: any }) => (
  <div className="flex gap-8 group">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center text-[#CB9173] font-display font-bold text-xl group-hover:border-[#CB9173] transition-all duration-500 shrink-0">
        {number}
      </div>
      <div className="flex-grow w-0.5 bg-slate-100 group-last:bg-transparent my-4"></div>
    </div>
    <div className="pb-16 pt-2">
      <div className="w-12 h-12 bg-[#CB9173]/10 rounded-xl flex items-center justify-center text-[#CB9173] mb-6">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-display font-bold mb-4">{title}</h3>
      <p className="text-slate-500 leading-relaxed max-w-lg">{desc}</p>
    </div>
  </div>
);

export default function HowItWorks() {
  return (
    <div className="bg-[#FDFCFB] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8">How it <span className="text-[#CB9173]">Works</span></h1>
          <p className="text-lg text-slate-500">A secure, transparent, and direct way to find professional pet transport for your loved ones.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#CB9173] mb-8">The Process</h2>
            <Step 
              number="01" 
              title="Post Your Listing" 
              desc="Tell us about your pet, their needs, and the travel route. Use our AI assistant to help draft a perfect description." 
              icon={Mail} 
            />
            <Step 
              number="02" 
              title="Receive Bids" 
              desc="Verified transporters submit all-inclusive bids. You can compare profiles, experience, and past customer reviews." 
              icon={Search} 
            />
            <Step 
              number="03" 
              title="Connect & Pay" 
              desc="Select your favorite transporter and pay a one-time connection fee of $35. This unlocks direct phone and email contact." 
              icon={CreditCard} 
            />
            <Step 
              number="04" 
              title="Travel Securely" 
              desc="Communicate directly, receive live tracking updates, and pay the transporter upon successful delivery." 
              icon={Truck} 
            />
          </div>

          <div className="sticky top-32">
            <div className="relative">
              <div className="absolute -inset-10 bg-[#E5C0AF]/20 rounded-full filter blur-3xl"></div>
              <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">PawsPath Protection</h4>
                    <p className="text-xs text-slate-400">Standard with every booking</p>
                  </div>
                </div>
                
                <ul className="space-y-6">
                  {[
                    "Transporter Identity Verification",
                    "Integrated Payment Protection",
                    "Direct Support Mediation",
                    "Pet Incident Insurance Coverage",
                    "Real-time GPS Monitoring"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 items-center">
                      <div className="w-6 h-6 bg-[#5F7161]/10 rounded-full flex items-center justify-center text-[#5F7161]">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-slate-600 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 p-8 bg-[#0F172A] rounded-3xl text-center">
                  <Heart className="w-8 h-8 text-[#CB9173] mx-auto mb-4" />
                  <p className="text-white font-bold mb-2">We care like family.</p>
                  <p className="text-xs text-slate-400">Our 24/7 support team is always here for you and your pet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
