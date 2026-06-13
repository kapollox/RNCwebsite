'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '905XXXXXXXXX';

export function ContactForm() {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [
      'Merhaba, bir parça hakkında bilgi almak istiyorum.',
      name && `Adım: ${name}`,
      model && `Honda Model: ${model}`,
      message && `Mesajım: ${message}`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-6 md:p-7 h-fit">
      <div className="mb-5">
        <h2 className="font-display font-bold text-primary text-lg mb-1">Mesaj Gönder</h2>
        <p className="text-text-muted text-xs leading-relaxed">
          Formu doldurun, WhatsApp üzerinden doğrudan iletilsin.
        </p>
      </div>

      <form onSubmit={handleSend} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block">
            Adınız{' '}
            <span className="text-text-subtle font-normal normal-case">(isteğe bağlı)</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız"
            className="w-full px-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors duration-150"
          />
        </div>

        {/* Model */}
        <div>
          <label className="text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block">
            Honda Model{' '}
            <span className="text-text-subtle font-normal normal-case">(isteğe bağlı)</span>
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Örn: Honda CB125F 2021"
            className="w-full px-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors duration-150"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block">
            Mesajınız
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Aradığınız parça veya sorunuzu yazın..."
            rows={4}
            required
            className="w-full px-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors duration-150 resize-none"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-whatsapp text-white text-sm font-semibold rounded-sm hover:bg-whatsapp-dark transition-colors duration-150 w-full"
        >
          <MessageCircle size={17} />
          WhatsApp ile Gönder
        </button>
      </form>

      <p className="text-text-subtle text-[11px] mt-4 leading-relaxed text-center">
        Formu doldurduğunuzda WhatsApp açılır ve mesajınız otomatik iletilir.
      </p>
    </div>
  );
}
