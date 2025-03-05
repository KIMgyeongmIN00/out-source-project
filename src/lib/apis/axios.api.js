import { KAKAO_MAP_REST_KEY } from '@/constants/app-key';
import axios from 'axios';

const supabaseUrl = import.meta.env.VITE_LOCALENDAR_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_LOCALENDAR_SUPABASE_API;

export const axiosApi = axios.create({
  baseURL: `${supabaseUrl}/rest/v1/`,
  headers: {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    Prefer: 'count=exact'
  }
});

export const axiosMap = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/',
  headers: {
    Authorization: `KakaoAK ${KAKAO_MAP_REST_KEY}`
  }
});
