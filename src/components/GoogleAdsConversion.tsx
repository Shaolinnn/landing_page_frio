/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';

// Garante que o TypeScript entenda o window.gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface GoogleAdsConversionProps {
  sendTo: string; // O ID da conversão (Ex: AW-583505601/...)
}

export default function GoogleAdsConversion({ sendTo }: GoogleAdsConversionProps) {
  useEffect(() => {
    // Verifica se o gtag existe e dispara o evento de conversão
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        transaction_id: '',
      });
    }
  }, [sendTo]);

  return null; // Este componente não renderiza nada visualmente
}