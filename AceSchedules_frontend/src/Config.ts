const isProduction = import.meta.env.MODE === 'production';

export const API_BASE_URL = isProduction
  ? 'https://aceschedules-production.up.railway.app'
  : '/api';