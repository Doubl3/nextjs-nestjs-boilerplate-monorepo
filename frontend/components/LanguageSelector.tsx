import React from 'react';
import { useRouter } from 'next/router';
import { usePersistLocaleCookie } from '../src/hooks/usePersistLocalCookie';

export type LanguageSelectorProps = {
  language?: string
};

const languages = [
  { code: 'fr', label: 'FR'},
  { code: 'en', label: 'EN'},
  { code: 'jp', label: 'JP'}
];

export const LanguageSelector = ({language='en'}: LanguageSelectorProps) => {
  const router = useRouter();
  usePersistLocaleCookie();

  /** Trigger the language change by changing the locale of the Next?js router & keeping the same location */
  async function handleLanguageChange(newLocale: string) {
    if (router) {
      router.push(router.asPath, router.asPath, { locale: newLocale });
    }
  }

  return (
    <>
      {languages.map(({ code, label }) => {
          return (
            <button key={code} onClick={() => handleLanguageChange(code)}>
              {label} {language == code ? '(selected)' : ''}
            </button>
          );
        })
      }
    </>
  );
}
