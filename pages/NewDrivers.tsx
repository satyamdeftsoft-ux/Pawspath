
import React, { useState, useEffect, useRef } from 'react';
// Added missing Link import
import { Link } from 'react-router-dom';
// Added missing icons to the lucide-react import
import { 
  Truck, DollarSign, Clock, ShieldCheck, Star, ArrowRight, CheckCircle2, Award, Briefcase, 
  ChevronDown, ChevronUp, Play, Lock, MapPin, Search, MessageSquare, GraduationCap, ShieldAlert,
  CreditCard, Loader2, Heart, Cat, Dog, BadgeCheck
} from 'lucide-react';

const AnimatedCounter = ({ end, label, suffix = "", prefix = "" }: { end: number, label: string, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all duration-500">
      <div className="text-4xl md:text-5xl font-serif font-bold text-[#C86B4A] mb-3">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#E6E0D8] opacity-60 group-hover:opacity-100 transition-opacity">
        {label}
      </p>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#E6E0D8] last:border-0 overflow-hidden transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left hover:text-[#C86B4A] transition-colors group"
      >
        <span className="text-xl font-serif font-bold text-[#0B1020] group-hover:text-[#C86B4A]">{question}</span>
        {isOpen ? <ChevronUp className="w-6 h-6 shrink-0" /> : <ChevronDown className="w-6 h-6 shrink-0" />}
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}>
        <p className="text-body text-[#2A3346] opacity-70 leading-relaxed font-medium">
          {answer}
        </p>
      </div>
    </div>
  );
};

const ShipmentCard = ({ route, miles, price, company }: { route: string, miles: string, price: string, company: string }) => (
  <div className="group bg-white p-10 rounded-[3rem] border border-[#E6E0D8] hover:border-[#C86B4A]/30 transition-all hover:shadow-2xl hover:shadow-[#C86B4A]/5">
    <div className="flex items-center gap-3 text-[#C86B4A] mb-4">
      <MapPin className="w-4 h-4" />
      <span className="text-small font-bold uppercase tracking-widest">{miles}</span>
    </div>
    <h4 className="text-2xl font-serif font-bold text-[#0B1020] mb-6 leading-tight group-hover:text-[#C86B4A] transition-colors">{route}</h4>
    <div className="pt-8 border-t border-[#F7F1E8] flex justify-between items-end">
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2A3346] opacity-30">Winning Transporter</p>
        <p className="text-body font-bold text-[#2A3346]">{company}</p>
      </div>
      <div className="text-right">
        <p className="text-h3 text-[#6B8F71]">{price}</p>
        <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-[10px] font-bold text-[#C86B4A] uppercase tracking-widest">
          View details
        </div>
      </div>
    </div>
  </div>
);

