'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // mount'ta fade-in
    const t1 = setTimeout(() => setVisible(true), 10);
    // 2.8s sonra fade-out başlat
    const t2 = setTimeout(() => setVisible(false), 2800);
    // 3s sonra unmount
    const t3 = setTimeout(onClose, 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-primary text-white text-sm font-semibold rounded-sm shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <CheckCircle2 size={16} className="shrink-0 text-green-400" />
      {message}
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="ml-1 text-white/60 hover:text-white transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
