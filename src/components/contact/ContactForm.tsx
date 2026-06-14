'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';

const WHATSAPP_NUMBER = '905462096969';

export function ContactForm() {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log inquiry to Supabase (fire-and-forget, does not block WhatsApp redirect)
    supabase
      .from('inquiries')
      .insert({ name: name || null, honda_model: model || null, message })
      .then(() => {});

    const lines = [
      t('form_wa_intro'),
      name && `${t('form_wa_name_prefix')}${name}`,
      model && `${t('form_wa_model_prefix')}${model}`,
      message && `${t('form_wa_message_prefix')}${message}`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-6 md:p-7 h-fit">
      <div className="mb-5">
        <h2 className="font-display font-bold text-primary text-lg mb-1">{t('form_title')}</h2>
        <p className="text-text-muted text-xs leading-relaxed">
          {t('form_desc')}
        </p>
      </div>

      <form onSubmit={handleSend} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block">
            {t('form_name_label')}{' '}
            <span className="text-text-subtle font-normal normal-case">{t('form_name_optional')}</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('form_name_placeholder')}
            className="w-full px-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors duration-150"
          />
        </div>

        {/* Model */}
        <div>
          <label className="text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block">
            {t('form_model_label')}{' '}
            <span className="text-text-subtle font-normal normal-case">{t('form_model_optional')}</span>
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder={t('form_model_placeholder')}
            className="w-full px-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors duration-150"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block">
            {t('form_message_label')}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('form_message_placeholder')}
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
          {t('form_submit')}
        </button>
      </form>

      <p className="text-text-subtle text-[11px] mt-4 leading-relaxed text-center">
        {t('form_note')}
      </p>
    </div>
  );
}
