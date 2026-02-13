
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// Added Loader2 to the imports
import { Send, AlertTriangle, ShieldCheck, Phone, Mail, Info, MoreVertical, Loader2 } from 'lucide-react';
import { User, Message } from '../types';
import { checkMessageForContactSharing } from '../geminiService';

export default function Messaging({ user }: { user: User | null }) {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', senderId: 't1', text: "Hello! I'm interested in transporting Luna. Do you have her crate dimensions?", timestamp: '10:30 AM' },
    { id: 'm2', senderId: 'u1', text: "Hi! Yes, it's 36L x 24W x 26H. She's a standard crate size.", timestamp: '10:35 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isFeePaid, setIsFeePaid] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user || isSending) return;

    setIsSending(true);
    const textToSend = inputValue.trim();
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // AI Check
    if (!isFeePaid) {
      try {
        const isFlagged = await checkMessageForContactSharing(textToSend);
        if (isFlagged) {
          const warning: Message = {
            id: 'warn-' + Date.now(),
            senderId: 'system',
            text: "Message Blocked: Sharing phone numbers or emails before paying the connection fee is against our policy.",
            timestamp: 'System',
            isFlagged: true
          };
          setMessages(prev => [...prev, warning]);
        }
      } catch (e) {
        console.error("Moderation check failed", e);
      }
    }
    setIsSending(false);
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-slate-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
            <img src={`https://picsum.photos/seed/transport/100`} className="w-full h-full object-cover" alt="Avatar" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 flex items-center gap-1.5">
              Express Pet Movers <ShieldCheck className="w-4 h-4 text-blue-500" />
            </h2>
            <p className="text-xs text-[#5F7161] font-bold">Online Now</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className={`p-2.5 rounded-full transition-all ${isFeePaid ? 'bg-slate-100 text-slate-900' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`} disabled={!isFeePaid}>
            <Phone className="w-5 h-5" />
          </button>
          <button className={`p-2.5 rounded-full transition-all ${isFeePaid ? 'bg-slate-100 text-slate-900' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`} disabled={!isFeePaid}>
            <Mail className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-full bg-slate-100 text-slate-900">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {!isFeePaid && (
          <div className="max-w-xl mx-auto bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-4 mb-8">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900 mb-1">Contact Sharing Disabled</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                To protect our marketplace, sharing phone numbers, emails, or links is restricted until the connection fee is paid.
              </p>
              <button className="mt-3 bg-amber-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-amber-600/20">Pay $35 Connection Fee</button>
            </div>
          </div>
        )}

        {messages.map((m) => {
          if (m.isFlagged) {
            return (
              <div key={m.id} className="flex flex-col items-center">
                <div className="bg-red-50 text-red-600 border border-red-100 px-6 py-2 rounded-full text-xs font-bold animate-bounce">
                  {m.text}
                </div>
              </div>
            );
          }
          const isOwn = m.senderId === user?.id;
          return (
            <div key={m.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] space-y-1`}>
                <div className={`px-5 py-3.5 rounded-[1.5rem] shadow-sm text-sm leading-relaxed ${isOwn ? 'bg-[#0F172A] text-white rounded-tr-none' : 'bg-white border border-slate-100 rounded-tl-none text-slate-700'}`}>
                  {m.text}
                </div>
                <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest ${isOwn ? 'text-right' : 'text-left'}`}>{m.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-white p-6 border-t border-slate-200">
        <form className="max-w-4xl mx-auto relative flex gap-4" onSubmit={handleSendMessage}>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..." 
              className={`w-full bg-slate-50 border-none rounded-2xl px-6 py-4 pr-16 text-sm focus:ring-2 focus:ring-[#CB9173] transition-all ${inputValue.trim() === '' ? 'opacity-70' : ''}`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button type="button" className="text-slate-400 hover:text-slate-600">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isSending}
            className={`bg-[#CB9173] text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all shrink-0 ${!inputValue.trim() || isSending ? 'opacity-40 cursor-not-allowed shadow-none' : 'shadow-[#CB9173]/20 hover:bg-[#B37A5C]'}`}
          >
            {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-4">Safe & Encrypted Messaging</p>
      </div>
    </div>
  );
}
