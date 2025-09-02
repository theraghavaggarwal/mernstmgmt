const API_BASE = process.env.NODE_ENV === "production"
  ? "/api"                     // in Vercel (serverless functions)
  : "http://localhost:8070";   // local dev

export default API_BASE;
