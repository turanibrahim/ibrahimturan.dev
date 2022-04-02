import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_ANALYTICS_API_KEY,
  authDomain: 'ibrahimturandev.firebaseapp.com',
  projectId: 'ibrahimturandev',
  storageBucket: 'ibrahimturandev.appspot.com',
  messagingSenderId: '816967840094',
  appId: import.meta.env.VITE_GOOGLE_ANALYTICS_APP_ID,
  measurementId: import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID,
};

if (import.meta.env.MODE === 'production') {
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}
