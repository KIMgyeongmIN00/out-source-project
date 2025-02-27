import axios from "axios";

const supabaseUrl = import.meta.env.VITE_LOCALENDAR_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_LOCALENDAR_SUPABASE_API;

const axiosInstance = axios.create({
  baseURL: `${supabaseUrl}/rest/v1/`,
  headers: {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
