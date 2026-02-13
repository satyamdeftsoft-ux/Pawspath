
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dog, Cat, Bird, Sparkles, Loader2, CheckCircle2, MapPin, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { generateListingDescription } from '../geminiService';

export default function CreateListing({ user }: { user: User | null }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    petType: 'Dog',
    petName: '',
    origin: '',
    destination: '',
    date: '',
    needs: '',
    description: '',
    budget: ''
  });

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.petName.trim()) newErrors.petName = "Pet name is required";
      else if (formData.petName.length < 2) newErrors.petName = "Name must be at least 2 characters";
    } else if (currentStep === 2) {
      if (!formData.origin.trim()) newErrors.origin = "Pick up location is required";
      if (!formData.destination.trim()) newErrors.destination = "Destination is required";
      if (!formData.date) {
        newErrors.date = "Preferred date is required";
      } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) newErrors.date = "Date cannot be in the past";
      }
    } else if (currentStep === 3) {
      if (!formData.description.trim()) newErrors.description = "A short description helps transporters bid";
      if (formData.budget && parseFloat(formData.budget) <= 0) newErrors.budget = "Budget must be a positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleAiDescription = async () => {
    if (!formData.petName || !formData.petType) {
      setErrors({ petName: "Please provide a name first" });
      return;
    }
    setIsGenerating(true);
    setErrors({});
    try {
      const desc = await generateListingDescription({
        type: formData.petType,
        name: formData.petName,
        needs: formData.needs || 'No special needs mentioned.'
      });
      setFormData(prev => ({ ...prev, description: desc || '' }));
    } catch (e) {
      setErrors({ description: "AI failed to generate. Please try writing manually." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      navigate('/marketplace');
    }
  };

  const steps = [
    { id: 1, title: 'The Traveler' },
    { id: 2, title: 'The Route' },
    { id: 3, title: 'Details' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Post a Transport Request</h1>
          <p className="text-slate-500">Tell us about your pet's journey and receive bids from vetted pros.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 relative px-10">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= s.id ? 'bg-[#CB9173] text-white' : 'bg-slate-200 text-slate-500'}`}>
                {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.id}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${step >= s.id ? 'text-[#CB9173]' : 'text-slate-400'}`}>{s.title}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 lg:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="text-sm font-bold text-slate-900 mb-4 block">Pet Type</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Dog', icon: Dog },
                    { label: 'Cat', icon: Cat },
                    { label: 'Other', icon: Bird }
                  ].map((t) => (
                    <button 
                      key={t.label}
                      onClick={() => setFormData({...formData, petType: t.label})}
                      className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.petType === t.label ? 'border-[#CB9173] bg-[#CB9173]/5 text-[#CB9173]' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      <t.icon className="w-8 h-8" />
                      <span className="font-bold text-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-900 mb-2 block">What's their name?</label>
                <input 
                  type="text" 
                  value={formData.petName}
                  onChange={(e) => {
                    setFormData({...formData, petName: e.target.value});
                    if (errors.petName) setErrors({});
                  }}
                  placeholder="e.g. Luna"
                  className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 focus:ring-2 focus:ring-[#CB9173] text-lg transition-all ${errors.petName ? 'border-red-300 focus:ring-red-100' : 'border-transparent'}`}
                />
                {errors.petName && (
                  <p className="mt-2 text-xs font-bold text-red-500 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" /> {errors.petName}
                  </p>
                )}
              </div>
              <button 
                onClick={handleNext}
                className="w-full bg-[#0F172A] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#1e293b] transition-all"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-slate-900 mb-2 block flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#CB9173]" /> Pick Up Location
                  </label>
                  <input 
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    placeholder="City, State"
                    className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 focus:ring-2 focus:ring-[#CB9173] transition-all ${errors.origin ? 'border-red-300 focus:ring-red-100' : 'border-transparent'}`}
                  />
                  {errors.origin && <p className="mt-1 text-xs font-bold text-red-500">{errors.origin}</p>}
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-900 mb-2 block flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#CB9173]" /> Destination
                  </label>
                  <input 
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    placeholder="City, State"
                    className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 focus:ring-2 focus:ring-[#CB9173] transition-all ${errors.destination ? 'border-red-300 focus:ring-red-100' : 'border-transparent'}`}
                  />
                  {errors.destination && <p className="mt-1 text-xs font-bold text-red-500">{errors.destination}</p>}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-900 mb-2 block flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#CB9173]" /> Preferred Date
                </label>
                <input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 focus:ring-2 focus:ring-[#CB9173] transition-all ${errors.date ? 'border-red-300 focus:ring-red-100' : 'border-transparent'}`}
                />
                {errors.date && <p className="mt-1 text-xs font-bold text-red-500">{errors.date}</p>}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 border border-slate-200 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  className="flex-[2] bg-[#0F172A] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#1e293b] transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-bold text-slate-900 block">Description & Needs</label>
                  <button 
                    onClick={handleAiDescription}
                    disabled={isGenerating}
                    className="text-[#CB9173] text-xs font-bold flex items-center gap-1.5 hover:underline disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    Use AI Assistant
                  </button>
                </div>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  placeholder="Tell us more about the pet's temperament, medical needs, or food preferences..."
                  className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 focus:ring-2 focus:ring-[#CB9173] text-base transition-all ${errors.description ? 'border-red-300 focus:ring-red-100' : 'border-transparent'}`}
                />
                {errors.description && <p className="mt-1 text-xs font-bold text-red-500">{errors.description}</p>}
              </div>
              <div>
                <label className="text-sm font-bold text-slate-900 mb-2 block flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#CB9173]" /> Maximum Budget (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input 
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="0.00"
                    className={`w-full pl-10 pr-6 py-4 rounded-xl bg-slate-50 border-2 focus:ring-2 focus:ring-[#CB9173] transition-all ${errors.budget ? 'border-red-300 focus:ring-red-100' : 'border-transparent'}`}
                  />
                </div>
                {errors.budget && <p className="mt-1 text-xs font-bold text-red-500">{errors.budget}</p>}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="flex-1 border border-slate-200 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                  Back
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-[2] bg-[#CB9173] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#B37A5C] transition-all"
                >
                  Post Listing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
