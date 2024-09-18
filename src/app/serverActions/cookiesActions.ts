'use server';

import { cookies } from 'next/headers';

const START_CONFIG_COOKIE_NAME = 'starterConfig';
const PRIVACY_POLICY_COOKIE_NAME = 'privacyPolicy';

type keys = 'starterConfig' | 'privacyPolicy';

export const saveStarterConfigInCookie = (data: string) => {
  const cookieStore = cookies();
  const value = data
  cookieStore.set(START_CONFIG_COOKIE_NAME, value, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7, // 1 week expiration time
  });
};

export const savePrivacyPolicyInCookie = async (data: string) => {
  const cookieStore = cookies();
  const value = data

  cookieStore.set(PRIVACY_POLICY_COOKIE_NAME, value, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week expiration time
  });

 return await checkStarterConfigInCookie(PRIVACY_POLICY_COOKIE_NAME);
}



export const checkStarterConfigInCookie = async (key : keys ) => {
    const cookieStore = cookies();
    const starterConfig = cookieStore.get(key);
    return Promise.resolve(Boolean(starterConfig));
};


export const getStarterConfigFromCookie = async (key : keys) => {
    const cookieStore = cookies();
    const data = cookieStore.get(key);
    const s =  typeof data === 'string' ? JSON.parse(data) : data;
    if (!s) {
        return Promise.resolve(null);
    } else {
      const sv = s?.value ?? ""
      return Promise.resolve(JSON.parse(sv));
    }
}