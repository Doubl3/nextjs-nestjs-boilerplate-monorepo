
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function usePersistLocaleCookie() {
  const { locale, defaultLocale } = useRouter();

  useEffect(persistLocaleCookie, [locale, defaultLocale]);

  function persistLocaleCookie() {
    /*
    // Uncomment if you want to set an expiration date
    const date = new Date();
    const expireMs = 100 * 365 * 24 * 60 * 60 * 1000; // 100 days
    date.setTime(date.getTime() + expireMs);
    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;
    */

    document.cookie = `NEXT_LOCALE=${locale};expires=;path=/`;
  }
}
