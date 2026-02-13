
import React from 'react';
import { ShieldCheck, Heart, UserCheck, ShieldAlert, BadgeCheck, Phone, CheckCircle, FileCheck } from 'lucide-react';

export default function TrustSafety() {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Header */}
      <section className="bg-white border-b border-[#E6E0D8] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <nav className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C86B4A]">PawsPath Foundation</nav>
            <h1 className="text-h1 text-[#0B1020]">Safety is our <br /><span className="text-[#C86B4A]">primary</span> promise.</h1>
            <p className="text-body-l text-[#2A3346] opacity-70 leading-relaxed">
              We understand that we aren't just moving property—we're moving family. Every feature of our marketplace is built around trust, transparency, and the wellbeing of your pets.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <h2 className="text-h2">Our safety pillars</h2>
              <div className="space-y-10">
                {[
                  { icon: UserCheck, title: "Multi-point verification", desc: "Every transporter undergoes a rigorous identity check, background screening, and equipment review before their first bid." },
                  { icon: ShieldCheck, title: "Booking protection", desc: "Our connection fee system ensures that only verified, serious pet parents and professional drivers connect." },
                  { icon: FileCheck, title: "Full transparency", desc: "Detailed profiles, verified trip histories, and unfiltered reviews allow you to make the best decision for your pet." },
                  { icon: BadgeCheck, title: "Caring Heart certification", desc: "Transporters with this badge have demonstrated exceptional care and have maintained a 4.9+ rating over 50+ trips." }
                ].map((pillar, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-16 h-16 rounded-2xl bg-[#F7F1E8] flex items-center justify-center text-[#C86B4A] group-hover:bg-[#C86B4A] group-hover:text-white transition-all duration-500 shrink-0">
                      <pillar.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-h4 mb-2 text-[#0B1020]">{pillar.title}</h4>
                      <p className="text-body text-[#2A3346] opacity-60 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#0B1020] p-12 md:p-20 rounded-[4rem] text-[#F7F1E8] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#C86B4A]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <ShieldAlert className="w-20 h-20 text-[#C86B4A] mb-12" />
               <h3 className="text-h2 mb-8">PawsPath <br /> Protection standard</h3>
               <ul className="space-y-8">
                 {[
                   "24/7 Virtual Veterinary access for all active trips.",
                   "Secure in-app messaging to keep contact private.",
                   "Incidental medical coverage up to $1,000.",
                   "Dedicated mediation team for any booking issues."
                 ].map((item, i) => (
                   <li key={i} className="flex gap-5 items-start">
                     <CheckCircle className="w-6 h-6 text-[#6B8F71] shrink-0 mt-1" />
                     <span className="text-body-l text-[#E6E0D8] opacity-80 font-medium">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-white border-y border-[#E6E0D8]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-[#F7F1E8] rounded-full flex items-center justify-center text-[#C86B4A] mx-auto mb-10 shadow-xl">
             <Phone className="w-10 h-10" />
          </div>
          <h2 className="text-h2 text-[#0B1020] mb-6">Concierge support.</h2>
          <p className="text-body-l text-[#2A3346] opacity-60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Have a concern or need assistance with a current trip? Our safety specialists are available 7 days a week to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="btn-primary px-12 py-5 rounded-2xl font-bold shadow-xl shadow-[#C86B4A]/20">Contact Safety Team</button>
            <button className="px-12 py-5 rounded-2xl border-2 border-[#E6E0D8] text-[#2A3346] font-bold hover:border-[#C86B4A] transition-all">Read Safety FAQ</button>
          </div>
        </div>
      </section>
    </div>
  );
}