export default function NewDrivers() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTrial, setShowTrial] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowTrial(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* SECTION A: Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden bg-[#0B1020]">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M50,400 Q250,200 500,600 T950,300" stroke="#C86B4A" strokeWidth="6" fill="none" className="route-line-anim" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C86B4A]">Active Network expansion</span>
              </div>
              <h1 className="text-h1 text-white leading-[1.05]">
                Monetize your <br /> miles. Bring <span className="text-[#C86B4A]">families</span> home.
              </h1>
              <p className="text-body-l text-[#E6E0D8] opacity-70 leading-relaxed max-w-xl">
                Experience freedom on the road and premium earnings. Pick shipments that match your routes, manage your schedule, and grow your independent transport business with our world-class tools.
              </p>
              <div className="flex flex-wrap gap-5 pt-4">
                <button 
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary px-12 py-6 rounded-2xl text-lg shadow-2xl shadow-black/40 transform hover:scale-105 active:scale-95 transition-all"
                >
                  Register as a Driver Now
                </button>
                <button className="px-10 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3 group">
                  <Play className="w-5 h-5 fill-current" /> Watch driver stories
                </button>
              </div>
            </div>
            
            <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000">
              <div className="card-3d-wrap">
                <div className="card-3d rounded-[4rem] border-[14px] border-white/10 overflow-hidden shadow-2xl transform hover:rotate-2 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1544333323-5374c106f361?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-[640px] object-cover" 
                    alt="Driver with happy pets" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#C86B4A] flex items-center justify-center text-white">
                        <Truck className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-small font-bold text-white uppercase tracking-widest">Verified Pro</p>
                        <p className="text-body text-white opacity-60 font-medium leading-tight">Top performing drivers see 35% higher margins on specialized pet routes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Stats Strip */}
      <section className="py-20 bg-[#0B1020] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            <AnimatedCounter end={170000} label="Shipments Listed" suffix="+" />
            <AnimatedCounter end={8500} label="Avg Monthly Revenue" prefix="$" suffix="+" />
            <AnimatedCounter end={100} label="Miles Traveled" suffix="M+" />
            <AnimatedCounter end={8} label="Shipment Categories" suffix=" Groups" />
          </div>
          <p className="text-center mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white opacity-20">Stats shown as examples of current marketplace capacity</p>
        </div>
      </section>

      {/* SECTION C: Big CTA Band */}
      <section className="py-24 bg-gradient-to-r from-[#C86B4A] to-[#A35234] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-h1 text-white mb-6">Start your engine today.</h2>
          <p className="text-body-l text-white/80 mb-12 font-medium">Join the elite network of professional transporters providing first-class care across the nation.</p>
          <button 
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#0B1020] text-white px-14 py-6 rounded-2xl text-[17px] font-bold hover:scale-105 transition-all shadow-2xl active:scale-95"
          >
            Register as a Driver Now
          </button>
        </div>
      </section>

      {/* SECTION D: Story Block */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="grid grid-cols-2 gap-8 relative">
                <div className="space-y-8 mt-12">
                   <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] border-8 border-white">
                      <img src="https://images.unsplash.com/photo-1591306399172-4d1c2f65c7d7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]" />
                   </div>
                   <div className="bg-[#6B8F71] p-10 rounded-[3rem] text-white shadow-xl shadow-[#6B8F71]/20">
                      <Heart className="w-10 h-10 mb-4 opacity-40" />
                      <h4 className="text-h4 mb-2">Caring Heart</h4>
                      <p className="text-small opacity-80 leading-relaxed font-medium">Drivers with high ratings earn access to premium private listings.</p>
                   </div>
                </div>
                <div className="space-y-8">
                   <div className="bg-[#C86B4A] p-10 rounded-[3rem] text-white shadow-xl shadow-[#C86B4A]/20">
                      <Award className="w-10 h-10 mb-4 opacity-40" />
                      <h4 className="text-h4 mb-2">Top Tier</h4>
                      <p className="text-small opacity-80 leading-relaxed font-medium">Expert handling workshops available for all network members.</p>
                   </div>
                   <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] border-8 border-white">
                      <img src="https://images.unsplash.com/photo-1541591047357-1240c5bc6203?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]" />
                   </div>
                </div>
             </div>
             <div className="space-y-10">
                <h2 className="text-h2 text-[#0B1020]">Freedom to drive, <br /> tools to thrive.</h2>
                <p className="text-body-l text-[#2A3346] opacity-70 leading-relaxed max-w-xl">
                  Whether you have an SUV, a specialized van, or a large fleet, PawsPath gives you the digital infrastructure to win business and manage clients effortlessly. No more cold calling—just high-intent customers ready for your services.
                </p>
                <div className="space-y-6 pt-4">
                  {[
                    "Zero upfront listing costs—bid for free during trial.",
                    "Personalized route alerts based on your preferences.",
                    "Secure escrow-style payment protection.",
                    "Direct access to our dedicated driver coaching team."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-6 h-6 rounded-full bg-[#6B8F71]/10 flex items-center justify-center text-[#6B8F71]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-body font-bold text-[#2A3346] opacity-60">{text}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary px-10 py-5 rounded-2xl font-bold flex items-center gap-3 group"
                >
                  Start my journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION E: Testimonials */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C86B4A_1px,transparent_1px)] opacity-[0.05] [background-size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-h2 text-[#0B1020] mb-6">Verified driver success.</h2>
            <p className="text-body-l text-[#2A3346] opacity-60">Hear directly from the professionals moving family every day.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-[4rem] overflow-hidden aspect-video bg-[#0B1020] shadow-2xl group border-8 border-[#F7F1E8]">
              <img src="https://images.unsplash.com/photo-1512412086892-424a29eb10c8?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s]" />
              <button className="absolute inset-0 m-auto w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border-2 border-white/50 hover:bg-[#C86B4A] transition-all transform hover:scale-110 active:scale-90 group-hover:border-[#C86B4A]">
                <Play className="w-10 h-10 fill-current ml-1" />
              </button>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xl font-serif font-bold italic">"I turned my empty return routes into $4k profit months."</p>
                <p className="text-small font-bold uppercase tracking-widest mt-2 opacity-60">Mike R. • Coastal Pet Express</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                { name: "Sarah Jennings", business: "SJ Transport LLC", quote: "PawsPath's bidding system is so intuitive. I can respond to customers in seconds from my phone while on the road.", stars: 5 },
                { name: "David Miller", business: "Miller Pet Movers", quote: "The trust badge actually means something here. I get selected for premium jobs because of my verified history.", stars: 5 }
              ].map((t, i) => (
                <div key={i} className="bg-[#F7F1E8] p-10 rounded-[2.5rem] border border-[#E6E0D8] hover:border-[#C86B4A]/20 transition-all shadow-sm">
                  <div className="flex text-[#C86B4A] mb-4">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xl font-serif italic text-[#0B1020] leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E6E0D8] overflow-hidden">
                      <img src={`https://picsum.photos/seed/${t.name}/100`} />
                    </div>
                    <div>
                      <p className="text-body font-bold text-[#0B1020]">{t.name}</p>
                      <p className="text-small font-bold uppercase tracking-widest text-[#2A3346] opacity-40">{t.business}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: Previous Shipments */}
      <section className="section-padding bg-[#0B1020]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
            <div className="max-w-xl space-y-4">
              <h2 className="text-h2 text-white">Real jobs. Real revenue.</h2>
              <p className="text-body-l text-[#E6E0D8] opacity-60">Take a look at actual winning bids across common routes.</p>
            </div>
            <Link to="/marketplace" className="px-10 py-5 rounded-2xl border-2 border-white/10 text-white font-bold text-small uppercase tracking-widest hover:border-[#C86B4A] hover:text-[#C86B4A] transition-all">
              See Live Marketplace
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ShipmentCard route="Independence, MO → Hearne, TX" miles="704 Mi" price="$500" company="Apex Logistics" />
            <ShipmentCard route="Corpus Christi, TX → Lexington, KY" miles="1,208 Mi" price="$900" company="Bluegrass Pet Pros" />
            <ShipmentCard route="Denver, CO → Redwood City, CA" miles="1,269 Mi" price="$500" company="Mountain Express" />
          </div>
        </div>
      </section>

      {/* SECTION G: 3-Step Process */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="absolute inset-0 bg-[#C86B4A]/10 rounded-[4rem] blur-[120px] -z-10"></div>
               <div className="bg-white p-6 rounded-[4rem] shadow-2xl border border-slate-100 rotate-2">
                 <div className="bg-slate-50 rounded-[3rem] p-10 space-y-8">
                    <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                       <div className="w-12 h-12 bg-[#0B1020] rounded-xl flex items-center justify-center text-[#C86B4A]">
                          <Search className="w-6 h-6" />
                       </div>
                       <h4 className="font-bold text-lg text-[#0B1020]">Job Discovery Feed</h4>
                    </div>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm opacity-50 group-hover:opacity-100 transition-opacity">
                         <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 2 ? 'bg-[#C86B4A] text-white' : 'bg-slate-100 text-slate-400'}`}>
                             {i === 1 ? <Cat className="w-5 h-5" /> : <Dog className="w-5 h-5" />}
                           </div>
                           <div>
                              <p className="text-small font-bold text-[#0B1020]">Active Listing #{i}293</p>
                              <p className="text-[10px] font-bold uppercase text-slate-400">NY to Miami • 1,280 Mi</p>
                           </div>
                         </div>
                         <button className="text-small font-bold text-[#C86B4A]">Submit Quote</button>
                      </div>
                    ))}
                    <div className="pt-4 text-center">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Developer mockup of mobile interface</p>
                    </div>
                 </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-16">
               <h2 className="text-h2 text-[#0B1020]">Onboard in <br /> minutes.</h2>
               <div className="space-y-12">
                  {[
                    { icon: ShieldCheck, title: "Simple verification", desc: "Just provide your contact and driver license info. No special commercial license required for most shipments. USDA certification support available." },
                    { icon: MessageSquare, title: "Instant opportunities", desc: "Get real-time mobile notifications for jobs on your preferred routes. Chat directly with customers to finalize travel dates." },
                    { icon: Briefcase, title: "Bid for business", desc: "Submit transparent quotes and compete fairly. Access our coaching workshops to improve your conversion and earnings." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-8 group">
                       <div className="w-16 h-16 rounded-2xl bg-[#F7F1E8] flex items-center justify-center text-[#C86B4A] group-hover:bg-[#C86B4A] group-hover:text-white transition-all duration-500 shrink-0">
                          <step.icon className="w-8 h-8" />
                       </div>
                       <div>
                          <h4 className="text-h4 mb-2 text-[#0B1020]">{step.title}</h4>
                          <p className="text-body text-[#2A3346] opacity-60 leading-relaxed">{step.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: Screening for safety */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0B1020] p-12 lg:p-24 rounded-[4rem] text-[#F7F1E8] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C86B4A]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="grid lg:grid-cols-2 gap-20 relative z-10">
                <div className="space-y-8">
                   <ShieldAlert className="w-20 h-20 text-[#C86B4A]" />
                   <h2 className="text-h2">Uncompromising <br /> safety standards.</h2>
                   <p className="text-body-l text-[#E6E0D8] opacity-70 leading-relaxed max-w-lg">
                      We only certify the best. Our marketplace thrives on the highest levels of trust between drivers and pet parents.
                   </p>
                   <div className="grid sm:grid-cols-2 gap-6 pt-6">
                      {[
                        "Identity Verification",
                        "Background Screenings",
                        "Verified Reviews Only",
                        "24/7 Support Access",
                        "Secure Direct Messaging",
                        " USDA Compliance Support"
                      ].map((text, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <BadgeCheck className="w-5 h-5 text-[#6B8F71]" />
                           <span className="text-small font-bold text-white/80">{text}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10">
                   <h3 className="text-h4 mb-8 text-white">Marketplace Badges</h3>
                   <div className="space-y-8">
                      {[
                        { icon: Award, color: "#C86B4A", name: "Caring Heart Certified", desc: "Awarded to drivers with 4.9+ ratings and consistent safe deliveries." },
                        { icon: GraduationCap, color: "#6B8F71", name: "Safety Masterclass", desc: "Completed our professional animal handling and logistics workshop." },
                        { icon: ShieldCheck, color: "#4A90E2", name: "Identity Verified", desc: "Full background and license check completed and active." }
                      ].map((badge, i) => (
                        <div key={i} className="flex gap-6 items-start group">
                           <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: `${badge.color}20`, color: badge.color }}>
                              <badge.icon className="w-7 h-7" />
                           </div>
                           <div>
                              <h4 className="font-bold text-white mb-1">{badge.name}</h4>
                              <p className="text-xs text-white/40 leading-relaxed">{badge.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION I: FAQ Accordion */}
      <section className="section-padding" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-h2 text-[#0B1020] mb-6">Common questions.</h2>
            <p className="text-body-l text-[#2A3346] opacity-60">Everything you need to know to get started.</p>
          </div>
          <div className="bg-white px-10 rounded-[3rem] border border-[#E6E0D8] shadow-sm">
            <FAQItem 
              question="What is PawsPath and how does it work?" 
              answer="PawsPath is a premium marketplace connecting independent transporters with pet parents. We provide the digital tools for bidding, communication, and secure payments, while you manage your own business and routes." 
            />
            <FAQItem 
              question="What do I need to get started?" 
              answer="You need a valid driver's license, a reliable vehicle suited for transport, and a passion for animal welfare. We'll guide you through our standard verification and background check process." 
            />
            <FAQItem 
              question="How do I get paid?" 
              answer="Payments are handled securely through our platform. Customers fund the shipment up front, and funds are released to you directly upon successful delivery of the pet at its destination." 
            />
            <FAQItem 
              question="How do I know there are shipments in my area?" 
              answer="Our discovery engine allows you to filter listings by origin, destination, and route radius. You can also set up mobile alerts to be notified the moment a new listing matches your favorite routes." 
            />
            <FAQItem 
              question="Do I have any costs?" 
              answer="Listing your profile is free. We offer a 30-day free trial for bidding, after which there is a monthly subscription to maintain your active driver status and access to the bidding pool." 
            />
            <FAQItem 
              question="Is driver education/support available?" 
              answer="Absolutely. We offer regular webinars, a comprehensive driver handbook, and 7-day-a-week support from our specialized driver success team." 
            />
          </div>
        </div>
      </section>

      {/* SECTION J & K: Registration Form & Trial Step */}
      <section className="section-padding bg-[#F7F1E8]" ref={formRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-10">
               <h2 className="text-h1 text-[#0B1020]">Let's get <br /> started.</h2>
               <p className="text-body-l text-[#2A3346] opacity-70 leading-relaxed">
                  Join 1,200+ verified professionals and start growing your business today. It takes less than 2 minutes to submit your initial application.
               </p>
               <div className="bg-white p-8 rounded-[2.5rem] border border-[#E6E0D8] shadow-sm">
                  <h4 className="text-small font-bold uppercase tracking-widest text-[#C86B4A] mb-6">Network benefits</h4>
                  <ul className="space-y-4">
                     {[
                       "Instant mobile job notifications",
                       "Direct messenger with pet parents",
                       "Escrow-style payment security",
                       "24/7 Driver support line"
                     ].map((text, i) => (
                       <li key={i} className="flex gap-4 items-center text-body font-bold text-[#2A3346] opacity-60">
                          <CheckCircle2 className="w-5 h-5 text-[#6B8F71] rotate-0" />
                          {text}
                       </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="lg:col-span-7">
               {!showTrial ? (
                 <div className="bg-white p-12 lg:p-16 rounded-[4rem] border border-[#E6E0D8] shadow-2xl animate-in slide-in-from-right duration-700">
                    <form onSubmit={handleRegister} className="space-y-8">
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-[#2A3346] opacity-40">Shipment Category</label>
                             <select className="w-full bg-[#F7F1E8] border-none rounded-xl px-6 py-4 font-bold text-[#0B1020] focus:ring-2 focus:ring-[#C86B4A] transition-all">
                                <option>Pets (Most Popular)</option>
                                <option>Household Items</option>
                                <option>Motorcycles</option>
                                <option>Vehicles</option>
                                <option>Boats</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-[#2A3346] opacity-40">Email Address</label>
                             <input type="email" required placeholder="name@company.com" className="w-full bg-[#F7F1E8] border-none rounded-xl px-6 py-4 font-bold text-[#0B1020] focus:ring-2 focus:ring-[#C86B4A] transition-all" />
                          </div>
                       </div>
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-[#2A3346] opacity-40">First Name</label>
                             <input type="text" required placeholder="John" className="w-full bg-[#F7F1E8] border-none rounded-xl px-6 py-4 font-bold text-[#0B1020] focus:ring-2 focus:ring-[#C86B4A] transition-all" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-[#2A3346] opacity-40">Last Name</label>
                             <input type="text" required placeholder="Doe" className="w-full bg-[#F7F1E8] border-none rounded-xl px-6 py-4 font-bold text-[#0B1020] focus:ring-2 focus:ring-[#C86B4A] transition-all" />
                          </div>
                       </div>
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-2 relative">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-[#2A3346] opacity-40">Password</label>
                             <input type="password" required className="w-full bg-[#F7F1E8] border-none rounded-xl px-6 py-4 font-bold text-[#0B1020] focus:ring-2 focus:ring-[#C86B4A] transition-all" />
                             <div className="absolute right-6 bottom-4 flex gap-1">
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-3 h-1 bg-green-500 rounded-full"></div>)}
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-[#2A3346] opacity-40">Repeat Password</label>
                             <input type="password" required className="w-full bg-[#F7F1E8] border-none rounded-xl px-6 py-4 font-bold text-[#0B1020] focus:ring-2 focus:ring-[#C86B4A] transition-all" />
                          </div>
                       </div>
                       <div className="flex items-start gap-4 pt-4">
                          <input type="checkbox" required className="mt-1.5 w-5 h-5 rounded border-[#E6E0D8] text-[#C86B4A] focus:ring-[#C86B4A]" />
                          <p className="text-small text-[#2A3346] opacity-50 font-medium leading-relaxed">
                             By signing up, I agree to the <a href="#" className="underline">Driver Agreement</a>, <a href="#" className="underline">Terms of Service</a>, and <a href="#" className="underline">Privacy Policy</a>.
                          </p>
                       </div>
                       <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full btn-primary py-6 rounded-2xl text-[17px] shadow-2xl shadow-[#C86B4A]/20 flex items-center justify-center gap-3 disabled:opacity-70 transition-all"
                       >
                          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign Up Now"}
                       </button>
                    </form>
                 </div>
               ) : (
                 <div className="bg-[#0B1020] p-12 lg:p-16 rounded-[4rem] text-[#F7F1E8] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
                    <div className="text-center mb-12">
                       <div className="w-24 h-24 bg-[#C86B4A]/10 rounded-[2rem] flex items-center justify-center text-[#C86B4A] mx-auto mb-8 shadow-inner border border-[#C86B4A]/20">
                          <CreditCard className="w-10 h-10" />
                       </div>
                       <h3 className="text-h2 mb-4">Start your 30-day trial</h3>
                       <p className="text-body-l text-[#E6E0D8] opacity-60">Complete your verification and start bidding today. Your card will not be charged during the trial period.</p>
                    </div>

                    <div className="space-y-10">
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">First Name on Card</label>
                             <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white focus:ring-2 focus:ring-[#C86B4A] transition-all" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Last Name on Card</label>
                             <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white focus:ring-2 focus:ring-[#C86B4A] transition-all" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Card Number</label>
                          <div className="relative">
                             <input type="text" required placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white focus:ring-2 focus:ring-[#C86B4A] transition-all" />
                             <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          </div>
                       </div>
                       <div className="grid grid-cols-3 gap-8">
                          <div className="space-y-2 col-span-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Expiry Date</label>
                             <div className="grid grid-cols-2 gap-4">
                                <input type="text" required placeholder="MM" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white text-center focus:ring-2 focus:ring-[#C86B4A]" />
                                <input type="text" required placeholder="YY" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white text-center focus:ring-2 focus:ring-[#C86B4A]" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">CVV</label>
                             <input type="text" required placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white text-center focus:ring-2 focus:ring-[#C86B4A]" />
                          </div>
                       </div>
                       
                       <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4">
                          <div className="flex justify-between items-center text-small font-bold text-white/40 uppercase tracking-widest">
                             <span>Trial Period (30 Days)</span>
                             <span className="text-[#6B8F71]">$0.00</span>
                          </div>
                          <div className="flex justify-between items-center text-body font-bold text-white">
                             <span>After Trial (Monthly)</span>
                             <span>$79.00</span>
                          </div>
                       </div>

                       <button 
                        onClick={() => window.location.href = '#/dashboard'}
                        className="w-full btn-primary py-6 rounded-2xl text-[17px] shadow-2xl shadow-black/40 flex items-center justify-center gap-3 active:scale-95 transition-all"
                       >
                          Start My Free Trial
                       </button>
                       <p className="text-center text-[11px] text-white/40 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                          <Lock className="w-3 h-3" /> Secure encrypted checkout Standard
                       </p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
